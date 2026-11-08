import { capped, combinations, make, rngFor, signed } from "./util";

/** Homolytic bond dissociation energies in kJ/mol, approximate textbook values. */
const BDE: Record<string, number> = {
  "H–H": 436, "F–F": 159, "Cl–Cl": 243, "Br–Br": 193, "I–I": 151,
  "H–F": 570, "H–Cl": 431, "H–Br": 366, "H–I": 297,
  "CH₃–H": 439, "CH₃CH₂–H": 423, "(CH₃)₂CH–H": 413, "(CH₃)₃C–H": 400,
  "CH₃–F": 460, "CH₃–Cl": 350, "CH₃–Br": 294, "CH₃–I": 239,
  "CH₃CH₂–Cl": 355, "CH₃CH₂–Br": 293, "(CH₃)₂CH–Cl": 356, "(CH₃)₂CH–Br": 298,
  "(CH₃)₃C–Cl": 352, "(CH₃)₃C–Br": 292, "CH₃–OH": 385, "HO–H": 497,
};

type Rxn = { key: string; equation: string; broken: string[]; formed: string[] };

const R = ["CH₃", "CH₃CH₂", "(CH₃)₂CH", "(CH₃)₃C"];
const halogenations: Rxn[] = R.flatMap((r) =>
  ["Cl", "Br"].map((x) => ({
    key: `hal:${r}:${x}`,
    equation: `${r}–H + ${x}–${x} → ${r}–${x} + H–${x}`,
    broken: [`${r}–H`, `${x}–${x}`],
    formed: [`${r}–${x}`, `H–${x}`],
  })),
);
const methyl: Rxn[] = [
  { key: "hal:me:F", equation: "CH₃–H + F–F → CH₃–F + H–F", broken: ["CH₃–H", "F–F"], formed: ["CH₃–F", "H–F"] },
  { key: "hal:me:I", equation: "CH₃–H + I–I → CH₃–I + H–I", broken: ["CH₃–H", "I–I"], formed: ["CH₃–I", "H–I"] },
  { key: "h2:Cl", equation: "H–H + Cl–Cl → H–Cl + H–Cl", broken: ["H–H", "Cl–Cl"], formed: ["H–Cl", "H–Cl"] },
  { key: "h2:Br", equation: "H–H + Br–Br → H–Br + H–Br", broken: ["H–H", "Br–Br"], formed: ["H–Br", "H–Br"] },
  { key: "h2:I", equation: "H–H + I–I → H–I + H–I", broken: ["H–H", "I–I"], formed: ["H–I", "H–I"] },
  { key: "h2:F", equation: "H–H + F–F → H–F + H–F", broken: ["H–H", "F–F"], formed: ["H–F", "H–F"] },
  { key: "ch3x-oh", equation: "CH₃–Br + HO–H → CH₃–OH + H–Br", broken: ["CH₃–Br", "HO–H"], formed: ["CH₃–OH", "H–Br"] },
  { key: "ch3x-oh2", equation: "CH₃–Cl + HO–H → CH₃–OH + H–Cl", broken: ["CH₃–Cl", "HO–H"], formed: ["CH₃–OH", "H–Cl"] },
];
const exchanges: Rxn[] = combinations(["F", "Cl", "Br", "I"], 2).flatMap(([x, y]) => [
  { key: `ex:${x}:${y}`, equation: `CH₃–${x} + H–${y} → CH₃–${y} + H–${x}`, broken: [`CH₃–${x}`, `H–${y}`], formed: [`CH₃–${y}`, `H–${x}`] },
  { key: `ex:${y}:${x}`, equation: `CH₃–${y} + H–${x} → CH₃–${x} + H–${y}`, broken: [`CH₃–${y}`, `H–${x}`], formed: [`CH₃–${x}`, `H–${y}`] },
]);
const reactions = [...halogenations, ...methyl, ...exchanges];

const sum = (bonds: string[]) => bonds.reduce((total, b) => total + BDE[b], 0);
const table = (bonds: string[]) => [...new Set(bonds)].map((b) => `${b} = ${BDE[b]}`).join("; ");
const math = (bonds: string[]) => bonds.map((b) => BDE[b]).join(" + ");

