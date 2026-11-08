import { molOption } from "../author";
import {
  alkeneProtonation,
  carbonylAddition,
  cationCapture,
  protonTransfer,
  substitution,
} from "../scenes";
import type { ArrowScene, Option } from "../types";
import { make } from "./util";

const scene = (s: ArrowScene): Option => ({ text: "", visual: { kind: "scene", scene: s } });

/** `draw` puts the atom holding the lone pair last, because the drawing's dots go at the label's right end. */
const BASES = [
  { label: "HO⁻", draw: "HO⁻", conj: "H₂O", pKa: 15.7 },
  { label: "CH₃O⁻", draw: "CH₃O⁻", conj: "CH₃OH", pKa: 15.5 },
  { label: "NH₂⁻", draw: "H₂N⁻", conj: "NH₃", pKa: 38 },
  { label: "NH₃", draw: "H₃N", conj: "NH₄⁺", pKa: 9.3 },
  { label: "CH₃NH₂", draw: "CH₃(H₂)N", conj: "CH₃NH₃⁺", pKa: 10.6 },
  { label: "H₂O", draw: "H₂O", conj: "H₃O⁺", pKa: -1.7 },
];
const ACIDS = [
  { atom: "Cl", full: "HCl", leaving: "Cl⁻", pKa: -7 },
  { atom: "Br", full: "HBr", leaving: "Br⁻", pKa: -9 },
  { atom: "I", full: "HI", leaving: "I⁻", pKa: -10 },
  { atom: "O₂CCH₃", full: "CH₃COOH", leaving: "CH₃COO⁻", pKa: 4.8 },
  { atom: "CN", full: "HCN", leaving: "CN⁻", pKa: 9.2 },
  { atom: "OH", full: "H₂O", leaving: "HO⁻", pKa: 15.7 },
];
const transfers = BASES.flatMap((b) =>
  ACIDS.filter((a) => a.pKa < b.pKa - 1).map((a) => ({ b, a })),
);

const NUCS = [
  { label: "HO⁻", smiles: "O", name: "hydroxide", oAttack: "OO" },
  { label: "CH₃O⁻", smiles: "OC", name: "methoxide", oAttack: "OOC" },
  { label: "N≡C⁻", smiles: "C#N", name: "cyanide", oAttack: "OC#N" },
  { label: "H₃C⁻", smiles: "C", name: "a methyl anion", oAttack: "OC" },
  { label: "H⁻", smiles: "[H]", name: "hydride", oAttack: "O" },
];
const CARBONYLS = [
  { r1: "H₃C", r2: "CH₃", s1: "C", s2: "C", name: "acetone" },
  { r1: "H", r2: "CH₃", s1: "[H]", s2: "C", name: "acetaldehyde" },
  { r1: "H", r2: "H", s1: "[H]", s2: "[H]", name: "formaldehyde" },
  { r1: "CH₃CH₂", r2: "CH₃", s1: "CC", s2: "C", name: "butanone" },
  { r1: "H", r2: "C₆H₅", s1: "[H]", s2: "c1ccccc1", name: "benzaldehyde" },
];
const additions = NUCS.flatMap((n) => CARBONYLS.map((c) => ({ n, c })));

const SN2_NUCS = [
  { label: "HO⁻", attached: "OH", name: "hydroxide" },
  { label: "N≡C⁻", attached: "CN", name: "cyanide" },
  { label: "I⁻", attached: "I", name: "iodide" },
  { label: "CH₃O⁻", attached: "OCH₃", name: "methoxide" },
  { label: "N₃⁻", attached: "N₃", name: "azide" },
];
const SUBSTRATES = [
  { group: "H₃C", leaving: "Br" },
  { group: "H₃C", leaving: "Cl" },
  { group: "CH₃CH₂", leaving: "Br" },
  { group: "CH₃CH₂", leaving: "Cl" },
];
const substitutions = SN2_NUCS.flatMap((n) => SUBSTRATES.map((s) => ({ n, s })));

const CATION_NUCS = [
  { label: "Cl⁻", draw: "Cl⁻", attached: "Cl", oxidized: "Cl⁺" },
  { label: "Br⁻", draw: "Br⁻", attached: "Br", oxidized: "Br⁺" },
  { label: "I⁻", draw: "I⁻", attached: "I", oxidized: "I⁺" },
  { label: "H₂O", draw: "H₂O", attached: "OH₂⁺", oxidized: "H₂O⁺" },
  { label: "CH₃OH", draw: "CH₃(H)O", attached: "O(H)CH₃⁺", oxidized: "CH₃OH⁺" },
];
const CATIONS = [
  { label: "⁺C(CH₃)₃", group: "(CH₃)₃C" },
  { label: "⁺CH(CH₃)₂", group: "(CH₃)₂CH" },
  { label: "⁺CH₂CH₃", group: "CH₃CH₂" },
];

