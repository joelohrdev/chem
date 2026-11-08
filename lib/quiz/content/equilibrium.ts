import { handwritten } from "../author";
import type { Visual } from "../types";

const examReaction: Visual = {
  kind: "reaction",
  left: [{ smiles: "CC(=O)[CH-]C(C)=O" }, { smiles: "[NH3+]c1ccccc1" }],
  right: [{ smiles: "CC(=O)CC(C)=O" }, { smiles: "Nc1ccccc1" }],
  arrow: "equilibrium",
};

export const equilibrium = handwritten("equilibrium", [
  {
    exam: true,
    prompt:
      "Compare the acid (anilinium, pKa about 4.6) and the conjugate acid (pentane-2,4-dione, pKa about 9). Which side does the equilibrium favor?",
    visuals: [examReaction],
    options: [
      "Products, because pentane-2,4-dione is the weaker acid",
      "Reactants, because anilinium is the stronger acid",
      "Products, because aniline is the stronger base",
      "Reactants, because pentane-2,4-dione has the higher pKa",
    ],
    explanation:
      "Equilibrium favors the side with the weaker acid, which is the side with the higher pKa. Pentane-2,4-dione (about 9) is on the product side. Keq is about 10^(9 − 4.6), or roughly 10⁴·⁴.",
  },
  {
    prompt: "An acid-base equilibrium favors the side with which of these?",
    options: [
      "The weaker acid and weaker base",
      "The stronger acid and stronger base",
      "The stronger acid and weaker base",
      "The weaker acid and stronger base",
    ],
    explanation:
      "Strong acids and strong bases react to form their weaker, more stable counterparts. The weaker acid is always paired with the weaker base on the same side.",
  },
  {
    prompt: "In terms of pKa, which side of an acid-base equilibrium is favored?",
    options: [
      "The side whose acid has the higher pKa",
      "The side whose acid has the lower pKa",
      "The side whose base has the higher mass",
      "The side with the larger number of molecules",
    ],
    explanation:
      "A higher pKa means a weaker acid. Find the acid on each side and compare; the higher pKa marks the favored side.",
  },
  {
    prompt: "What does Keq > 1 mean for an acid-base reaction?",
    options: [
      "Products are favored and ΔG° is negative",
      "Reactants are favored and ΔG° is positive",
      "Products are favored and ΔG° is positive",
      "The rate is fast and Ea is small",
    ],
    explanation:
      "ΔG° = −RT ln Keq, so Keq > 1 gives a negative ΔG°. Keq describes where equilibrium lies but says nothing about how fast it gets there.",
  },
  {
    prompt: "For HA + B⁻ ⇌ A⁻ + HB, what is log Keq?",
    options: ["pKa(HB) − pKa(HA)", "pKa(HA) − pKa(HB)", "pKa(HA) + pKa(HB)", "pKa(HA) × pKa(HB)"],
    explanation:
      "Keq = Ka(HA) / Ka(HB). Taking the log gives pKa(HB) − pKa(HA), so the difference between the two acids' pKa values sets the size of Keq.",
  },
  {
    prompt: "To largely deprotonate a compound, the base's conjugate acid must have what property?",
    options: [
      "A higher pKa than the compound being deprotonated",
      "A lower pKa than the compound being deprotonated",
      "The same pKa as the compound being deprotonated",
      "A positive pKa regardless of the compound",
    ],
    explanation:
      "The reaction favors the weaker acid. If the conjugate acid formed has a higher pKa than the starting acid, the equilibrium lies toward deprotonation.",
  },
  {
    prompt: "Can NaOH largely deprotonate a terminal alkyne (pKa about 25)?",
    options: [
      "No, because water (pKa 15.7) is a much stronger acid than the alkyne",
      "Yes, because hydroxide is a strong base in water",
      "Yes, because the alkyne has an sp carbon",
      "No, because hydroxide has no lone pairs available",
    ],
    explanation:
      "Equilibrium favors the weaker acid, and here that's the alkyne (25) rather than water (15.7). You need a stronger base such as NaNH₂, whose conjugate acid NH₃ has a pKa near 38.",
  },
  {
    prompt: "Which base is strong enough to fully deprotonate a terminal alkyne (pKa about 25)?",
    options: ["NaNH₂", "NaOH", "NaOCH₂CH₃", "NaHCO₃"],
    explanation:
      "The conjugate acid must be weaker than the alkyne. NH₃ has a pKa near 38. Water (15.7), ethanol (16), and carbonic acid (6.4) are all stronger acids than the alkyne.",
  },
  {
    prompt: "Sodium hydride (NaH) deprotonates an alcohol almost completely. Why?",
    options: [
      "H₂, the conjugate acid, is a far weaker acid (pKa about 35) and also leaves as a gas",
      "H₂, the conjugate acid, is a far stronger acid than an alcohol",
      "Sodium ions bond to the alcohol's oxygen and remove the proton",
      "Hydride is a weak base that reacts only with very strong acids",
    ],
    explanation:
      "An alcohol's pKa is about 16 and H₂'s is about 35, which favors products by a factor near 10¹⁹. Loss of H₂ gas also removes the conjugate acid from the mixture.",
  },
  {
    prompt:
      "Aqueous NaHCO₃ dissolves a carboxylic acid (pKa about 5) but not a simple phenol (pKa about 10). Why? (H₂CO₃ pKa is about 6.4.)",
    options: [
      "H₂CO₃ is a weaker acid than the carboxylic acid but a stronger acid than phenol",
      "H₂CO₃ is a stronger acid than the carboxylic acid but a weaker acid than phenol",
      "Bicarbonate reacts only with compounds that have a carbonyl group",
      "Phenol's ring prevents bicarbonate from reaching the O–H proton",
    ],
    explanation:
      "Deprotonation is favored only when the conjugate acid formed is weaker than the starting acid. pKa 6.4 is higher than 5 (favored) but lower than 10 (not favored).",
  },
  {
    prompt: "Why can't a base much stronger than HO⁻ exist at significant concentration in water?",
    options: [
      "It would deprotonate water and form HO⁻",
      "It would be oxidized by the dissolved oxygen",
      "It would not dissolve because it is nonpolar",
      "It would be protonated only by H₃O⁺ present in large amounts",
    ],
    explanation:
      "This is the leveling effect. Water is present in huge excess, so a stronger base such as NH₂⁻ reacts with it to produce HO⁻. That's why strong bases are used in solvents less acidic than the compound being deprotonated.",
  },
  {
    prompt: "An acid has pKa 7 and the solution has pH 7. What is the ratio of [HA] to [A⁻]?",
    options: ["1 to 1", "10 to 1", "1 to 10", "7 to 1"],
    explanation:
      "When pH = pKa, log([A⁻]/[HA]) = 0 by the Henderson-Hasselbalch equation, so the two forms are equal.",
  },
  {
    prompt: "Acetic acid (pKa 4.8) is dissolved at pH 7. In which form is it mostly found?",
    options: [
      "Acetate, because pH is above the pKa",
      "Acetic acid, because pH is above the pKa",
      "Equal parts acid and acetate",
      "Protonated acetic acid, CH₃C(OH)₂⁺",
    ],
    explanation:
      "When pH is greater than pKa, the deprotonated form dominates. Here it is favored by about 10^(7 − 4.8), or roughly 160 to 1.",
  },
  {
    prompt: "A reaction has an acid of pKa 5 on the left and an acid of pKa 15 on the right. Roughly how large is Keq?",
    options: ["10¹⁰", "10⁻¹⁰", "10", "20"],
    explanation:
      "log Keq = pKa(right acid) − pKa(left acid) = 15 − 5 = 10, so Keq is about 10¹⁰. Products are hugely favored.",
  },
  {
    prompt: "A reaction has an acid of pKa 16 on the left and an acid of pKa 4.8 on the right. Which description is correct?",
    options: [
      "Reactants are favored and Keq is much less than 1",
      "Products are favored and Keq is much greater than 1",
      "Neither side is favored and Keq is close to 1",
      "Reactants are favored and Keq is much greater than 1",
    ],
    explanation:
      "The stronger acid (pKa 4.8) is on the right, so equilibrium favors the left. log Keq = 4.8 − 16 = −11.2.",
  },
  {
    prompt: "Why is an alkoxide formed essentially completely by NaH but only partly by NaOH?",
    options: [
      "H₂ is far weaker than the alcohol as an acid, but water and the alcohol have similar pKa values",
      "NaOH can't dissolve in alcohols, while NaH dissolves very easily",
      "Hydride has more lone pairs available than hydroxide",
      "Alkoxides react with sodium hydride to form a stable complex",
    ],
    explanation:
      "Water (15.7) and an alcohol (about 16) are close in pKa, so Keq with NaOH is near 1. With NaH the conjugate acid has a pKa near 35, so the reaction goes essentially to completion.",
  },
  {
    prompt: "In an acid-base reaction, what relationship usually lets the reaction proceed quickly once acid and base meet?",
    options: [
      "Proton transfers between O, N, and halogens usually have low activation energies",
      "All acid-base reactions have a large negative ΔS",
      "All acid-base reactions must pass through a carbocation",
      "Acid-base reactions always occur in many separate steps",
    ],
    explanation:
      "Proton transfers involving lone pairs on electronegative atoms are among the fastest reactions known, so equilibrium is typically reached almost instantly. That's why they are analyzed by pKa rather than rate.",
  },
  {
    prompt: "Which change makes an acid-base equilibrium lie further toward products?",
    options: [
      "Using a stronger base in the reaction",
      "Using a weaker acid in the reaction",
      "Adding more of the conjugate acid",
      "Adding a catalyst to the reaction",
    ],
    explanation:
      "A stronger base has a higher-pKa conjugate acid, which raises Keq. A catalyst only speeds up reaching equilibrium and doesn't change its position.",
  },
]);
