import { handwritten } from "../author";
import type { Option, Visual } from "../types";

const energy = (points: number[], label?: string, scale = false): Visual => ({
  kind: "energy",
  profile: { points, scale },
  label,
});

const energyOption = (points: number[], text: string, straight = false): Option => ({
  text,
  visual: { kind: "energy", profile: { points, straight } },
});

export const energyDiagrams = handwritten("energy", [
  {
    exam: true,
    keepOrder: true,
    prompt: "Which is true about the following energy diagram?",
    visuals: [energy([5, 11, 8, 15, 10], undefined, true)],
    options: [
      "The diagram depicts a nonspontaneous reaction because the free energy of the products is greater than that of the reactants",
      "The diagram depicts a spontaneous reaction because the free energy of the products is greater than that of the reactants",
      "The diagram depicts a nonspontaneous reaction because there are two transition states",
      "The diagram depicts a spontaneous reaction because it only has a 5 kJ activation energy",
    ],
    explanation:
      "Spontaneity depends only on ΔG, the difference between products and reactants. The products (10 kJ/mol) are above the reactants (5 kJ/mol), so ΔG is positive and the reaction is nonspontaneous. The number of transition states and the size of the barrier describe the rate, not spontaneity.",
  },
  {
    exam: true,
    keepOrder: true,
    prompt: "Which of the following is an energy diagram with 1 transition state?",
    options: [
      energyOption([8, 13, 5], "A"),
      energyOption([8, 13, 11, 15, 3], "B"),
      energyOption([8, 16, 10, 15, 8, 12, 4], "C"),
      energyOption([3, 15], "D", true),
    ],
    explanation:
      "Each peak is a transition state. A has one peak, B has two, and C has three. D is a straight line with no peak, so it doesn't show a transition state at all.",
  },
  {
    prompt: "What does a peak on a reaction energy diagram represent?",
    options: ["A transition state", "An intermediate", "A product", "A catalyst"],
    explanation:
      "Peaks are energy maxima, where bonds are partly broken and partly formed. Valleys between peaks are intermediates.",
  },
  {
    prompt: "What does a valley between two peaks represent?",
    options: ["An intermediate", "A transition state", "The activation energy", "The overall ΔG"],
    explanation:
      "A valley is a local energy minimum: a real species with a finite lifetime, formed in one step and consumed in the next.",
  },
  {
    prompt: "How do you tell the number of steps in a reaction from its energy diagram?",
    options: [
      "Count the transition states",
      "Count the intermediates",
      "Count the reactant molecules",
      "Measure the overall ΔG",
    ],
    explanation:
      "Each elementary step passes through one transition state. Steps equal peaks, and intermediates equal peaks minus one.",
  },
  {
    prompt: "A reaction has 4 transition states. How many intermediates does it have?",
    options: ["3", "4", "5", "2"],
    explanation: "A valley lies between each pair of neighboring peaks, so 4 peaks give 3 intermediates.",
  },
  {
    prompt: "Which statement best distinguishes a transition state from an intermediate?",
    options: [
      "A transition state is an energy maximum that can't be isolated, and an intermediate is a local minimum",
      "A transition state is a local minimum, and an intermediate is an energy maximum",
      "A transition state is stable and easily isolated, and an intermediate never exists",
      "They are two different names for the same species on a diagram",
    ],
    explanation:
      "A transition state exists only fleetingly at the top of a barrier and has partial bonds. An intermediate has full bonds and a short but real lifetime, sitting in an energy well.",
  },
  {
    prompt: "What is the activation energy of a step?",
    options: [
      "The energy difference between the starting point of that step and its transition state",
      "The energy difference between the reactants and the products",
      "The total of all energy peaks on the diagram",
      "The energy difference between two transition states",
    ],
    explanation: "Ea (or ΔG‡) is the climb from the species that starts the step up to the top of its barrier.",
  },
  {
    prompt: "What does activation energy control?",
    options: [
      "How fast the reaction occurs",
      "Whether the reaction is spontaneous",
      "How much product exists at equilibrium",
      "The value of ΔH",
    ],
    explanation:
      "A lower barrier gives a faster reaction. Equilibrium position and spontaneity depend on ΔG between reactants and products.",
  },
  {
    prompt: "What does the overall ΔG of a reaction control?",
    options: [
      "Where the equilibrium lies",
      "How fast the reaction reaches equilibrium",
      "How many transition states there are",
      "How long the intermediates live",
    ],
    explanation:
      "ΔG is a thermodynamic quantity tied to Keq. It says nothing about the path or the rate.",
  },
  {
    prompt: "What does a catalyst do to the energy diagram of a reaction?",
    options: [
      "Lowers the activation energy and leaves ΔG unchanged",
      "Lowers both the activation energy and ΔG",
      "Raises the energy of the products and lowers ΔG",
      "Changes ΔG and leaves the activation energy unchanged",
    ],
    explanation:
      "A catalyst offers a lower-energy pathway. Reactants and products are unchanged, so ΔG and Keq stay the same. Equilibrium is simply reached faster.",
  },
  {
    prompt: "Which step of a multistep reaction is rate-determining?",
    options: [
      "The step that passes through the highest-energy transition state",
      "The step that forms the most stable intermediate",
      "Always the first step of the mechanism",
      "Always the last step of the mechanism",
    ],
    explanation:
      "The slowest step, with the highest barrier to climb, limits the rate. It can be any step in the mechanism, and is usually identified from the highest peak.",
  },
  {
    prompt: "A reaction has a large negative ΔG but a very large activation energy. What should you expect?",
    options: [
      "Products are strongly favored, but the reaction is slow",
      "Reactants are strongly favored, and the reaction is fast",
      "Products are strongly favored, and the reaction is fast",
      "Reactants are strongly favored, and the reaction is slow",
    ],
    explanation:
      "Thermodynamics and kinetics are separate. Diamond turning to graphite is a classic example: spontaneous, but so slow you'll never see it.",
  },
  {
    prompt: "What word describes a reaction whose products are lower in free energy than its reactants?",
    options: ["Exergonic", "Endergonic", "Endothermic", "Isothermal"],
    explanation:
      "Exergonic means ΔG < 0, and endergonic means ΔG > 0. Exothermic and endothermic refer to ΔH instead.",
  },
  {
    prompt: "How does raising the temperature usually affect the rate of a reaction, and why?",
    options: [
      "It increases the rate, because more molecules have enough energy to cross the barrier",
      "It increases the rate, because the activation energy becomes much smaller",
      "It decreases the rate, because molecules collide with less energy",
      "It doesn't affect the rate, because the activation energy doesn't change",
    ],
    explanation:
      "The barrier stays about the same, but a larger fraction of molecules reach it at higher temperature.",
  },
  {
    prompt: "A step has Ea(forward) = 40 kJ/mol and ΔG = −15 kJ/mol. What is Ea(reverse)?",
    options: ["55 kJ/mol", "25 kJ/mol", "40 kJ/mol", "15 kJ/mol"],
    explanation:
      "Ea(reverse) = Ea(forward) − ΔG = 40 − (−15) = 55 kJ/mol. The products lie 15 kJ/mol below the reactants, so the climb back is longer.",
  },
  {
    prompt: "A step has Ea(forward) = 60 kJ/mol and ΔG = +20 kJ/mol. What is Ea(reverse)?",
    options: ["40 kJ/mol", "80 kJ/mol", "60 kJ/mol", "20 kJ/mol"],
    explanation:
      "Ea(reverse) = 60 − 20 = 40 kJ/mol. The products already sit 20 kJ/mol up the hill, so the climb back to the peak is shorter.",
  },
  {
    prompt: "According to the Hammond postulate, what does the transition state of a strongly exergonic step resemble?",
    options: ["The reactants", "The products", "The next intermediate", "A catalyst"],
    explanation:
      "A transition state resembles the species closest to it in energy. In an exergonic step that is the starting material, so this is called an early transition state.",
  },
  {
    prompt: "According to the Hammond postulate, what does the transition state of a strongly endergonic step resemble?",
    options: ["The products", "The reactants", "The solvent", "A catalyst"],
    explanation:
      "In an endergonic step, the transition state is closer in energy to the products, so it looks more like them. This is called a late transition state.",
  },
  {
    prompt: "Which diagram shows a one-step exergonic reaction?",
    keepOrder: true,
    answer: 1,
    options: [
      energyOption([4, 17, 12], "A"),
      energyOption([12, 17, 4], "B"),
      energyOption([12, 17, 8, 16, 4], "C"),
      energyOption([4, 13, 8, 16, 12], "D"),
    ],
    explanation:
      "One step means one peak, which leaves A and B. Exergonic means the products end lower than the reactants, which is true for B.",
  },
  {
    prompt: "Which diagram shows a two-step endergonic reaction?",
    keepOrder: true,
    answer: 2,
    options: [
      energyOption([12, 17, 8, 16, 4], "A"),
      energyOption([4, 17, 12], "B"),
      energyOption([4, 13, 8, 16, 12], "C"),
      energyOption([12, 17, 4], "D"),
    ],
    explanation:
      "Two steps means two peaks, which leaves A and C. Endergonic means the products end higher than the reactants, which is true for C.",
  },
  {
    prompt: "Which of these is shown by a transition state symbol (‡)?",
    options: [
      "A structure with partially formed and partially broken bonds",
      "A stable molecule that can be stored in a bottle",
      "An electron pair moving between two atoms",
      "A mixture of the reactants and products at equilibrium",
    ],
    explanation:
      "The double dagger marks a transition state. Bonds being broken or formed are often drawn as dashed lines, since they are only partly there.",
  },
  {
    prompt: "What does the horizontal axis of a reaction energy diagram represent?",
    options: [
      "Progress along the reaction, from reactants to products",
      "Elapsed time in seconds",
      "Temperature of the reaction mixture",
      "Concentration of the products",
    ],
    explanation:
      "The reaction coordinate tracks bond changes along the pathway. It isn't a time axis.",
  },
  {
    prompt: "Two pathways lead from one reactant to products X and Y. X has the lower barrier and Y is more stable. What does a short reaction at low temperature favor?",
    options: [
      "X, the kinetic product",
      "Y, the thermodynamic product",
      "Equal amounts of X and Y",
      "Neither product, because no reaction can occur",
    ],
    explanation:
      "Under irreversible conditions, the faster pathway wins. At higher temperature, or over longer times, the system can equilibrate to favor Y.",
  },
  {
    prompt: "A reaction is exergonic. Which statement must be true?",
    options: [
      "Its products are lower in free energy than its reactants",
      "It has a small activation energy",
      "It occurs quickly at room temperature",
      "It occurs in a single step",
    ],
    explanation:
      "Exergonic only says ΔG < 0. It doesn't say anything about the barrier, the rate, or the number of steps.",
  },
]);