export function enthalpyQuestions() {
  const compute = reactions.map((r) => {
    const broken = sum(r.broken);
    const formed = sum(r.formed);
    const dH = broken - formed;
    return make("enthalpy", "enthalpy:bde", {
      key: r.key,
      prompt: `Using the bond energies (kJ/mol), what is ΔH?\n${r.equation}\n${table([...r.broken, ...r.formed])}`,
      options: [dH, -dH, broken + formed, -(broken + formed)].map((v) => `${signed(v, 0)} kJ/mol`),
      explanation: `ΔH = bonds broken − bonds formed = (${math(r.broken)}) − (${math(r.formed)}) = ${broken} − ${formed} = ${signed(dH, 0)} kJ/mol.`,
    });
  });

  const direction = reactions.filter((r) => sum(r.broken) !== sum(r.formed)).map((r) => {
    const broken = sum(r.broken);
    const formed = sum(r.formed);
    const exo = broken < formed;
    return make("enthalpy", "enthalpy:direction", {
      key: r.key,
      prompt: `Is this reaction exothermic or endothermic?\n${r.equation}\n${table([...r.broken, ...r.formed])}`,
      options: exo
        ? [
            "Exothermic, because the bonds formed are stronger than the bonds broken",
            "Endothermic, because the bonds broken are weaker than the bonds formed",
            "Exothermic, because the bonds broken are stronger than the bonds formed",
            "Endothermic, because the bonds formed are stronger than the bonds broken",
          ]
        : [
            "Endothermic, because the bonds broken are stronger than the bonds formed",
            "Exothermic, because the bonds formed are weaker than the bonds broken",
            "Endothermic, because the bonds formed are stronger than the bonds broken",
            "Exothermic, because the bonds broken are stronger than the bonds formed",
          ],
      explanation: `Breaking costs ${broken} kJ/mol and forming returns ${formed} kJ/mol, so ΔH = ${signed(broken - formed, 0)} kJ/mol. ${exo ? "A negative ΔH is exothermic." : "A positive ΔH is endothermic."}`,
    });
  });

  const brokenTotal = capped(reactions, 24, "enthalpy:broken").map((r) => {
    const cost = sum(r.broken);
    const release = sum(r.formed);
    return make("enthalpy", "enthalpy:broken", {
      key: r.key,
      prompt: `How much energy does it take to break the bonds in the reactants?\n${r.equation}\n${table([...r.broken, ...r.formed])}`,
      options: [cost, release, cost + release, Math.abs(cost - release)].map((v) => `${v} kJ/mol`),
      explanation: `Only reactant bonds break: ${r.broken.join(" and ")}. That costs ${math(r.broken)} = ${cost} kJ/mol. Forming ${r.formed.join(" and ")} then releases energy.`,
    });
  });

  const abstract = capped(
    combinations([200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000], 2).flatMap(([a, b]) => [
      [a, b],
      [b, a],
    ]),
    60,
    "enthalpy:totals",
  ).map(([broken, formed]) => {
    const dH = broken - formed;
    return make("enthalpy", "enthalpy:totals", {
      key: `${broken}-${formed}`,
      prompt: `A reaction breaks bonds totaling ${broken} kJ/mol and forms bonds totaling ${formed} kJ/mol. What is ΔH?`,
      options: [
        `${signed(dH, 0)} kJ/mol, which is ${dH < 0 ? "exothermic" : "endothermic"}`,
        `${signed(-dH, 0)} kJ/mol, which is ${dH < 0 ? "endothermic" : "exothermic"}`,
        `${signed(dH, 0)} kJ/mol, which is ${dH < 0 ? "endothermic" : "exothermic"}`,
        `${signed(broken + formed, 0)} kJ/mol, which is endothermic`,
      ],
      explanation: `ΔH = broken − formed = ${broken} − ${formed} = ${signed(dH, 0)} kJ/mol. ${dH < 0 ? "Negative means exothermic." : "Positive means endothermic."}`,
    });
  });

  const names = Object.keys(BDE);
  const groups = combinations(names, 4);
  const extreme = capped(groups, 80, "enthalpy:strongest").flatMap((group, i) => {
    const rng = rngFor(`enthalpy:strongest:${i}`);
    const values = group.map((b) => BDE[b]);
    if (new Set(values).size < 4) return [];
    const strongest = rng() < 0.5;
    const target = strongest ? Math.max(...values) : Math.min(...values);
    const answer = group.find((b) => BDE[b] === target)!;
    return [
      make("enthalpy", "enthalpy:strongest", {
        key: `${strongest}:${group.join("+")}`,
        prompt: `Using the bond energies (kJ/mol), which bond takes the ${strongest ? "most" : "least"} energy to break?`,
        options: [answer, ...group.filter((b) => b !== answer)].map((b) => `${b} (${BDE[b]})`),
        explanation: `A larger bond dissociation energy means a stronger bond that takes more energy to break. ${answer} has the ${strongest ? "highest" : "lowest"} value here, ${BDE[answer]} kJ/mol.`,
      }),
    ];
  });

  return [...compute, ...direction, ...brokenTotal, ...abstract, ...extreme];
}
