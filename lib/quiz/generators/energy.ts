import type { EnergyProfile, Option, Visual } from "../types";
import { shuffle, type Rng } from "../rng";
import { capped, make, rngFor, signed } from "./util";

const LETTERS = "ABCDEFGH".split("");

function randomProfile(rng: Rng, steps: number): number[] | null {
  const points: number[] = [];
  let current = 5 * (1 + Math.floor(rng() * 8));
  points.push(current);
  for (let i = 0; i < steps; i++) {
    const peak = current + 5 * (1 + Math.floor(rng() * 7));
    const valley = 5 * (1 + Math.floor(rng() * ((peak - 5) / 5)));
    points.push(peak, valley);
    current = valley;
  }
  return Math.max(...points) <= 60 ? points : null;
}

const peaks = (p: number[]) => p.filter((_, i) => i % 2 === 1);
const barriers = (p: number[]) => peaks(p).map((peak, i) => peak - p[i * 2]);
/** The highest peak must also be the largest climb, so the "slowest step" has one clear answer. */
const clearSlowest = (p: number[]) => {
  const tops = peaks(p);
  const b = barriers(p);
  const top = tops.indexOf(Math.max(...tops));
  const largest = b.indexOf(Math.max(...b));
  return (
    top === largest &&
    tops.filter((v) => v === tops[top]).length === 1 &&
    b.filter((v) => v === b[largest]).length === 1
  );
};