const FORMAL_CHARGE = [
  { atom: "O", v: 6, bonds: 3, lp: 1 },
  { atom: "O", v: 6, bonds: 2, lp: 2 },
  { atom: "O", v: 6, bonds: 1, lp: 3 },
  { atom: "N", v: 5, bonds: 4, lp: 0 },
  { atom: "N", v: 5, bonds: 3, lp: 1 },
  { atom: "N", v: 5, bonds: 2, lp: 2 },
  { atom: "C", v: 4, bonds: 4, lp: 0 },
  { atom: "C", v: 4, bonds: 3, lp: 0 },
  { atom: "C", v: 4, bonds: 3, lp: 1 },
  { atom: "S", v: 6, bonds: 3, lp: 1 },
  { atom: "S", v: 6, bonds: 2, lp: 2 },
  { atom: "S", v: 6, bonds: 1, lp: 3 },
  { atom: "F", v: 7, bonds: 1, lp: 3 },
  { atom: "F", v: 7, bonds: 0, lp: 4 },
  { atom: "Cl", v: 7, bonds: 1, lp: 3 },
  { atom: "Cl", v: 7, bonds: 0, lp: 4 },
  { atom: "Br", v: 7, bonds: 0, lp: 4 },
  { atom: "Br", v: 7, bonds: 1, lp: 3 },
];

const chargeText = (c: number) => (c === 0 ? "0" : c > 0 ? `+${c}` : `−${-c}`);

