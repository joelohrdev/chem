import type { Species, Visual } from "../types";
import { shuffle } from "../rng";
import { capped, combinations, make, rngFor } from "./util";

type Rxn = { key: string; left: Species[]; right: Species[]; positive: boolean; reason: string };

const s = (smiles: string): Species => ({ smiles });
const t = (text: string): Species => ({ text });

const JOIN = "Two molecules combine into one, so the number of independent particles falls.";
const SPLIT = "One molecule becomes two, so the number of independent particles rises.";
const CLOSE = "A chain closes into a ring, which locks up freely rotating bonds.";
const OPEN = "A ring opens into a chain, which frees up bond rotation.";
const GAS_UP = "More moles of gas form, and gases have by far the highest entropy.";
const GAS_DOWN = "Moles of gas decrease, and gases have by far the highest entropy.";
const PHASE_UP = "The substance moves to a phase where its particles have more freedom.";
const PHASE_DOWN = "The substance moves to a phase where its particles have less freedom.";

const REACTIONS: Rxn[] = [
  { key: "br2-cyclohexene", left: [s("C1=CCCCC1"), s("BrBr")], right: [s("BrC1CCCCC1Br")], positive: false, reason: JOIN },
  { key: "br2-ethene", left: [s("C=C"), s("BrBr")], right: [s("BrCCBr")], positive: false, reason: JOIN },
  { key: "cl2-propene", left: [s("C=CC"), s("ClCl")], right: [s("ClCC(C)Cl")], positive: false, reason: JOIN },
  { key: "hbr-propene", left: [s("C=CC"), s("Br")], right: [s("CC(C)Br")], positive: false, reason: JOIN },
  { key: "hcl-butene", left: [s("CC=CC"), s("Cl")], right: [s("CCC(C)Cl")], positive: false, reason: JOIN },
  { key: "h2o-propene", left: [s("C=CC"), s("O")], right: [s("CC(C)O")], positive: false, reason: JOIN },
  { key: "h2-ethene", left: [s("C=C"), t("H₂")], right: [s("CC")], positive: false, reason: JOIN },
  { key: "hemiacetal", left: [s("CC=O"), s("CO")], right: [s("CC(O)OC")], positive: false, reason: JOIN },
  { key: "diels", left: [s("C=CC=C"), s("C=CC=O")], right: [s("O=CC1CCC=CC1")], positive: false, reason: "Two molecules combine into one ring, so both particle count and conformational freedom fall." },
  { key: "cyanohydrin", left: [s("CC(C)=O"), s("C#N")], right: [s("CC(C)(O)C#N")], positive: false, reason: JOIN },
  { key: "imine-add", left: [s("C=O"), s("CN")], right: [s("OCNC")], positive: false, reason: JOIN },
  { key: "close-hexene", left: [s("C=CCCCC")], right: [s("C1CCCCC1")], positive: false, reason: CLOSE },
  { key: "close-pentene", left: [s("C=CCCC")], right: [s("C1CCCC1")], positive: false, reason: CLOSE },
  { key: "close-bromo", left: [s("BrCCCCC=C")], right: [s("BrC1CCCC1C")], positive: false, reason: CLOSE },
  { key: "close-lactol", left: [s("OCCCCC=O")], right: [s("OC1CCCCO1")], positive: false, reason: CLOSE },
  { key: "close-butene", left: [s("C=CCC")], right: [s("C1CCC1")], positive: false, reason: CLOSE },
  { key: "close-heptene", left: [s("C=CCCCCC")], right: [s("CC1CCCCC1")], positive: false, reason: CLOSE },
  { key: "gas-nh3", left: [t("N₂(g)"), t("3 H₂(g)")], right: [t("2 NH₃(g)")], positive: false, reason: GAS_DOWN },
  { key: "gas-so3", left: [t("2 SO₂(g)"), t("O₂(g)")], right: [t("2 SO₃(g)")], positive: false, reason: GAS_DOWN },
  { key: "gas-water", left: [t("2 H₂(g)"), t("O₂(g)")], right: [t("2 H₂O(l)")], positive: false, reason: GAS_DOWN },
  { key: "cond-water", left: [t("H₂O(g)")], right: [t("H₂O(l)")], positive: false, reason: PHASE_DOWN },
  { key: "freeze-water", left: [t("H₂O(l)")], right: [t("H₂O(s)")], positive: false, reason: PHASE_DOWN },
  { key: "dep-iodine", left: [t("I₂(g)")], right: [t("I₂(s)")], positive: false, reason: PHASE_DOWN },
  { key: "freeze-benzene", left: [t("C₆H₆(l)")], right: [t("C₆H₆(s)")], positive: false, reason: PHASE_DOWN },

  { key: "chlorohydrin", left: [s("OC1(Cl)CCCC1")], right: [s("O=C1CCCC1"), s("Cl")], positive: true, reason: SPLIT },
  { key: "e-bromide", left: [s("CC(C)(C)Br")], right: [s("C=C(C)C"), s("Br")], positive: true, reason: SPLIT },
  { key: "e-chloride", left: [s("CCC(C)Cl")], right: [s("CC=CC"), s("Cl")], positive: true, reason: SPLIT },
  { key: "dehydration", left: [s("CC(C)O")], right: [s("C=CC"), s("O")], positive: true, reason: SPLIT },
  { key: "dehydrate-cyclo", left: [s("OC1CCCCC1")], right: [s("C1=CCCCC1"), s("O")], positive: true, reason: SPLIT },
  { key: "retro-da", left: [s("C1=CCCCC1")], right: [s("C=CC=C"), s("C=C")], positive: true, reason: "One ring breaks into two molecules, so both particle count and conformational freedom rise." },
  { key: "decarb", left: [s("CC(=O)CC(=O)O")], right: [s("CC(C)=O"), t("CO₂")], positive: true, reason: SPLIT },
  { key: "hemiacetal-back", left: [s("CC(O)OC")], right: [s("CC=O"), s("CO")], positive: true, reason: SPLIT },
  { key: "cleave-bromide", left: [s("CC(Br)Br")], right: [s("C=CBr"), s("Br")], positive: true, reason: SPLIT },
  { key: "dibromide", left: [s("BrC1CCCCC1Br")], right: [s("C1=CCCCC1"), s("BrBr")], positive: true, reason: SPLIT },
  { key: "open-cyclopropane", left: [s("BrCC1CC1")], right: [s("C=CCCBr")], positive: true, reason: OPEN },
  { key: "open-cyclobutane", left: [s("CC1CCC1")], right: [s("C=CCCC")], positive: true, reason: OPEN },
  { key: "open-epoxide", left: [s("CC1CO1")], right: [s("CCC=O")], positive: true, reason: OPEN },
  { key: "open-cyclohexane", left: [s("C1CCCCC1")], right: [s("C=CCCCC")], positive: true, reason: OPEN },
  { key: "open-lactol", left: [s("OC1CCCO1")], right: [s("OCCCC=O")], positive: true, reason: OPEN },
  { key: "gas-caco3", left: [t("CaCO₃(s)")], right: [t("CaO(s)"), t("CO₂(g)")], positive: true, reason: GAS_UP },
  { key: "gas-pcl5", left: [t("PCl₅(g)")], right: [t("PCl₃(g)"), t("Cl₂(g)")], positive: true, reason: GAS_UP },
  { key: "gas-n2o4", left: [t("N₂O₄(g)")], right: [t("2 NO₂(g)")], positive: true, reason: GAS_UP },
  { key: "boil-ethanol", left: [t("CH₃CH₂OH(l)")], right: [t("CH₃CH₂OH(g)")], positive: true, reason: PHASE_UP },
  { key: "melt-ice", left: [t("H₂O(s)")], right: [t("H₂O(l)")], positive: true, reason: PHASE_UP },
  { key: "sublime", left: [t("CO₂(s)")], right: [t("CO₂(g)")], positive: true, reason: PHASE_UP },
  { key: "boil-acetone", left: [t("(CH₃)₂CO(l)")], right: [t("(CH₃)₂CO(g)")], positive: true, reason: PHASE_UP },
];

