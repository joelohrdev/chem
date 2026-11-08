import { handwritten, mol, molOption } from "../author";
import type { Visual } from "../types";

const examReaction: Visual = {
  kind: "reaction",
  left: [{ smiles: "CC(=O)[CH-]C(C)=O" }, { smiles: "[NH3+]c1ccccc1" }],
  right: [{ smiles: "CC(=O)CC(C)=O" }, { smiles: "Nc1ccccc1" }],
  arrow: "equilibrium",
};

const examRoles = [
  molOption("CC(=O)[CH-]C(C)=O"),
  molOption("[NH3+]c1ccccc1"),
  molOption("CC(=O)CC(C)=O"),
  molOption("Nc1ccccc1"),
];

export const conjugate = handwritten("conjugate", [
  {
    exam: true,
    prompt: "In the reaction shown, which species is the acid?",
    visuals: [examReaction],
    options: [examRoles[1], examRoles[0], examRoles[2], examRoles[3]],
    explanation:
      "The acid donates H⁺. Anilinium loses a proton from its N⁺–H to become aniline, so anilinium is the acid.",
  },
  {
    exam: true,
    prompt: "In the reaction shown, which species is the base?",
    visuals: [examReaction],
    options: [examRoles[0], examRoles[1], examRoles[2], examRoles[3]],
    explanation:
      "The base accepts H⁺. The carbanion on the left gains a proton on its central carbon to become neutral pentane-2,4-dione.",
  },
  {
    exam: true,
    prompt: "In the reaction shown, which species is the conjugate acid?",
    visuals: [examReaction],
    options: [examRoles[2], examRoles[0], examRoles[1], examRoles[3]],
    explanation:
      "The conjugate acid forms when the base gains H⁺. The carbanion becomes neutral pentane-2,4-dione, so that is the conjugate acid.",
  },
  {
    exam: true,
    prompt: "In the reaction shown, which species is the conjugate base?",
    visuals: [examReaction],
    options: [examRoles[3], examRoles[0], examRoles[1], examRoles[2]],
    explanation:
      "The conjugate base is what remains after the acid gives up H⁺. Anilinium loses a proton and becomes aniline.",
  },
  {
    exam: true,
    prompt: "What is the conjugate acid of 4-isopropylcyclohexanol?",
    visuals: [mol("CC(C)C1CCC(O)CC1")],
    options: [
      molOption("CC(C)C1CCC([OH2+])CC1"),
      molOption("CC(C)C1CCC([O-])CC1"),
      molOption("CC(C)C1CCC(=O)CC1"),
      molOption("CC(C)C1CCCCC1"),
    ],
    explanation:
      "A conjugate acid has one more H⁺ than the base. The alcohol oxygen uses a lone pair to bond the proton, giving a positively charged R–OH₂⁺ group.",
  },
  {
    prompt: "What defines a Brønsted-Lowry acid?",
    options: ["It donates a proton", "It accepts a proton", "It donates an electron pair", "It accepts an electron pair"],
    explanation:
      "Brønsted-Lowry acids donate H⁺ and bases accept H⁺. The electron pair definitions belong to the Lewis model.",
  },
  {
    prompt: "What must a Brønsted-Lowry base have?",
    options: [
      "A lone pair or π bond that can bond to a proton",
      "A proton that it can give up",
      "An empty orbital that can accept electrons",
      "A positive charge to attract electrons",
    ],
    explanation:
      "Forming a bond to H⁺ requires a pair of electrons, which comes from a lone pair or π bond. A base doesn't have to be negatively charged.",
  },
  {
    prompt: "How does a conjugate base differ from its acid?",
    options: [
      "It has one fewer proton and a charge lower by one",
      "It has one more proton and a charge higher by one",
      "It has one fewer electron and a charge higher by one",
      "It has the same atoms and a rearranged skeleton",
    ],
    explanation:
      "Losing H⁺ removes one hydrogen and one positive charge. Neutral acids become −1 anions, and +1 acids become neutral.",
  },
  {
    prompt: "How does a conjugate acid differ from its base?",
    options: [
      "It has one more proton and a charge higher by one",
      "It has one fewer proton and a charge lower by one",
      "It has one more electron and a charge lower by one",
      "It has one more carbon atom and the same charge",
    ],
    explanation:
      "Gaining H⁺ adds one hydrogen and one positive charge. Neutral bases become +1 cations, and −1 bases become neutral.",
  },
  {
    prompt: "In the reaction NH₃ + H₂O ⇌ NH₄⁺ + HO⁻, what is water doing?",
    options: [
      "Acting as an acid by donating a proton to ammonia",
      "Acting as a base by accepting a proton from ammonia",
      "Acting as a Lewis acid by accepting a lone pair on oxygen",
      "Acting only as a solvent and taking no part in the reaction",
    ],
    explanation:
      "Water gives up H⁺ to become HO⁻, so it is the acid. Ammonia accepts the proton and is the base.",
  },
  {
    prompt: "In the reaction HCl + H₂O → Cl⁻ + H₃O⁺, what is water doing?",
    options: [
      "Acting as a base by accepting a proton from HCl",
      "Acting as an acid by donating a proton to HCl",
      "Acting as an oxidizing agent toward chloride",
      "Acting only as a solvent and taking no part in the reaction",
    ],
    explanation:
      "Water accepts H⁺ to form H₃O⁺, so it is the base. Water can act as an acid or a base depending on its partner.",
  },
  {
    prompt: "What is the word for a species that can act as either an acid or a base, such as H₂O or HCO₃⁻?",
    options: ["Amphoteric", "Aprotic", "Aromatic", "Isomeric"],
    explanation:
      "Amphoteric species can donate or accept a proton. Water can become H₃O⁺ or HO⁻, and HCO₃⁻ can become H₂CO₃ or CO₃²⁻.",
  },
  {
    prompt: "Which pair is NOT a conjugate acid-base pair?",
    options: ["H₃O⁺ and HO⁻", "H₂O and HO⁻", "NH₄⁺ and NH₃", "HCO₃⁻ and CO₃²⁻"],
    explanation:
      "A conjugate pair differs by exactly one proton. H₃O⁺ and HO⁻ differ by two.",
  },
  {
    prompt: "Where is acetone protonated by a strong acid?",
    visuals: [mol("CC(C)=O", "acetone")],
    options: [
      "On the carbonyl oxygen",
      "On the carbonyl carbon",
      "On a methyl carbon",
      "On a C–H bond of a methyl group",
    ],
    explanation:
      "The carbonyl oxygen has the lone pairs, so it takes the proton. This gives a resonance-stabilized cation with the charge shared between O and C. The carbons have no lone pair to bond H⁺.",
  },
  {
    prompt: "Which atom of an amide is protonated first by a strong acid?",
    visuals: [mol("CC(N)=O", "acetamide")],
    options: [
      "The carbonyl oxygen, because its cation is resonance stabilized and the N lone pair is delocalized",
      "The nitrogen, because nitrogen is always more basic than oxygen",
      "The carbonyl carbon, because it has a partial positive charge",
      "The methyl carbon, because it is the least hindered site",
    ],
    explanation:
      "The nitrogen's lone pair is delocalized into the carbonyl, so it isn't readily available. Protonating oxygen keeps that delocalization and gives a stabilized cation.",
  },
  {
    prompt: "Which site in 4-aminobutan-1-ol is protonated first by one equivalent of acid?",
    visuals: [mol("NCCCCO", "4-aminobutan-1-ol")],
    options: [
      "The nitrogen, because the less electronegative atom shares its lone pair more readily",
      "The oxygen, because the more electronegative atom attracts H⁺ more",
      "The carbon next to the oxygen, because it is the most electron-poor",
      "Both sites equally, because each has lone pairs available",
    ],
    explanation:
      "Amines are stronger bases than alcohols. RNH₃⁺ has a pKa near 10, whereas ROH₂⁺ is near −2, so the amine is protonated first.",
  },
  {
    prompt: "Which is the conjugate base of benzoic acid?",
    visuals: [mol("OC(=O)c1ccccc1", "benzoic acid")],
    options: [
      molOption("[O-]C(=O)c1ccccc1"),
      molOption("OC(=[OH+])c1ccccc1"),
      molOption("OC(=O)c1[c-]cccc1"),
      molOption("O=Cc1ccccc1"),
    ],
    explanation:
      "The O–H proton is the most acidic hydrogen. Removing it gives benzoate, with the charge shared by two oxygens.",
  },
  {
    prompt: "In a solution of NaOH, which species acts as the base?",
    options: ["HO⁻", "Na⁺", "NaOH molecules", "H₃O⁺"],
    explanation:
      "NaOH is ionic and separates into Na⁺ and HO⁻. Hydroxide does the proton accepting, and Na⁺ is a spectator ion.",
  },
  {
    prompt: "What is the difference between Lewis and Brønsted-Lowry acids?",
    options: [
      "Lewis acids accept an electron pair, and Brønsted-Lowry acids donate a proton",
      "Lewis acids donate a proton, and Brønsted-Lowry acids accept an electron pair",
      "Lewis acids must be cations, and Brønsted-Lowry acids must be neutral",
      "Lewis acids are organic, and Brønsted-Lowry acids are inorganic",
    ],
    explanation:
      "The Lewis definition is broader. H⁺ itself is a Lewis acid because it accepts a pair, and so is BF₃ even though it has no proton to donate.",
  },
  {
    prompt: "Which of these is a Lewis acid but not a Brønsted-Lowry acid?",
    options: ["BF₃", "HCl", "H₂O", "CH₃COOH"],
    explanation:
      "Boron in BF₃ has an empty p orbital that can accept a pair, but BF₃ has no H to donate.",
  },
  {
    prompt: "Which of these can act as a base by using a π bond rather than a lone pair?",
    options: ["An alkene", "An alkane", "A carbocation", "A proton"],
    explanation:
      "The π electrons of an alkene can bond H⁺, forming a carbocation as the conjugate acid.",
  },
  {
    prompt: "In the equilibrium H₂S + HO⁻ ⇌ HS⁻ + H₂O, which two species form the conjugate pair that includes the reactant base?",
    options: ["HO⁻ and H₂O", "H₂S and HS⁻", "H₂S and H₂O", "HO⁻ and HS⁻"],
    explanation:
      "Hydroxide is the base and gains a proton to become water, its conjugate acid. H₂S and HS⁻ are the other pair.",
  },
  {
    prompt: "What is true of the two sides of an acid-base reaction?",
    options: [
      "Each side has one acid and one base",
      "Reactants are both acids and products are both bases",
      "Reactants are both bases and products are both acids",
      "Only the reactant side has acids and bases",
    ],
    explanation:
      "Every proton transfer has an acid and a base on each side. The reverse reaction uses the conjugate acid and conjugate base.",
  },
  {
    prompt: "What is the conjugate acid of the amine shown?",
    visuals: [mol("CCN(CC)CC", "triethylamine")],
    options: [
      molOption("CC[NH+](CC)CC"),
      molOption("CC[N-]CC"),
      molOption("CC[N+](CC)(CC)CC"),
      molOption("CCNCC"),
    ],
    explanation:
      "The nitrogen lone pair bonds H⁺ to give a trialkylammonium ion, with one more hydrogen and a +1 charge.",
  },
]);
