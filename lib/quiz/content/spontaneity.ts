import { handwritten } from "../author";

export const spontaneity = handwritten("spontaneity", [
  {
    exam: true,
    prompt: "Is ice melting spontaneous at room temperature?",
    options: [
      "Yes, because TΔS is larger than ΔH at room temperature",
      "No, because melting absorbs heat from the surroundings",
      "No, because the entropy of the water decreases",
      "Yes, because melting releases heat to the surroundings",
    ],
    explanation:
      "Ice melts on its own at room temperature. Melting is endothermic (ΔH > 0), but entropy increases and TΔS is larger than ΔH at 25 °C, so ΔG < 0.",
  },
  {
    exam: true,
    prompt: "When ice melts, does entropy increase or decrease?",
    options: [
      "Increase, because liquid water molecules move more freely than those in a solid lattice",
      "Decrease, because liquid water is denser than ice",
      "Decrease, because melting absorbs heat from the surroundings",
      "Increase, because the water molecules split into H⁺ and HO⁻ ions",
    ],
    explanation:
      "Molecules in liquid water are free to move past one another, while ice holds them in a lattice. Note that density isn't the deciding factor here.",
  },
  {
    exam: true,
    prompt: "Is ice melting spontaneous at all temperatures?",
    options: [
      "No, only above 0 °C, because TΔS must exceed the positive ΔH",
      "Yes, because ΔS is always positive for melting",
      "Yes, because ΔH is always negative for melting",
      "No, only below 0 °C, because low temperature favors the entropy term",
    ],
    explanation:
      "With ΔH > 0 and ΔS > 0, ΔG = ΔH − TΔS is negative only at high enough T. Below 0 °C, ΔG is positive and ice doesn't melt. At exactly 0 °C, ΔG = 0 and the two phases are at equilibrium.",
  },
  {
    prompt: "What is the Gibbs free energy equation?",
    options: ["ΔG = ΔH − TΔS", "ΔG = ΔS − TΔH", "ΔG = ΔH + TΔS", "ΔG = TΔH − ΔS"],
    explanation:
      "This combines the enthalpy and entropy contributions. T must be in kelvin, and ΔS and ΔH need matching energy units.",
  },
  {
    prompt: "What sign of ΔG means a process is spontaneous?",
    options: ["Negative", "Positive", "Zero", "Any sign, provided ΔS is positive"],
    explanation: "ΔG < 0 is spontaneous, ΔG > 0 is nonspontaneous, and ΔG = 0 is at equilibrium.",
  },
  {
    prompt: "What does ΔG = 0 mean?",
    options: [
      "The system is at equilibrium",
      "The reaction can't occur in either direction",
      "The reaction is fast and complete",
      "ΔH and ΔS must both be zero",
    ],
    explanation:
      "The forward and reverse tendencies balance, so there's no net change. Molecules still react in both directions at equal rates.",
  },
  {
    prompt: "When is a reaction with ΔH < 0 and ΔS > 0 spontaneous?",
    options: ["At all temperatures", "At no temperature", "Only at high temperature", "Only at low temperature"],
    explanation:
      "Both terms in ΔH − TΔS push ΔG negative, regardless of T.",
  },
  {
    prompt: "When is a reaction with ΔH > 0 and ΔS < 0 spontaneous?",
    options: ["At no temperature", "At all temperatures", "Only at high temperature", "Only at low temperature"],
    explanation:
      "Both terms make ΔG positive at any T, so this reaction is never spontaneous as written. The reverse reaction is always spontaneous.",
  },
  {
    prompt: "When is a reaction with ΔH > 0 and ΔS > 0 spontaneous?",
    options: ["Only at high temperature", "Only at low temperature", "At all temperatures", "At no temperature"],
    explanation:
      "A large T is needed for the favorable −TΔS term to outweigh the positive ΔH. Melting and boiling work this way.",
  },
  {
    prompt: "When is a reaction with ΔH < 0 and ΔS < 0 spontaneous?",
    options: ["Only at low temperature", "Only at high temperature", "At all temperatures", "At no temperature"],
    explanation:
      "The favorable ΔH wins as long as the unfavorable −TΔS term stays small, which happens at low T. Freezing works this way.",
  },
  {
    prompt: "Raising the temperature increases the weight of which term in ΔG = ΔH − TΔS?",
    options: ["TΔS", "ΔH", "Both terms equally", "Neither term"],
    explanation:
      "T multiplies only the entropy term. As temperature rises, entropy matters more and ΔH matters relatively less.",
  },
  {
    prompt: "Why does water freeze spontaneously below 0 °C?",
    options: [
      "ΔH is negative and outweighs the unfavorable −TΔS term at low temperature",
      "ΔS is positive for freezing, so ΔG is always negative",
      "ΔH is positive for freezing, so heat flows into the water",
      "ΔG is zero at every temperature below 0 °C",
    ],
    explanation:
      "Freezing has ΔH < 0 and ΔS < 0. At low enough T, the −TΔS penalty shrinks below the magnitude of ΔH, so ΔG is negative.",
  },
  {
    prompt: "What is true at 0 °C and 1 atm for ice and liquid water?",
    options: [
      "ΔG = 0 for melting, and both phases coexist",
      "ΔG < 0 for melting, and only liquid water exists",
      "ΔG > 0 for melting, and only ice exists",
      "ΔH = 0 for melting, and no heat is needed",
    ],
    explanation:
      "The normal melting point is where the two phases are at equilibrium. ΔH and TΔS are equal there, though neither is zero.",
  },
  {
    prompt: "At a phase change temperature, what is the relationship between ΔH and ΔS?",
    options: ["T = ΔH / ΔS", "T = ΔS / ΔH", "T = ΔH × ΔS", "T = ΔH − ΔS"],
    explanation: "At equilibrium ΔG = 0, so ΔH = TΔS. Rearranging gives T = ΔH / ΔS, with T in kelvin.",
  },
  {
    prompt: "Ammonium nitrate dissolves in water on its own, and the solution gets cold. What does this tell you?",
    options: [
      "The process is entropy-driven: ΔH > 0 but TΔS is larger",
      "The process is enthalpy-driven: ΔH < 0 and ΔS < 0",
      "ΔG must be positive because the solution gets cold",
      "ΔS must be negative because the ions are surrounded by water",
    ],
    explanation:
      "Cooling means ΔH > 0. Since it still happens spontaneously, ΔG is negative, so the entropy gain must be large enough to overcome ΔH.",
  },
  {
    prompt: "Is a spontaneous reaction necessarily fast?",
    options: [
      "No, spontaneity depends on ΔG and speed depends on activation energy",
      "Yes, because a negative ΔG always lowers the activation energy",
      "Yes, because spontaneous reactions happen without any barrier",
      "No, because spontaneous reactions are always slow",
    ],
    explanation:
      "Spontaneous only means thermodynamically favorable. Wood in air is spontaneous for combustion, but it doesn't burn until the barrier is crossed.",
  },
  {
    prompt: "How are ΔG° and Keq related?",
    options: ["ΔG° = −RT ln Keq", "ΔG° = RT ln Keq", "ΔG° = −RT / Keq", "ΔG° = Keq / RT"],
    explanation:
      "When Keq > 1, ln Keq is positive and ΔG° is negative, which favors products. If Keq < 1, ΔG° is positive.",
  },
  {
    prompt: "A reaction has Keq = 1. What is ΔG°?",
    options: ["0", "Positive", "Negative", "Equal to ΔH°"],
    explanation: "ln(1) = 0, so ΔG° = −RT ln(1) = 0. Neither reactants nor products are favored at standard conditions.",
  },
  {
    prompt: "A reaction has a very large Keq. What does that tell you about ΔG°?",
    options: [
      "It is large and negative",
      "It is large and positive",
      "It is close to zero",
      "It can't be related to Keq",
    ],
    explanation: "ΔG° = −RT ln Keq, so a very large Keq gives a large negative ΔG°.",
  },
  {
    prompt: "How does exothermic differ from exergonic?",
    options: [
      "Exothermic means ΔH < 0, and exergonic means ΔG < 0",
      "Exothermic means ΔG < 0, and exergonic means ΔH < 0",
      "Exothermic means ΔS > 0, and exergonic means ΔH > 0",
      "They are two names for exactly the same quantity",
    ],
    explanation:
      "Exothermic refers to heat alone. Exergonic includes entropy, so it's the term that determines spontaneity.",
  },
  {
    prompt: "A reaction is exothermic. Must it be spontaneous?",
    options: [
      "No, a large decrease in entropy can make ΔG positive at high enough temperature",
      "Yes, because releasing heat always makes ΔG negative",
      "Yes, because exothermic reactions always increase entropy",
      "No, because exothermic reactions always have a positive ΔG",
    ],
    explanation:
      "If ΔH < 0 and ΔS < 0, the −TΔS term is positive and can exceed |ΔH| at high T.",
  },
  {
    prompt: "Why do additions to alkenes tend to become less favorable at higher temperature?",
    options: [
      "ΔS is negative, so −TΔS is positive and grows as T rises",
      "ΔH is positive, so −TΔS shrinks as T rises",
      "π bonds become stronger as the temperature increases",
      "The products have more molecules than the reactants",
    ],
    explanation:
      "Additions combine two molecules into one, so ΔS < 0. They are enthalpy-driven and work best at lower temperature. Elimination, the reverse, wins at high T.",
  },
  {
    prompt: "Steam at 120 °C and 1 atm begins to condense to water. Is this spontaneous, and why?",
    options: [
      "No, because above 100 °C the −TΔS term outweighs the favorable ΔH",
      "Yes, because condensation releases heat and has ΔH < 0",
      "Yes, because ΔS is positive for condensation",
      "No, because condensation has a positive ΔH",
    ],
    explanation:
      "Condensation has ΔH < 0 and ΔS < 0, so it is spontaneous only below the boiling point. At 120 °C, water stays as steam at 1 atm.",
  },
  {
    prompt: "In ΔG = ΔH − TΔS, which unit must T be in?",
    options: ["Kelvin", "Degrees Celsius", "Degrees Fahrenheit", "Any temperature unit"],
    explanation: "Kelvin is an absolute scale. Add 273 to a Celsius temperature before using this equation.",
  },
  {
    prompt: "ΔH is often given in kJ/mol and ΔS in J/(mol·K). What should you do before combining them?",
    options: [
      "Divide ΔS by 1000 so that both are in kJ",
      "Multiply ΔS by 1000 so that both are in kJ",
      "Divide ΔH by 273 so that both are in kelvin",
      "Nothing, because the units already cancel",
    ],
    explanation:
      "Mismatched units are a very common error. 120 J/(mol·K) is 0.120 kJ/(mol·K).",
  },
]);
