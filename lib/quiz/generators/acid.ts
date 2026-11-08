import { shuffle } from "../rng";
import { ACIDS, SERIES, type Acid } from "./acid-data";
import { capped, combinations, fmt, make, permutations, pow10, rngFor } from "./util";

const withPka = (a: Acid) => `${a.f} (pKa ${fmt(a.pKa)})`;
const spread = (group: Acid[]) => {
  const values = group.map((a) => a.pKa).sort((x, y) => x - y);
  return values.every((v, i) => i === 0 || v - values[i - 1] >= 1);
};

function picks(family: string, size: number, count: number) {
  const rng = rngFor(family);
  const seen = new Set<string>();
  const out: Acid[][] = [];
  for (let tries = 0; out.length < count && tries < count * 40; tries++) {
    const group = shuffle(ACIDS, rng).slice(0, size);
    const key = group.map((a) => a.key).sort().join("+");
    if (seen.has(key) || !spread(group)) continue;
    seen.add(key);
    out.push(group);
  }
  return out;
}

const key = (group: Acid[]) => group.map((a) => a.key).sort().join("+");
const byPka = (group: Acid[]) => [...group].sort((a, b) => a.pKa - b.pKa);

export function acidQuestions() {
  const strongest = picks("acid:strongest", 4, 120).map((group) => {
    const [best] = byPka(group);
    return make("acid", "acid:strongest", {
      key: key(group),
      prompt: "Which of these is the strongest acid?",
      options: [best, ...group.filter((a) => a !== best)].map(withPka),
      explanation: `The lowest pKa marks the strongest acid. ${best.f} has the lowest value here, at ${fmt(best.pKa)}.`,
    });
  });

  const weakest = picks("acid:weakest", 4, 90).map((group) => {
    const least = byPka(group)[3];
    return make("acid", "acid:weakest", {
      key: key(group),
      prompt: "Which of these is the weakest acid?",
      options: [least, ...group.filter((a) => a !== least)].map(withPka),
      explanation: `The highest pKa marks the weakest acid. ${least.f} has the highest value here, at ${fmt(least.pKa)}.`,
    });
  });

  const baseLabel = (a: Acid) => `${a.base} (conjugate acid pKa ${fmt(a.pKa)})`;

  const stableBase = picks("acid:stable-base", 4, 90).map((group) => {
    const best = byPka(group)[0];
    return make("acid", "acid:stable-base", {
      key: key(group),
      prompt: "Which of these bases is the most stable (the weakest base)?",
      options: [best, ...group.filter((a) => a !== best)].map(baseLabel),
      explanation: `A stronger acid has a more stable, weaker conjugate base. ${best.base} comes from the strongest acid of the group, ${best.f} (pKa ${fmt(best.pKa)}).`,
    });
  });

  const strongBase = picks("acid:strong-base", 4, 90).map((group) => {
    const top = byPka(group)[3];
    return make("acid", "acid:strong-base", {
      key: key(group),
      prompt: "Which of these is the strongest base?",
      options: [top, ...group.filter((a) => a !== top)].map(baseLabel),
      explanation: `A weaker acid has a stronger conjugate base. ${top.base} comes from the weakest acid of the group, ${top.f} (pKa ${fmt(top.pKa)}).`,
    });
  });

  const pairs = combinations(ACIDS, 2).filter(([a, b]) => {
    const diff = Math.abs(a.pKa - b.pKa);
    return diff >= 2 && diff <= 12 && Number.isInteger(Math.round(diff * 10) / 10);
  });
  const ratio = capped(pairs, 60, "acid:ratio").map(([x, y]) => {
    const [strong, weak] = x.pKa < y.pKa ? [x, y] : [y, x];
    const diff = Math.round((weak.pKa - strong.pKa) * 10) / 10;
    return make("acid", "acid:ratio", {
      key: `${strong.key}+${weak.key}`,
      prompt: `${strong.f} has a pKa of ${fmt(strong.pKa)} and ${weak.f} has a pKa of ${fmt(weak.pKa)}. How many times stronger is ${strong.f}?`,
      options: [`${pow10(diff)} times`, `${diff} times`, `${diff * 10} times`, `${pow10(diff + 2)} times`],
      explanation: `pKa is a log scale, so each unit is a factor of 10. These differ by ${diff} units, which is a factor of ${pow10(diff)}.`,
    });
  });

  const ranks = SERIES.flatMap((series) => {
    const family = "acid:rank";
    const rng = rngFor(`${family}:${series.key}`);
    const groups =
      series.members.length > 3
        ? [series.members, ...combinations(series.members, 3)]
        : [series.members];
    return groups.map((group) => {
      const order = [...group].sort((a, b) => a.pKa - b.pKa);
      const correct = order.map((m) => m.label).join(" > ");
      const wrong = shuffle(permutations(order).map((p) => p.map((m) => m.label).join(" > ")), rng)
        .filter((text) => text !== correct)
        .slice(0, 3);
      const values = order.map((m) => `${m.label} is ${fmt(m.pKa)}`).join(", ");
      return make("acid", family, {
        key: `${series.key}:${order.map((m) => m.label).join("+")}`,
        prompt: "Rank these from most acidic to least acidic.",
        options: [correct, ...wrong],
        explanation: `${series.reason} The approximate pKa values: ${values}.`,
      });
    });
  });

  return [...strongest, ...weakest, ...stableBase, ...strongBase, ...ratio, ...ranks];
}