function profiles(family: string, count: number, steps: number[], accept: (p: number[]) => boolean = () => true) {
  const rng = rngFor(family);
  const seen = new Set<string>();
  const out: number[][] = [];
  for (let tries = 0; out.length < count && tries < count * 200; tries++) {
    const p = randomProfile(rng, steps[Math.floor(rng() * steps.length)]);
    if (!p || p[0] === p[p.length - 1] || !accept(p)) continue;
    const key = p.join("-");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

const scaled = (points: number[], labels?: string[]): Visual => ({
  kind: "energy",
  profile: { points, scale: true, labels } satisfies EnergyProfile,
});

/** Numeric options that stay distinct by stepping away from the answer when values collide. */
function numericOptions(correct: number, candidates: number[], unit = " kJ/mol"): string[] {
  const out = [correct];
  for (const c of candidates) if (!out.includes(c) && c > 0) out.push(c);
  for (let step = 5; out.length < 4; step += 5) {
    if (!out.includes(correct + step)) out.push(correct + step);
    else if (correct - step > 0 && !out.includes(correct - step)) out.push(correct - step);
  }
  return out.slice(0, 4).map((v) => `${v}${unit}`);
}

export function energyQuestions() {
  const transitionCount = profiles("energy:count-ts", 30, [1, 2, 3]).map((p) => {
    const n = peaks(p).length;
    return make("energy", "energy:count-ts", {
      key: p.join("-"),
      prompt: "How many transition states does this reaction have?",
      visuals: [scaled(p)],
      options: [`${n}`, ...[1, 2, 3, 4].filter((v) => v !== n).map(String)],
      explanation: `Each peak is a transition state, and this curve has ${n}.`,
    });
  });

  const intermediates = profiles("energy:count-int", 30, [1, 2, 3]).map((p) => {
    const n = peaks(p).length - 1;
    return make("energy", "energy:count-int", {
      key: p.join("-"),
      prompt: "How many intermediates does this reaction have?",
      visuals: [scaled(p)],
      options: [`${n}`, ...[0, 1, 2, 3].filter((v) => v !== n).map(String)],
      explanation: `Intermediates are the valleys between peaks. This curve has ${peaks(p).length} peak${n === 0 ? "" : "s"}, so it has ${n} valley${n === 1 ? "" : "s"} between them.`,
    });
  });

  const dG = profiles("energy:dg", 50, [1, 2, 3]).map((p) => {
    const start = p[0];
    const end = p[p.length - 1];
    const d = end - start;
    const top = Math.max(...p);
    const options = [d, -d, top - start, end - top].map((v) => `${signed(v, 0)} kJ/mol`);
    const unique = [...new Set(options)];
    return make("energy", "energy:dg", {
      key: p.join("-"),
      prompt: "What is ΔG for the overall reaction?",
      visuals: [scaled(p)],
      options: unique,
      explanation: `ΔG = products − reactants = ${end} − ${start} = ${signed(d, 0)} kJ/mol. The peaks don't affect ΔG.`,
    });
  });

  const firstBarrier = profiles("energy:ea-first", 50, [1, 2, 3]).map((p) => {
    const ea = p[1] - p[0];
    return make("energy", "energy:ea-first", {
      key: p.join("-"),
      prompt: "What is the activation energy of the first step?",
      visuals: [scaled(p)],
      options: numericOptions(ea, [p[1], p[1] - p[2], Math.abs(p[p.length - 1] - p[0])]),
      explanation: `Ea is the climb from the start of the step to its peak: ${p[1]} − ${p[0]} = ${ea} kJ/mol.`,
    });
  });

  const reverseBarrier = profiles("energy:ea-reverse", 40, [1], (p) => p[1] - p[2] !== p[1] - p[0]).map((p) => {
    const ea = p[1] - p[2];
    return make("energy", "energy:ea-reverse", {
      key: p.join("-"),
      prompt: "What is the activation energy of the reverse reaction?",
      visuals: [scaled(p)],
      options: numericOptions(ea, [p[1] - p[0], p[1], Math.abs(p[2] - p[0])]),
      explanation: `The reverse reaction starts at the products (${p[2]}) and climbs to the same peak (${p[1]}), so Ea(reverse) = ${ea} kJ/mol.`,
    });
  });

  const slowest = profiles("energy:slowest", 50, [2, 3], clearSlowest).map((p) => {
    const b = barriers(p);
    const step = b.indexOf(Math.max(...b)) + 1;
    return make("energy", "energy:slowest", {
      key: p.join("-"),
      prompt: "Which step is rate-determining?",
      visuals: [scaled(p)],
      keepOrder: true,
      answer: step - 1,
      options: b.map((_, i) => `Step ${i + 1}`),
      explanation: `The rate-determining step passes through the highest transition state. Here that is step ${step}, at ${peaks(p)[step - 1]} kJ/mol, and it has the largest climb (${b[step - 1]} kJ/mol).`,
    });
  });

  const spontaneous = profiles("energy:spontaneous", 40, [1, 2, 3]).map((p) => {
    const d = p[p.length - 1] - p[0];
    const yes = d < 0;
    return make("energy", "energy:spontaneous", {
      key: p.join("-"),
      prompt: "Which statement describes this reaction?",
      visuals: [scaled(p)],
      options: [
        yes
          ? "Spontaneous, because the products are lower in free energy than the reactants"
          : "Nonspontaneous, because the products are higher in free energy than the reactants",
        yes
          ? "Nonspontaneous, because the reaction must climb over an energy barrier"
          : "Spontaneous, because the reaction has a low activation energy",
        yes
          ? "Nonspontaneous, because the products are lower in free energy than the reactants"
          : "Spontaneous, because the products are higher in free energy than the reactants",
      ],
      explanation: `Spontaneity depends on ΔG, not barriers. Here ΔG = ${p[p.length - 1]} − ${p[0]} = ${signed(d, 0)} kJ/mol, which is ${yes ? "negative" : "positive"}.`,
    });
  });

  const labelled = (p: number[]) => p.map((_, i) => LETTERS[i]);

  const pointTransition = profiles("energy:label-ts", 40, [2, 3]).map((p) => {
    const rng = rngFor(`energy:label-ts:${p.join("-")}`);
    const labels = labelled(p);
    const ts = labels.filter((_, i) => i % 2 === 1);
    const pick = ts[Math.floor(rng() * ts.length)];
    const others = labels.filter((_, i) => i % 2 === 0);
    return make("energy", "energy:label-ts", {
      key: p.join("-"),
      prompt: "Which letter marks a transition state?",
      visuals: [scaled(p, labels)],
      options: [pick, ...shuffle(others, rng).slice(0, 3)],
      explanation: `Transition states are the peaks. On this curve those are ${ts.join(" and ")}.`,
    });
  });

  const pointIntermediate = profiles("energy:label-int", 40, [2, 3]).map((p) => {
    const rng = rngFor(`energy:label-int:${p.join("-")}`);
    const labels = labelled(p);
    const middles = labels.filter((_, i) => i % 2 === 0 && i > 0 && i < p.length - 1);
    const pick = middles[Math.floor(rng() * middles.length)];
    const others = labels.filter((_, i) => i % 2 === 1 || i === 0 || i === p.length - 1);
    return make("energy", "energy:label-int", {
      key: p.join("-"),
      prompt: "Which letter marks an intermediate?",
      visuals: [scaled(p, labels)],
      options: [pick, ...shuffle(others, rng).slice(0, 3)],
      explanation: `Intermediates are the valleys between peaks. ${middles.join(" and ")} ${middles.length > 1 ? "are valleys" : "is the valley"} here. The first and last points are the reactants and products.`,
    });
  });

  const describes = capped(
    [1, 2, 3].flatMap((steps) => [true, false].map((down) => ({ steps, down }))).flatMap((spec) =>
      Array.from({ length: 12 }, (_, i) => ({ ...spec, i })),
    ),
    72,
    "energy:pick",
  ).flatMap(({ steps, down, i }) => {
    const family = "energy:pick";
    const rng = rngFor(`${family}:${steps}:${down}:${i}`);
    const fits = (p: number[], s: number, d: boolean) => (p.length - 1) / 2 === s && p[p.length - 1] < p[0] === d;
    const find = (s: number, d: boolean) => {
      for (let t = 0; t < 400; t++) {
        const p = randomProfile(rng, s);
        if (p && p[0] !== p[p.length - 1] && fits(p, s, d)) return p;
      }
      return null;
    };
    const right = find(steps, down);
    const wrongSteps = steps === 1 ? 2 : steps - 1;
    const wrongs = [find(steps, !down), find(wrongSteps, down), find(wrongSteps, !down)];
    if (!right || wrongs.some((w) => !w)) return [];
    const toOption = (p: number[]): Option => ({ text: "", visual: { kind: "energy", profile: { points: p } } });
    return [
      make("energy", family, {
        key: `${steps}-${down}-${i}-${right.join("-")}`,
        prompt: `Which diagram shows a ${steps === 1 ? "one" : steps === 2 ? "two" : "three"}-step ${down ? "exergonic" : "endergonic"} reaction?`,
        options: [toOption(right), ...wrongs.map((w) => toOption(w!))],
        explanation: `Count peaks for the number of steps, so this one needs ${steps}. ${down ? "Exergonic means the products end lower than the reactants." : "Endergonic means the products end higher than the reactants."}`,
      }),
    ];
  });

  return [
    ...transitionCount,
    ...intermediates,
    ...dG,
    ...firstBarrier,
    ...reverseBarrier,
    ...slowest,
    ...spontaneous,
    ...pointTransition,
    ...pointIntermediate,
    ...describes,
  ];
}