export function arrowQuestions() {
  const protonPick = transfers.map(({ b, a }) =>
    make("arrows", "arrows:proton-pick", {
      key: `${b.label}+${a.atom}`,
      prompt: `Which drawing correctly shows ${b.label} taking a proton from ${a.full}?`,
      options: (["correct", "reversed", "missing", "attackA"] as const).map((v) => scene(protonTransfer(b.draw, a.atom, v))),
      explanation: `The first arrow goes from the base's lone pair to H. The second moves the H–${a.atom} bond electrons onto ${a.atom}. Both are needed, because hydrogen can't hold more than two electrons.`,
    }),
  );

  const protonProduct = transfers.map(({ b, a }) =>
    make("arrows", "arrows:proton-product", {
      key: `${b.label}+${a.atom}`,
      prompt: "What are the products of these arrows?",
      visuals: [{ kind: "scene", scene: protonTransfer(b.draw, a.atom, "correct") }],
      options: [
        `${b.conj} + ${a.leaving}`,
        `${b.label} + ${a.full} (no change)`,
        `${b.label.replace("⁻", "")}–${a.atom} + H⁻`,
      ],
      explanation: `The base gains H⁺ to become ${b.conj}, and the electrons of the H–${a.atom} bond leave with ${a.atom} to give ${a.leaving}.`,
    }),
  );

  const protonFlaw = transfers.flatMap(({ b, a }) => [
    make("arrows", "arrows:flaw", {
      key: `proton-reversed:${b.label}+${a.atom}`,
      prompt: "What is wrong with these arrows?",
      visuals: [{ kind: "scene", scene: protonTransfer(b.draw, a.atom, "reversed") }],
      options: [
        "They point backward: arrows must start at electrons and end where the electrons go",
        "There should be only one arrow because only a proton moves",
        "The base should attack the other atom rather than the hydrogen",
        "Nothing is wrong with these arrows as they are drawn",
      ],
      explanation: `Arrows show electrons moving from source to destination. The lone pair on ${b.label} is the source, so the first arrow must start there rather than at H.`,
    }),
    make("arrows", "arrows:flaw", {
      key: `proton-missing:${b.label}+${a.atom}`,
      prompt: "What is wrong with these arrows?",
      visuals: [{ kind: "scene", scene: protonTransfer(b.draw, a.atom, "missing") }],
      options: [
        `An arrow is missing: the H–${a.atom} bond must break, or hydrogen ends up with two bonds`,
        "The arrow points backward: it must start at the hydrogen",
        "The base can't react because it has only one lone pair",
        "Nothing is wrong with these arrows as they are drawn",
      ],
      explanation: `Hydrogen can only hold two electrons. Forming a new bond to it requires a second arrow moving the H–${a.atom} electrons onto ${a.atom}.`,
    }),
  ]);

  const carbonylPick = additions.map(({ n, c }) =>
    make("arrows", "arrows:carbonyl-pick", {
      key: `${n.label}+${c.name}`,
      prompt: `Which drawing correctly shows ${n.name} adding to ${c.name}?`,
      options: (["correct", "noPi", "piReversed", "attackO"] as const).map((v) => scene(carbonylAddition(n.label, c.r1, c.r2, v))),
      explanation: `The nucleophile attacks the δ+ carbonyl carbon, and the π bond's electrons move onto oxygen. Without that second arrow, carbon would end up with five bonds.`,
    }),
  );

  const carbonylProduct = additions.map(({ n, c }) => {
    const product = `[O-]C(${c.s1})(${c.s2})${n.smiles}`;
    return make("arrows", "arrows:carbonyl-product", {
      key: `${n.label}+${c.name}`,
      prompt: "What product do these arrows give?",
      visuals: [{ kind: "scene", scene: carbonylAddition(n.label, c.r1, c.r2, "correct") }],
      options: [
        molOption(product),
        molOption(`O=C(${c.s1})${c.s2}`),
        molOption(`[C-](${c.s1})(${c.s2})${n.oAttack}`),
      ],
      explanation: `${n.label} bonds to the carbonyl carbon and the C=O π electrons become a lone pair on oxygen, so the product is a tetrahedral alkoxide with a negative charge on oxygen.`,
    });
  });

  const carbonylFlaw = additions.flatMap(({ n, c }) => [
    make("arrows", "arrows:flaw", {
      key: `carbonyl-nopi:${n.label}+${c.name}`,
      prompt: "What is wrong with this arrow?",
      visuals: [{ kind: "scene", scene: carbonylAddition(n.label, c.r1, c.r2, "noPi") }],
      options: [
        "Carbon would end up with five bonds, so the π bond must also move onto oxygen",
        "The arrow should start at the carbon and end on the nucleophile",
        "The nucleophile should attack the oxygen rather than the carbon",
        "Nothing is wrong with this arrow as it is drawn",
      ],
      explanation: "A carbonyl carbon already has four bonds. A new bond to it requires a second arrow that moves the C=O π electrons onto oxygen.",
    }),
    make("arrows", "arrows:flaw", {
      key: `carbonyl-pi:${n.label}+${c.name}`,
      prompt: "What is wrong with these arrows?",
      visuals: [{ kind: "scene", scene: carbonylAddition(n.label, c.r1, c.r2, "piReversed") }],
      options: [
        "The second arrow points the wrong way: π electrons must move from the bond to oxygen",
        "The first arrow should start at the carbon and end on the nucleophile",
        "The nucleophile should attack the oxygen rather than the carbon",
        "Nothing is wrong with these arrows as they are drawn",
      ],
      explanation: "As drawn, electrons push into the C=O bond from oxygen, which would give carbon five bonds. The arrow should start on the π bond and end on oxygen.",
    }),
    make("arrows", "arrows:flaw", {
      key: `carbonyl-o:${n.label}+${c.name}`,
      prompt: "What is wrong with these arrows?",
      visuals: [{ kind: "scene", scene: carbonylAddition(n.label, c.r1, c.r2, "attackO") }],
      options: [
        "The nucleophile should attack the δ+ carbon, not the electron-rich oxygen",
        "The arrow from the nucleophile should start at the oxygen instead",
        "There should only be one arrow because only one bond forms",
        "Nothing is wrong with these arrows as they are drawn",
      ],
      explanation: "Oxygen pulls electrons in the C=O bond and carries δ−, so a nucleophile is attracted to the δ+ carbon instead.",
    }),
  ]);

  const substitutionPick = substitutions.map(({ n, s }) =>
    make("arrows", "arrows:sn2-pick", {
      key: `${n.label}+${s.group}${s.leaving}`,
      prompt: `Which drawing correctly shows ${n.name} displacing ${s.leaving} from ${s.group === "H₃C" ? "CH₃" : s.group}–${s.leaving}?`,
      options: (["correct", "reversed", "missing", "attackX"] as const).map((v) => scene(substitution(n.label, s.group, s.leaving, v))),
      explanation: `The nucleophile's lone pair bonds to carbon as the C–${s.leaving} bond's electrons leave with ${s.leaving}. Carbon keeps its octet because one bond forms as another breaks.`,
    }),
  );

  const substitutionProduct = substitutions.map(({ n, s }) => {
    const carbon = s.group === "H₃C" ? "CH₃" : s.group;
    return make("arrows", "arrows:sn2-product", {
      key: `${n.label}+${s.group}${s.leaving}`,
      prompt: "What are the products of these arrows?",
      visuals: [{ kind: "scene", scene: substitution(n.label, s.group, s.leaving, "correct") }],
      options: [
        `${carbon}–${n.attached} + ${s.leaving}⁻`,
        `${carbon}–${s.leaving} + ${n.label} (no change)`,
        `${n.attached}–${s.leaving} + ${carbon}⁻`,
      ],
      explanation: `The nucleophile bonds to carbon, forming ${carbon}–${n.attached}. The C–${s.leaving} electrons leave with ${s.leaving} as ${s.leaving}⁻.`,
    });
  });

  const substitutionFlaw = substitutions.map(({ n, s }) =>
    make("arrows", "arrows:flaw", {
      key: `sn2-missing:${n.label}+${s.group}${s.leaving}`,
      prompt: "What is wrong with this arrow?",
      visuals: [{ kind: "scene", scene: substitution(n.label, s.group, s.leaving, "missing") }],
      options: [
        `Carbon would end up with five bonds, so the C–${s.leaving} bond must also break`,
        "The arrow should start at the carbon and end on the nucleophile",
        `The nucleophile should attack ${s.leaving} rather than the carbon`,
        "Nothing is wrong with this arrow as it is drawn",
      ],
      explanation: `A saturated carbon already has four bonds. A second arrow must move the C–${s.leaving} electrons onto ${s.leaving} as the new bond forms.`,
    }),
  );

  const cationPick = CATION_NUCS.flatMap((n) =>
    CATIONS.map((c) =>
      make("arrows", "arrows:cation-pick", {
        key: `${n.label}+${c.group}`,
        prompt: `Which drawing correctly shows ${n.label} bonding to the carbocation?`,
        options: (["correct", "reversed"] as const).map((v) => scene(cationCapture(n.draw, c.label, v))),
        explanation: "The arrow goes from the nucleophile's lone pair to the empty p orbital of the positive carbon. Only one arrow is needed, because the carbocation has room for a new bond.",
      }),
    ),
  );

  const cationProduct = CATION_NUCS.flatMap((n) =>
    CATIONS.map((c) =>
      make("arrows", "arrows:cation-product", {
        key: `${n.label}+${c.group}`,
        prompt: "What is the product of this arrow?",
        visuals: [{ kind: "scene", scene: cationCapture(n.draw, c.label, "correct") }],
        options: [
          `${c.group}–${n.attached}`,
          `${n.label} and ${c.label} (no change)`,
          `${c.group}⁻ and ${n.oxidized}`,
        ],
        explanation: `The lone pair forms a new bond to the positive carbon, giving ${c.group}–${n.attached}. Add the charges to check: the total on each side must match.`,
      }),
    ),
  );

  const alkene = [
    { atom: "Cl", full: "HCl" },
    { atom: "Br", full: "HBr" },
    { atom: "I", full: "HI" },
  ].map((a) =>
    make("arrows", "arrows:alkene", {
      key: a.atom,
      prompt: `Which drawing correctly shows ethylene taking a proton from ${a.full}?`,
      options: (["correct", "fromH", "missing"] as const).map((v) => scene(alkeneProtonation(a.atom, v))),
      explanation: `The C=C π electrons bond to H, and the H–${a.atom} electrons leave with ${a.atom}. The result is a carbocation and ${a.atom}⁻.`,
    }),
  );

  const charges = FORMAL_CHARGE.map((f) => {
    const answer = f.v - f.bonds - f.lp * 2;
    return make("arrows", "arrows:charge", {
      key: `${f.atom}:${f.bonds}:${f.lp}`,
      prompt: `After the arrows are followed, an atom of ${f.atom} has ${f.bonds} bond${f.bonds === 1 ? "" : "s"} and ${f.lp} lone pair${f.lp === 1 ? "" : "s"}. What is its formal charge?`,
      options: [answer, answer + 1, answer - 1, answer + 2].map(chargeText),
      explanation: `Formal charge = valence electrons − bonds − lone pair electrons = ${f.v} − ${f.bonds} − ${f.lp * 2} = ${chargeText(answer)}.`,
    });
  });

  return [
    ...protonPick,
    ...protonProduct,
    ...protonFlaw,
    ...carbonylPick,
    ...carbonylProduct,
    ...carbonylFlaw,
    ...substitutionPick,
    ...substitutionProduct,
    ...substitutionFlaw,
    ...cationPick,
    ...cationProduct,
    ...alkene,
    ...charges,
  ];
}
