import { ACIDS, type Acid } from "./acid-data";
import { capped, fmt, make, pow10 } from "./util";

/** Ordered pairs (left-side acid, acid formed on the right). */
const pairs: [Acid, Acid][] = ACIDS.flatMap((left) =>
  ACIDS.filter(
    (right) =>
      left !== right &&
      Math.abs(left.pKa - right.pKa) >= 2 &&
      // Wider gaps pair species that would never meet, such as H₂ with triflate.
      Math.abs(left.pKa - right.pKa) <= 30 &&
      left.base !== right.f && right.base !== left.f,
  ).map((right): [Acid, Acid] => [left, right]),
);

const equation = (left: Acid, right: Acid) => `${left.f} + ${right.base} ⇌ ${left.base} + ${right.f}`;
const pkaLine = (left: Acid, right: Acid) =>
  `pKa of ${left.f} = ${fmt(left.pKa)}; pKa of ${right.f} = ${fmt(right.pKa)}`;

export function equilibriumQuestions() {
  const side = capped(pairs, 220, "equilibrium:side").map(([left, right]) => {
    const productsFavored = right.pKa > left.pKa;
    const weak = productsFavored ? right : left;
    const strong = productsFavored ? left : right;
    const favored = productsFavored ? "Products" : "Reactants";
    const other = productsFavored ? "Reactants" : "Products";
    return make("equilibrium", "equilibrium:side", {
      key: `${left.key}>${right.key}`,
      prompt: `Which side does this equilibrium favor?\n${equation(left, right)}\n${pkaLine(left, right)}`,
      options: [
        `${favored}, because ${weak.f} is the weaker acid`,
        `${other}, because ${strong.f} is the weaker acid`,
        `${other}, because ${weak.f} is the weaker acid`,
        `${favored}, because ${strong.f} is the weaker acid`,
      ],
      explanation: `Compare the acid on each side: ${left.f} on the left and ${right.f} on the right. Equilibrium favors the weaker acid, which has the higher pKa. That is ${weak.f} (${fmt(weak.pKa)}), so ${favored.toLowerCase()} are favored.`,
    });
  });

  const keq = capped(pairs, 150, "equilibrium:keq").map(([left, right]) => {
    const diff = right.pKa - left.pKa;
    return make("equilibrium", "equilibrium:keq", {
      key: `${left.key}>${right.key}`,
      prompt: `Estimate Keq for this reaction.\n${equation(left, right)}\n${pkaLine(left, right)}`,
      options: [
        pow10(diff),
        pow10(-diff),
        pow10(left.pKa + right.pKa === diff ? diff + 3 : left.pKa + right.pKa),
        `${fmt(Math.abs(diff))}`,
      ],
      explanation: `log Keq = pKa(acid on the right) − pKa(acid on the left) = ${fmt(right.pKa)} − ${left.pKa < 0 ? `(${fmt(left.pKa)})` : fmt(left.pKa)} = ${fmt(diff)}. So Keq is about ${pow10(diff)}${diff > 0 ? ", which favors products" : ", which favors reactants"}.`,
    });
  });

  const canDeprotonate = capped(pairs, 150, "equilibrium:can").map(([target, conj]) => {
    const yes = conj.pKa > target.pKa;
    return make("equilibrium", "equilibrium:can", {
      key: `${target.key}>${conj.key}`,
      prompt: `Can ${conj.base} largely deprotonate ${target.f}?\npKa of ${target.f} = ${fmt(target.pKa)}; pKa of ${conj.f} = ${fmt(conj.pKa)}`,
      options: yes
        ? [
            `Yes, because the ${conj.f} formed is a weaker acid than ${target.f}`,
            `No, because the ${conj.f} formed is a stronger acid than ${target.f}`,
            `Yes, because the ${conj.f} formed is a stronger acid than ${target.f}`,
            `No, because the ${conj.f} formed is a weaker acid than ${target.f}`,
          ]
        : [
            `No, because the ${conj.f} formed is a stronger acid than ${target.f}`,
            `Yes, because the ${conj.f} formed is a weaker acid than ${target.f}`,
            `Yes, because the ${conj.f} formed is a stronger acid than ${target.f}`,
            `No, because the ${conj.f} formed is a weaker acid than ${target.f}`,
          ],
      explanation: `Deprotonation is favored only if the acid formed is weaker than the starting acid. ${conj.f} (${fmt(conj.pKa)}) is ${yes ? "weaker" : "stronger"} than ${target.f} (${fmt(target.pKa)}), so the equilibrium ${yes ? "favors deprotonation" : "stays on the side of the starting materials"}.`,
    });
  });

  const baseNames: [string, Acid][] = [
    ["NaOH", ACIDS.find((a) => a.key === "water")!],
    ["NaHCO₃", ACIDS.find((a) => a.key === "h2co3")!],
    ["NaOCH₂CH₃", ACIDS.find((a) => a.key === "etoh")!],
    ["NaH", ACIDS.find((a) => a.key === "h2")!],
    ["NaNH₂", ACIDS.find((a) => a.key === "nh3")!],
    ["NH₃", ACIDS.find((a) => a.key === "nh4")!],
    ["CH₃COONa", ACIDS.find((a) => a.key === "acetic")!],
  ];
  const chooseBase = ACIDS.filter((a) => a.pKa > 0 && a.pKa < 36).flatMap((target) => {
    // The right answer must clear the target by 2 pKa units, and every wrong one must fall short.
    const strong = baseNames.filter(([, c]) => c.pKa >= target.pKa + 2 && c !== target);
    const weak = baseNames.filter(([, c]) => c.pKa < target.pKa);
    if (weak.length < 2) return [];
    return strong.map(([name, conj]) =>
      make("equilibrium", "equilibrium:choose", {
        key: `${target.key}<${name}`,
        prompt: `${target.f} has a pKa of ${fmt(target.pKa)}. Which base would largely deprotonate it?`,
        options: [
          `${name} (conjugate acid pKa ${fmt(conj.pKa)})`,
          ...weak.slice(-3).map(([n, c]) => `${n} (conjugate acid pKa ${fmt(c.pKa)})`),
        ],
        explanation: `The conjugate acid formed must be weaker than ${target.f}, so its pKa must be higher than ${fmt(target.pKa)}. Only ${name} meets that here, because ${conj.f} has a pKa of ${fmt(conj.pKa)}.`,
      }),
    );
  });

  return [...side, ...keq, ...canDeprotonate, ...chooseBase];
}