const visual = (r: Rxn, label?: string): Visual => ({
  kind: "reaction",
  left: r.left,
  right: r.right,
  arrow: "forward",
  label,
});
const NUMERALS = ["I", "II", "III", "IV"];

export function entropyQuestions() {
  const sign = REACTIONS.map((r) =>
    make("entropy", "entropy:sign", {
      key: r.key,
      prompt: "What is the sign of ΔS for this process?",
      visuals: [visual(r)],
      answer: r.positive ? 0 : 1,
      keepOrder: true,
      options: ["Positive", "Negative", "Zero"],
      explanation: r.reason,
    }),
  );

  const negative = REACTIONS.filter((r) => !r.positive);
  const positive = REACTIONS.filter((r) => r.positive);

  const pickExtreme = (family: string, wantPositive: boolean, count: number) => {
    const target = wantPositive ? positive : negative;
    const rest = wantPositive ? negative : positive;
    return capped(target.flatMap((x) => combinations(rest, 3).map((others) => ({ x, others }))), count, family).map(
      ({ x, others }) => {
        const rng = rngFor(`${family}:${x.key}:${others.map((o) => o.key).join("+")}`);
        const order = shuffle([x, ...others], rng);
        const labels = order.map((_, i) => NUMERALS[i]);
        const answer = order.indexOf(x);
        return make("entropy", family, {
          key: `${x.key}:${others.map((o) => o.key).join("+")}`,
          prompt: wantPositive
            ? "Which reaction would you expect to have a positive ΔS?"
            : "Which reaction would you expect to have a negative ΔS?",
          visuals: order.map((r, i) => visual(r, labels[i])),
          keepOrder: true,
          answer,
          options: labels,
          explanation: `${labels[answer]} is the only one with a ${wantPositive ? "positive" : "negative"} ΔS. ${x.reason}`,
        });
      },
    );
  };

  const pairs: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
  const twoNegative = capped(
    combinations(negative, 2).flatMap((negs) => combinations(positive, 2).map((pos) => ({ negs, pos }))),
    90,
    "entropy:exam-style",
  ).map(({ negs, pos }) => {
    const rng = rngFor(`entropy:exam-style:${[...negs, ...pos].map((r) => r.key).join("+")}`);
    const order = shuffle([...negs, ...pos], rng);
    const idx = order.flatMap((r, i) => (negs.includes(r) ? [i] : []));
    const answer = pairs.findIndex(([a, b]) => a === idx[0] && b === idx[1]);
    const names = idx.map((i) => NUMERALS[i]);
    return make("entropy", "entropy:exam-style", {
      key: order.map((r) => r.key).join("+"),
      prompt: "From the following reactions, which ones would you expect to have a negative ΔS?",
      visuals: order.map((r, i) => visual(r, NUMERALS[i])),
      keepOrder: true,
      answer,
      options: pairs.map(([a, b]) => `${NUMERALS[a]} and ${NUMERALS[b]}`),
      explanation: `${names[0]}: ${order[idx[0]].reason} ${names[1]}: ${order[idx[1]].reason} The other two have a positive ΔS.`,
    });
  });

  return [
    ...sign,
    ...pickExtreme("entropy:positive", true, 70),
    ...pickExtreme("entropy:negative", false, 70),
    ...twoNegative,
  ];
}
