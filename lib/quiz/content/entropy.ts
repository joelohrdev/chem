import { handwritten } from "../author";
import type { Visual } from "../types";

const reaction = (label: string, left: string[], right: string[]): Visual => ({
  kind: "reaction",
  label,
  arrow: "forward",
  left: left.map((smiles) => ({ smiles })),
  right: right.map((smiles) => ({ smiles })),
});

export const entropy = handwritten("entropy", [
  {
    exam: true,
    keepOrder: true,
    answer: 4,
    prompt: "From the following reactions, which one(s) would you expect to have a negative ΔS?",
    visuals: [
      reaction("I", ["C1=CCCC1", "BrBr"], ["BrC1CCCC1Br"]),
      reaction("II", ["CC(C)(Br)CCC=C"], ["CC1(C)CCC(Br)C1"]),
      reaction("III", ["OC1(Cl)CCC1"], ["O=C1CCC1", "Cl"]),
      reaction("IV", ["BrCC1CC1"], ["C=CCCBr"]),
    ],
    options: ["I", "II", "III", "IV", "I and II", "III and IV"],
    explanation:
      "I joins two molecules into one, which reduces the number of independent particles. II closes a chain into a ring, which locks up freely rotating bonds. Both lower entropy. III makes two molecules from one, and IV opens a ring, so both raise entropy.",
  },
  {
    prompt: "What does entropy describe?",
    options: [
      "How widely energy and matter are dispersed in a system",
      "How much heat a reaction gives off",
      "How fast a reaction reaches completion",
      "How strong the bonds in a molecule are",
    ],
    explanation:
      "Entropy counts the number of ways a system's energy and particles can be arranged. More freedom of motion and more particles mean more entropy.",
  },
  {
    keepOrder: true,
    prompt: "For the same substance, how do the phases rank by entropy, from highest to lowest?",
    options: ["Gas > liquid > solid", "Solid > liquid > gas", "Liquid > gas > solid", "Liquid > solid > gas"],
    explanation:
      "Particles have the most freedom in a gas and the least in a solid, where they are locked in a lattice.",
  },
  {
    prompt: "What is the sign of ΔS when one molecule splits into two?",
    options: ["Positive", "Negative", "Zero", "It can't be predicted"],
    explanation:
      "Two independent molecules can move separately, which adds translational and rotational freedom, so entropy rises.",
  },
  {
    prompt: "What is the sign of ΔS when two molecules combine into one?",
    options: ["Negative", "Positive", "Zero", "It can't be predicted"],
    explanation:
      "Combining molecules reduces the number of independent particles, so entropy falls. Additions such as Br₂ adding to an alkene have this pattern.",
  },
  {
    prompt: "What is the sign of ΔS when an open chain closes into a ring?",
    options: ["Negative", "Positive", "Zero", "It can't be predicted"],
    explanation:
      "The particle count stays the same, but a ring has far fewer ways to rotate around its bonds, so conformational freedom falls.",
  },
  {
    prompt: "What is the sign of ΔS when a ring opens into a chain?",
    options: ["Positive", "Negative", "Zero", "It can't be predicted"],
    explanation:
      "The chain gains rotation around its C–C bonds, so it has more accessible conformations and higher entropy than the ring.",
  },
  {
    prompt: "Which reaction has the largest positive ΔS?",
    options: [
      "CaCO₃(s) → CaO(s) + CO₂(g)",
      "H₂O(g) → H₂O(l)",
      "2 H₂(g) + O₂(g) → 2 H₂O(g)",
      "N₂(g) + 3 H₂(g) → 2 NH₃(g)",
    ],
    explanation:
      "Only the CaCO₃ decomposition creates a gas from a solid, which is the biggest entropy gain. Others reduce the amount of gas or condense a gas to a liquid.",
  },
  {
    prompt: "Which change has a negative ΔS?",
    options: [
      "Water vapor condensing to liquid",
      "Ice melting to liquid water",
      "Dry ice subliming to CO₂ gas",
      "Liquid ethanol evaporating to gas",
    ],
    explanation:
      "Going from gas to liquid reduces freedom of motion. The other three go to a less ordered phase.",
  },
  {
    prompt: "What is the sign of ΔS for an elimination that gives an alkene plus HBr from one alkyl bromide?",
    visuals: [reaction("", ["CC(C)Br"], ["C=CC", "Br"])],
    options: [
      "Positive, because one molecule becomes two",
      "Negative, because a π bond is formed",
      "Zero, because the atoms are unchanged",
      "Negative, because H–Br is a very strong bond",
    ],
    explanation:
      "Particle count is the main guide. Elimination turns one molecule into two, so entropy goes up. That's why high temperature favors elimination.",
  },
  {
    prompt: "What is the sign of ΔS for a substitution such as CH₃Br + HO⁻ → CH₃OH + Br⁻?",
    options: [
      "Close to zero, because two species become two species",
      "Strongly positive, because one bond is broken",
      "Strongly negative, because one bond is formed",
      "Strongly positive, because Br⁻ is larger than HO⁻",
    ],
    explanation:
      "The particle count stays the same on both sides and no rings form or open, so entropy changes little. ΔH mostly controls substitutions.",
  },
  {
    prompt: "What is the second law of thermodynamics?",
    options: [
      "A spontaneous process increases the total entropy of the universe",
      "A spontaneous process decreases the entropy of the universe",
      "A spontaneous process increases the entropy of the system in all cases",
      "Energy can't be created or destroyed in a reaction",
    ],
    explanation:
      "The total must increase, which is ΔS(system) + ΔS(surroundings) > 0. The system's entropy can fall if the surroundings gain more. The statement about energy being conserved is the first law.",
  },
  {
    prompt: "How can water freezing be spontaneous below 0 °C if the system's entropy decreases?",
    options: [
      "The heat released raises the entropy of the surroundings by more than the system's loss",
      "Ice has more entropy than water at temperatures below 0 °C",
      "Freezing has a positive ΔH, which drives it at low temperature",
      "Entropy has no effect on processes at low temperature",
    ],
    explanation:
      "Freezing is exothermic, and the heat disperses into the surroundings. At low T that gain beats the system's loss, so the universe's entropy increases overall.",
  },
  {
    prompt: "How does an exothermic reaction affect the entropy of the surroundings?",
    options: [
      "It increases it, because heat flows into the surroundings",
      "It decreases it, because heat is drawn from the surroundings",
      "It doesn't change it, because only the system matters",
      "It always cancels the system's entropy change exactly",
    ],
    explanation:
      "ΔS(surroundings) = −ΔH(system) / T. A negative ΔH makes that quantity positive, with a larger effect at lower temperatures.",
  },
  {
    prompt: "Which has the greater entropy at the same temperature?",
    options: [
      "1 mol of pentane, because it has more atoms and conformations",
      "1 mol of methane, because it is smaller and moves faster",
      "They are equal, because each contains one mole",
      "1 mol of methane, because it has more bonds that rotate",
    ],
    explanation:
      "Larger, flexible molecules have more ways to store energy, so their entropy is greater when phases are comparable.",
  },
  {
    prompt: "Which compound has the higher entropy: pentane or cyclopentane (same phase and temperature)?",
    options: [
      "Pentane, because its open chain has more conformational freedom",
      "Cyclopentane, because its ring contains more strain",
      "Cyclopentane, because it has fewer hydrogen atoms",
      "They are equal, because they have the same number of carbon atoms",
    ],
    explanation:
      "Free rotation around pentane's C–C bonds gives many conformations. A ring restricts that motion.",
  },
  {
    prompt: "What happens to a substance's entropy as it is heated?",
    options: [
      "It increases, because particles occupy more energy levels",
      "It decreases, because particles move in more ordered paths",
      "It stays constant unless the phase changes",
      "It becomes zero once the substance boils",
    ],
    explanation:
      "Higher temperature gives particles more energy to spread across their available motions. Phase changes add sudden jumps on top of this.",
  },
  {
    prompt: "A Diels-Alder reaction joins a diene and a dienophile into one ring product. What is ΔS?",
    visuals: [reaction("", ["C=CC=C", "C=C"], ["C1=CCCCC1"])],
    options: [
      "Negative, because two molecules become one and a ring forms",
      "Positive, because a new ring forms and strain is released",
      "Positive, because a π bond becomes a σ bond",
      "Zero, because no atoms are gained or lost",
    ],
    explanation:
      "Both trends point in the same direction: fewer particles and less conformational freedom. That's why the reverse reaction becomes favorable at very high temperature.",
  },
  {
    prompt: "Which reaction's ΔS is most clearly positive?",
    visuals: [
      reaction("A", ["OC1(Cl)CCC1"], ["O=C1CCC1", "Cl"]),
      reaction("B", ["C=C", "BrBr"], ["BrCCBr"]),
      reaction("C", ["C=CCCCC"], ["C1CCCCC1"]),
      reaction("D", ["CC=O", "CO"], ["CC(O)OC"]),
    ],
    keepOrder: true,
    options: ["A", "B", "C", "D"],
    explanation:
      "A produces two molecules from one. B and D join two into one, and C closes a chain into a ring, so all three lower entropy.",
  },
  {
    prompt: "What's usually the quickest way to predict the sign of ΔS for an organic reaction?",
    options: [
      "Compare the number of molecules on each side, then check for ring opening or closing",
      "Compare the number of double bonds on each side of the arrow",
      "Compare the heat that each side gives off during the reaction",
      "Compare the size of the activation energy for each direction",
    ],
    explanation:
      "Particle count usually has the largest effect. If that stays the same, ring and chain changes usually decide the sign.",
  },
  {
    prompt: "Which process lowers the entropy of the system?",
    options: [
      "Ethylene molecules joining to form a polymer",
      "Sugar dissolving in water",
      "Perfume spreading across a room",
      "A sealed gas expanding into a vacuum",
    ],
    explanation:
      "Polymerization links many free molecules into one chain, which removes a lot of translational freedom. The others let particles spread out.",
  },
]);
