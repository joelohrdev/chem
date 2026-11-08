import { handwritten, molOption } from "../author";
import { acetoneDeprotonation, examFlawedCyanide } from "../scenes";

export const arrows = handwritten("arrows", [
  {
    exam: true,
    prompt: "Which product do these arrows give? (Water forms as the other product.)",
    visuals: [{ kind: "scene", scene: acetoneDeprotonation() }],
    options: [
      molOption("C=C(C)[O-]"),
      molOption("CC(C)=O"),
      molOption("CC(C)([O-])O"),
      molOption("C=C(C)O"),
    ],
    explanation:
      "Hydroxide takes the alpha proton, the C–H electrons form a new C=C π bond, and the C=O π electrons move onto oxygen. The product is an enolate with the negative charge on oxygen.",
  },
  {
    exam: true,
    prompt: "These arrows are drawn incorrectly. What is wrong?",
    visuals: [{ kind: "scene", scene: examFlawedCyanide() }],
    options: [
      "The C=O π bond must move onto oxygen, or carbon ends up with five bonds",
      "Cyanide can't donate electrons because it carries a negative charge",
      "The first arrow should go from the carbonyl carbon to cyanide",
      "The nucleophile must attack the oxygen rather than the carbon",
    ],
    explanation:
      "Cyanide attacking the carbon is right. But the second arrow should start at the C=O π bond and end on oxygen. Otherwise carbon gains a fifth bond and breaks the octet rule.",
  },
  {
    exam: true,
    prompt:
      "In the reaction of the pentane-2,4-dione carbanion with anilinium, which arrows belong on the reactant side?",
    visuals: [
      {
        kind: "reaction",
        left: [{ smiles: "CC(=O)[CH-]C(C)=O" }, { smiles: "[NH3+]c1ccccc1" }],
        right: [{ smiles: "CC(=O)CC(C)=O" }, { smiles: "Nc1ccccc1" }],
        arrow: "equilibrium",
      },
    ],
    options: [
      "Carbanion lone pair to the N–H hydrogen, and N–H bond onto nitrogen",
      "N–H hydrogen to the carbanion lone pair, and nitrogen to the N–H bond",
      "Nitrogen lone pair to the carbanion, and C=O bond onto the oxygen",
      "Carbanion lone pair to nitrogen, and N–H bond onto the hydrogen",
    ],
    explanation:
      "Arrows follow electrons. The carbanion's lone pair forms a new C–H bond, and the N–H bonding electrons become nitrogen's lone pair, which cancels its positive charge.",
  },
  {
    prompt: "What does a double-barbed curved arrow show?",
    options: [
      "The movement of a pair of electrons",
      "The movement of one electron",
      "The movement of one atom",
      "The movement of one proton",
    ],
    explanation: "A full-headed arrow means two electrons move. A fishhook arrow, with half a head, means one.",
  },
  {
    prompt: "Where must a curved arrow start?",
    options: [
      "At a source of electrons, such as a lone pair or bond",
      "At the atom that will receive the electrons",
      "At a positive charge or an empty orbital",
      "At the hydrogen being transferred",
    ],
    explanation: "The tail goes where the electrons are now. That's always a lone pair or a bond.",
  },
  {
    prompt: "Where must a curved arrow end?",
    options: [
      "Where the electrons end up: on an atom, or between two atoms to form a bond",
      "Where the electrons started: on a lone pair or a bond",
      "On a hydrogen atom in all cases, because protons accept electrons",
      "On a formal negative charge, because it attracts electrons",
    ],
    explanation:
      "The head shows the destination. It becomes a lone pair if it lands on an atom or a new bond if it lands between atoms.",
  },
  {
    prompt: "Which arrow is always drawn incorrectly?",
    options: [
      "One from H⁺ to a base's lone pair",
      "One from a base's lone pair to an acidic H",
      "One from a C=O π bond to its oxygen",
      "One from an O–H bond to its oxygen",
    ],
    explanation:
      "H⁺ has no electrons to push, so an arrow can't start there. Electrons move toward the proton, not the other way.",
  },
  {
    prompt: "Why can't an arrow push electrons onto a neutral carbon that already has four bonds, unless a bond also breaks?",
    options: [
      "Carbon would have five bonds and more than an octet",
      "Carbon has no valence orbitals that can overlap with others",
      "Carbon would then gain a positive formal charge",
      "Carbon can only accept electrons from a hydrogen atom",
    ],
    explanation:
      "Second-row atoms have only four valence orbitals. Every new bond to a full carbon must come with another arrow removing a bond from it.",
  },
  {
    prompt: "What is the maximum number of electrons around hydrogen?",
    options: ["2", "1", "4", "8"],
    explanation:
      "Hydrogen has only a 1s orbital. That's why making a new bond to an H that is already bonded requires an arrow breaking its old bond.",
  },
  {
    prompt: "What is the first thing a nucleophile does in a reaction?",
    options: [
      "It donates a pair of electrons to an electron-poor atom",
      "It accepts a pair of electrons from an electron-rich atom",
      "It gives up a proton to a base in the solution",
      "It loses one electron to form a free radical",
    ],
    explanation:
      "Nucleophiles are electron-rich and seek positive centers. Electrophiles are electron-poor and accept the pair.",
  },
  {
    prompt: "Which of these is an electrophile?",
    options: ["A carbocation, such as (CH₃)₃C⁺", "Hydroxide, HO⁻", "Ammonia, NH₃", "Cyanide, CN⁻"],
    explanation:
      "A carbocation has an empty p orbital and accepts a pair of electrons. The other three have lone pairs to donate, so they are nucleophiles.",
  },
  {
    prompt: "Which carbon in a C=O group is attacked by nucleophiles, and why?",
    options: [
      "The carbonyl carbon, because the oxygen pulls electrons away and leaves it partially positive",
      "The carbon next to the carbonyl, because it is the most electron-rich",
      "Neither carbon, because the oxygen is always attacked first",
      "The carbonyl carbon, because it carries a partial negative charge",
    ],
    explanation:
      "Oxygen is more electronegative, so the C=O bond is polarized with δ+ on carbon. That carbon is electrophilic.",
  },
  {
    prompt: "A neutral oxygen lone pair forms a new bond to H⁺. What is oxygen's formal charge after?",
    options: ["+1", "0", "−1", "+2"],
    explanation:
      "Oxygen starts with 6 valence electrons. In R–OH₂⁺, it has three bonds and one lone pair, for a count of 5, so its formal charge is +1.",
  },
  {
    prompt: "An O–H bond breaks and both electrons move to oxygen. What's the charge on that oxygen in R–O?",
    options: ["−1", "0", "+1", "−2"],
    explanation:
      "Oxygen now has one bond and three lone pairs, for a count of 7 electrons. That's one more than its 6 valence electrons, so it's −1.",
  },
  {
    prompt: "When you draw a resonance structure with curved arrows, what must never move?",
    options: ["The atoms", "The lone pairs", "The π electrons", "The formal charges"],
    explanation:
      "Resonance forms differ only in electron placement. If an atom moves, you've drawn a different molecule (a constitutional isomer).",
  },
  {
    prompt: "In a nucleophilic substitution such as HO⁻ + CH₃Br → CH₃OH + Br⁻, which set of arrows is right?",
    options: [
      "One from the HO⁻ lone pair to carbon, and one from the C–Br bond to bromine",
      "One from carbon to the HO⁻ lone pair, and one from bromine to the C–Br bond",
      "One from the HO⁻ lone pair to bromine, and one from the C–Br bond to carbon",
      "One from the HO⁻ lone pair to carbon and no other arrows at all",
    ],
    explanation:
      "Oxygen brings in the new pair, and the C–Br electrons leave with bromine. Carbon keeps its octet, with one bond made as another breaks.",
  },
  {
    prompt: "A charge check for an arrow-pushing step: what must be true of the net charge on each side?",
    options: [
      "It must be the same on both sides",
      "It must be zero on both sides",
      "It must be more negative on the product side",
      "It must be more positive on the product side",
    ],
    explanation:
      "Electrons only move around, so total charge is conserved. If the net charge differs, the arrows or charges have been drawn wrong.",
  },
  {
    prompt: "What does a fishhook (single-barbed) arrow show?",
    options: [
      "The movement of one electron, as in radical reactions",
      "The movement of two electrons, as in polar reactions",
      "The movement of a proton from one base to another",
      "A reaction that is at equilibrium",
    ],
    explanation: "Fishhook arrows come in pairs in bond homolysis, where each atom keeps one electron.",
  },
  {
    prompt: "An alkene reacts with HBr. Where does the first arrow start?",
    options: [
      "At the C=C π bond, ending on the H of H–Br",
      "At the H of H–Br, ending on the C=C π bond",
      "At the H–Br bond, ending on the C=C π bond",
      "At the bromine atom, ending on one alkene carbon",
    ],
    explanation:
      "The π bond is the electron source and H is the electrophilic site. A second arrow moves the H–Br bond electrons onto bromine.",
  },
  {
    prompt: "What's the product when a chloride ion captures a tert-butyl cation?",
    options: [
      molOption("CC(C)(C)Cl"),
      molOption("CC(C)C"),
      molOption("C=C(C)C"),
      molOption("CC(C)(C)O"),
    ],
    explanation:
      "Chloride's lone pair bonds to the empty p orbital of the carbocation carbon, giving neutral tert-butyl chloride.",
  },
  {
    prompt: "A curved arrow is drawn from an O–H bond to the oxygen. What happens?",
    options: [
      "The O–H bond breaks and oxygen keeps both electrons",
      "The O–H bond breaks and hydrogen keeps both electrons",
      "A second bond forms between oxygen and hydrogen",
      "Oxygen loses one of its lone pairs to hydrogen",
    ],
    explanation:
      "The tail on the bond means that bond's electrons move. The head on O means they become a lone pair there, and H leaves as a proton.",
  },
]);
