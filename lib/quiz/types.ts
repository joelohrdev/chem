export type TopicId =
  | "acid"
  | "conjugate"
  | "equilibrium"
  | "energy"
  | "enthalpy"
  | "entropy"
  | "spontaneity"
  | "arrows";

export type Topic = {
  id: TopicId;
  /** Two-letter "element symbol" shown on the topic tile. */
  symbol: string;
  name: string;
  blurb: string;
};

export const TOPICS: Topic[] = [
  { id: "acid", symbol: "As", name: "Acid strength", blurb: "Size, electronegativity, resonance, induction, orbitals" },
  { id: "conjugate", symbol: "Cj", name: "Conjugate pairs", blurb: "Spot the acid and base, draw the conjugates" },
  { id: "equilibrium", symbol: "Eq", name: "Acid-base equilibrium", blurb: "Compare pKa values and pick the favored side" },
  { id: "energy", symbol: "Ed", name: "Energy diagrams", blurb: "Transition states, intermediates, activation energy" },
  { id: "enthalpy", symbol: "Bd", name: "Bonds and enthalpy", blurb: "Breaking and forming bonds, ΔH from bond energies" },
  { id: "entropy", symbol: "En", name: "Entropy", blurb: "Predict the sign of ΔS from a reaction" },
  { id: "spontaneity", symbol: "Gb", name: "Spontaneity", blurb: "ΔG = ΔH − TΔS, temperature, melting ice" },
  { id: "arrows", symbol: "Ca", name: "Curved arrows", blurb: "Push electrons, read arrows, spot the broken ones" },
];

/** A stationary point on an energy curve, in kJ/mol. */
export type EnergyProfile = {
  /** Alternating minimum, maximum, minimum, ... Starts and ends on a minimum. */
  points: number[];
  /** Optional letter drawn beside each stationary point. */
  labels?: string[];
  /** Draw a numeric free-energy axis. */
  scale?: boolean;
  /** Draws a straight line instead of a curve (a deliberately wrong option). */
  straight?: boolean;
};

export type Point = [number, number];

export type ArrowScene = {
  width: number;
  height: number;
  atoms: {
    x: number;
    y: number;
    text: string;
    anchor?: "start" | "middle" | "end";
    /** Lone-pair dots beside the label: t, b, l, r. */
    lonePairs?: string;
  }[];
  bonds: { from: Point; to: Point; order?: 1 | 2 }[];
  arrows: { from: Point; to: Point; bend: number }[];
};

export type Species = { smiles: string } | { text: string };

export type Visual =
  | { kind: "molecule"; smiles: string; label?: string }
  | { kind: "energy"; profile: EnergyProfile; label?: string }
  | { kind: "scene"; scene: ArrowScene }
  | {
      kind: "reaction";
      left: Species[];
      right: Species[];
      arrow: "forward" | "equilibrium";
      label?: string;
    };

export type Option = { text: string; visual?: Visual };

export type Question = {
  id: string;
  topic: TopicId;
  /** Groups near-identical question shapes so a session spreads across them. */
  family: string;
  prompt: string;
  visuals?: Visual[];
  options: Option[];
  /** Index into options of the right answer. */
  answer: number;
  explanation: string;
  /** Options have a meaningful order, so they are not shuffled for display. */
  keepOrder?: boolean;
  /** Taken from the CHM 2410 practice exam. */
  fromExam?: boolean;
  /** Written individually rather than produced by a generator. */
  handwritten?: boolean;
};
