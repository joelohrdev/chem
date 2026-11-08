import { handwritten } from "../author";

export const enthalpy = handwritten("enthalpy", [
  {
    exam: true,
    prompt: "Does breaking bonds release energy or take energy?",
    options: ["It takes energy", "It releases energy", "It depends on the bond", "It neither takes nor releases energy"],
    explanation:
      "Bonds hold atoms in a lower-energy arrangement, so pulling them apart always requires an energy input. A common misconception is that breaking bonds releases energy.",
  },
  {
    exam: true,
    prompt: "Based on the energy it needs, is breaking bonds an exothermic or endothermic process?",
    options: ["Endothermic", "Exothermic", "Isothermal", "It can be either, depending on the bond"],
    explanation:
      "A process that absorbs heat is endothermic, with ΔH > 0. Every bond dissociation energy is a positive number.",
  },
  {
    prompt: "What happens when a new bond forms?",
    options: [
      "Energy is released, which is exothermic",
      "Energy is absorbed, which is endothermic",
      "Energy is released, which is endothermic",
      "Energy is absorbed, which is exothermic",
    ],
    explanation:
      "Bond formation is the reverse of bond breaking, so it releases the same amount of energy and ΔH is negative.",
  },
  {
    prompt: "How do you estimate ΔH for a reaction from bond dissociation energies (BDEs)?",
    options: [
      "Sum of BDEs of bonds broken minus sum of BDEs of bonds formed",
      "Sum of BDEs of bonds formed minus sum of BDEs of bonds broken",
      "Sum of BDEs of every bond in the reactants and products",
      "Largest BDE in the products minus smallest BDE in the reactants",
    ],
    explanation:
      "Breaking bonds costs energy (positive) and forming bonds pays it back (negative). So ΔH = Σ(broken) − Σ(formed).",
  },
  {
    prompt: "What does an exothermic reaction do?",
    options: [
      "Releases heat to the surroundings and has ΔH < 0",
      "Absorbs heat from the surroundings and has ΔH < 0",
      "Releases heat to the surroundings and has ΔH > 0",
      "Absorbs heat from the surroundings and has ΔH > 0",
    ],
    explanation:
      "Exothermic reactions lose heat from the system, so ΔH is negative and the surroundings warm up.",
  },
  {
    prompt: "A reaction flask becomes cold to the touch as a reaction runs. What does that tell you?",
    options: [
      "The reaction is endothermic",
      "The reaction is exothermic",
      "The reaction has reached equilibrium",
      "The reaction is nonspontaneous",
    ],
    explanation:
      "The reaction absorbs heat from its surroundings, including the flask and your hand. It can still be spontaneous if entropy increases enough.",
  },
  {
    prompt: "When is a reaction exothermic, in terms of bond strength?",
    options: [
      "When the bonds formed are stronger overall than the bonds broken",
      "When the bonds broken are stronger overall than the bonds formed",
      "When the number of bonds broken equals the number formed",
      "When the reaction involves only single bonds",
    ],
    explanation:
      "More energy is released by forming strong bonds than was spent breaking the weaker ones, so ΔH is negative.",
  },
  {
    prompt: "A strong bond has which of these?",
    options: [
      "A high bond dissociation energy and a lower-energy (more stable) arrangement",
      "A low bond dissociation energy and a lower-energy (more stable) arrangement",
      "A high bond dissociation energy and a higher-energy (less stable) arrangement",
      "A low bond dissociation energy and a higher-energy (less stable) arrangement",
    ],
    explanation:
      "BDE is the energy required to break a bond homolytically. Stronger bonds have larger BDEs and correspond to more stable bonded atoms.",
  },
  {
    prompt: "What happens in homolytic bond cleavage?",
    options: [
      "Each atom gets one electron, producing two radicals",
      "One atom gets both electrons, producing two ions",
      "Both atoms lose their electrons to a solvent molecule",
      "A new π bond forms between the two atoms",
    ],
    explanation:
      "Homolytic means splitting evenly and is shown with fishhook arrows. Heterolytic cleavage gives both electrons to one atom and produces ions.",
  },
  {
    prompt: "Bond dissociation energies are usually defined for which kind of bond breaking?",
    options: [
      "Homolytic, in the gas phase",
      "Heterolytic, in water",
      "Heterolytic, in the gas phase",
      "Homolytic, in water",
    ],
    explanation:
      "BDE tables list the energy needed to split a bond into two radicals, so solvation effects don't complicate the numbers.",
  },
  {
    prompt: "Which hydrogen halide has the strongest H–X bond?",
    options: ["H–F", "H–Cl", "H–Br", "H–I"],
    explanation:
      "H–F is the strongest (about 570 kJ/mol) due to good orbital overlap. This strength is one reason HF is the weakest acid of the group, even though F is the most electronegative.",
  },
  {
    prompt: "Which carbon-halogen bond is the weakest?",
    options: ["C–I", "C–Br", "C–Cl", "C–F"],
    explanation:
      "Iodine's large orbitals overlap poorly with carbon's, so C–I is weakest (about 240 kJ/mol) and C–F is strongest (about 450 kJ/mol).",
  },
  {
    prompt: "Which C–H bond is the weakest?",
    options: [
      "A tertiary C–H, as in (CH₃)₃C–H",
      "A secondary C–H, as in (CH₃)₂CH–H",
      "A primary C–H, as in CH₃CH₂–H",
      "A methane C–H, as in CH₃–H",
    ],
    explanation:
      "Breaking the tertiary C–H gives the most stable radical. Radical stability follows 3° > 2° > 1° > methyl, so BDE follows the opposite order.",
  },
  {
    prompt: "Why are additions to alkenes (such as adding HBr) usually exothermic?",
    options: [
      "A π bond is replaced by a stronger σ bond",
      "A σ bond is replaced by a stronger π bond",
      "More bonds are broken than are formed overall",
      "The product is always a gas that leaves the mixture",
    ],
    explanation:
      "The C–C π bond is weaker (about 270 kJ/mol) than a C–C σ bond (about 370 kJ/mol). The trade favors the bonds in the product.",
  },
  {
    prompt: "Which bond is stronger: a C=C double bond taken as a whole, or a single C–C σ bond?",
    options: [
      "The C=C double bond, but less than twice the C–C σ bond",
      "The C–C σ bond, because π bonds destabilize atoms",
      "They are equal, because the same atoms are bonded",
      "The C=C double bond, at exactly twice the C–C σ bond",
    ],
    explanation:
      "A double bond is stronger overall (about 610 to 720 kJ/mol) than a single one (about 370), but less than twice it because π overlap is weaker.",
  },
  {
    prompt: "Why does the ring opening of cyclopropane release so much energy compared with opening a cyclohexane ring?",
    options: [
      "Cyclopropane's strained C–C bonds are unusually weak, and the strain is released",
      "Cyclopropane has more C–C bonds than cyclohexane does",
      "Cyclohexane contains double bonds, which absorb the energy",
      "Cyclopropane contains carbon atoms that are sp hybridized",
    ],
    explanation:
      "Bond angles of 60° force poor orbital overlap, so cyclopropane stores about 115 kJ/mol of strain. Cyclohexane has essentially none.",
  },
  {
    prompt: "A reaction has ΔH = −120 kJ/mol. What is the ΔH of the reverse reaction?",
    options: ["+120 kJ/mol", "−120 kJ/mol", "0 kJ/mol", "−240 kJ/mol"],
    explanation:
      "Reversing a reaction flips the sign of ΔH. The same energy difference is crossed in the opposite direction.",
  },
  {
    prompt: "Why can even a strongly exothermic reaction need heating to get started?",
    options: [
      "Bonds must begin breaking first, so there is still an activation barrier",
      "Exothermic reactions absorb heat before they can release it to products",
      "Heating makes the value of ΔH more negative as it runs",
      "Its products must be melted before they can form",
    ],
    explanation:
      "ΔH compares only the start and end. The path can still have a high barrier, as a burning match needs to be struck first.",
  },
  {
    prompt: "What is true for a reaction with a positive ΔH?",
    options: [
      "Reactants have stronger bonds overall than products",
      "Products have stronger bonds overall than reactants",
      "No bonds are broken during the reaction",
      "It must be nonspontaneous at every temperature",
    ],
    explanation:
      "A positive ΔH means more energy was spent breaking bonds than was recovered forming them. It can still be spontaneous if ΔS is positive enough at high temperature.",
  },
]);
