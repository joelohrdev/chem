import type { ArrowScene, Point } from "./types";

/**
 * Builders for curved-arrow drawings. Each one takes the same chemistry and a `variant`,
 * so a question can show the correct arrows next to believable wrong ones.
 */

export type ProtonVariant = "correct" | "reversed" | "missing" | "attackA";

export function protonTransfer(base: string, acidAtom: string, variant: ProtonVariant): ArrowScene {
  const lp: Point = [90, 66];
  const h: Point = [172, 62];
  const bondMid: Point = [205, 70];
  const a: Point = [242, 60];
  const arrows: ArrowScene["arrows"] = ({
    correct: [
      { from: lp, to: h, bend: -34 },
      { from: bondMid, to: a, bend: -18 },
    ],
    reversed: [
      { from: h, to: lp, bend: 34 },
      { from: a, to: bondMid, bend: 18 },
    ],
    missing: [{ from: lp, to: h, bend: -34 }],
    attackA: [
      { from: lp, to: a, bend: -40 },
      { from: bondMid, to: h, bend: -14 },
    ],
  } as Record<string, ArrowScene["arrows"]>)[variant];
  return {
    width: 310,
    height: 112,
    atoms: [
      { x: 74, y: 80, text: base, anchor: "end", lonePairs: "r" },
      { x: 172, y: 80, text: "H" },
      { x: 232, y: 80, text: acidAtom, anchor: "start" },
    ],
    bonds: [{ from: [182, 75], to: [228, 75] }],
    arrows,
  };
}

export type CarbonylVariant = "correct" | "noPi" | "piReversed" | "attackO" | "reversed";

export function carbonylAddition(
  nucleophile: string,
  r1: string,
  r2: string,
  variant: CarbonylVariant,
): ArrowScene {
  const lp: Point = [84, 96];
  const c: Point = [165, 88];
  const piMid: Point = [168, 62];
  const o: Point = [180, 30];
  const oLp: Point = [181, 28];
  const arrows: ArrowScene["arrows"] = ({
    correct: [
      { from: lp, to: c, bend: 26 },
      { from: piMid, to: o, bend: 18 },
    ],
    noPi: [{ from: lp, to: c, bend: 26 }],
    piReversed: [
      { from: lp, to: c, bend: 26 },
      { from: oLp, to: piMid, bend: -18 },
    ],
    attackO: [
      { from: lp, to: [152, 28] as Point, bend: -34 },
      { from: piMid, to: c, bend: -14 },
    ],
    reversed: [
      { from: c, to: lp, bend: -26 },
      { from: o, to: piMid, bend: -18 },
    ],
  } as Record<string, ArrowScene["arrows"]>)[variant];
  return {
    width: 270,
    height: 142,
    atoms: [
      { x: 68, y: 100, text: nucleophile, anchor: "end", lonePairs: "r" },
      { x: 165, y: 28, text: "O", lonePairs: "lr" },
      { x: 113, y: 128, text: r1, anchor: "end" },
      { x: 217, y: 128, text: r2, anchor: "start" },
    ],
    bonds: [
      { from: [165, 88], to: [165, 34], order: 2 },
      { from: [165, 88], to: [120, 118] },
      { from: [165, 88], to: [210, 118] },
    ],
    arrows,
  };
}

export type Sn2Variant = "correct" | "reversed" | "missing" | "attackX";

export function substitution(
  nucleophile: string,
  carbonGroup: string,
  leaving: string,
  variant: Sn2Variant,
): ArrowScene {
  const lp: Point = [90, 68];
  // Aim at the carbon that holds the leaving group, which is the group's last carbon as written.
  const c: Point = carbonGroup === "H₃C" ? [185, 62] : [173, 62];
  const mid: Point = [206, 70];
  const x: Point = [242, 60];
  const arrows: ArrowScene["arrows"] = ({
    correct: [
      { from: lp, to: c, bend: -28 },
      { from: mid, to: x, bend: -18 },
    ],
    reversed: [
      { from: c, to: lp, bend: 28 },
      { from: x, to: mid, bend: 18 },
    ],
    missing: [{ from: lp, to: c, bend: -28 }],
    attackX: [
      { from: lp, to: x, bend: -40 },
      { from: mid, to: c, bend: -14 },
    ],
  } as Record<string, ArrowScene["arrows"]>)[variant];
  return {
    width: 310,
    height: 112,
    atoms: [
      { x: 74, y: 80, text: nucleophile, anchor: "end", lonePairs: "r" },
      { x: 192, y: 80, text: carbonGroup, anchor: "end" },
      { x: 232, y: 80, text: leaving, anchor: "start" },
    ],
    bonds: [{ from: [196, 75], to: [228, 75] }],
    arrows,
  };
}

export type CationVariant = "correct" | "reversed" | "wrongEnd";

export function cationCapture(
  nucleophile: string,
  cation: string,
  variant: CationVariant,
): ArrowScene {
  const lp: Point = [100, 66];
  const c: Point = [176, 62];
  const arrows: ArrowScene["arrows"] = ({
    correct: [{ from: lp, to: c, bend: -28 }],
    reversed: [{ from: c, to: lp, bend: 28 }],
    wrongEnd: [{ from: [60, 62] as Point, to: c, bend: -38 }],
  } as Record<string, ArrowScene["arrows"]>)[variant];
  return {
    width: 270,
    height: 104,
    atoms: [
      { x: 84, y: 80, text: nucleophile, anchor: "end", lonePairs: "r" },
      { x: 164, y: 80, text: cation, anchor: "start" },
    ],
    bonds: [],
    arrows,
  };
}

export type AlkeneVariant = "correct" | "fromH" | "missing";

export function alkeneProtonation(acidAtom: string, variant: AlkeneVariant): ArrowScene {
  const pi: Point = [80, 70];
  const h: Point = [160, 62];
  const mid: Point = [194, 70];
  const a: Point = [230, 60];
  const arrows: ArrowScene["arrows"] = ({
    correct: [
      { from: pi, to: h, bend: -32 },
      { from: mid, to: a, bend: -18 },
    ],
    fromH: [
      { from: h, to: pi, bend: 32 },
      { from: a, to: mid, bend: 18 },
    ],
    missing: [{ from: pi, to: h, bend: -32 }],
  } as Record<string, ArrowScene["arrows"]>)[variant];
  return {
    width: 290,
    height: 112,
    atoms: [
      { x: 48, y: 80, text: "H₂C", anchor: "end" },
      { x: 112, y: 80, text: "CH₂", anchor: "start" },
      { x: 160, y: 80, text: "H" },
      { x: 220, y: 80, text: acidAtom, anchor: "start" },
    ],
    bonds: [
      { from: [52, 75], to: [108, 75], order: 2 },
      { from: [170, 75], to: [216, 75] },
    ],
    arrows,
  };
}

/** The exam's drawing: hydroxide removes an alpha proton from acetone. */
export function acetoneDeprotonation(): ArrowScene {
  return {
    width: 300,
    height: 150,
    atoms: [
      { x: 48, y: 100, text: "HO⁻", anchor: "end", lonePairs: "r" },
      { x: 110, y: 100, text: "H" },
      { x: 160, y: 124, text: "CH₂" },
      { x: 220, y: 26, text: "O" },
      { x: 268, y: 124, text: "CH₃" },
    ],
    bonds: [
      { from: [119, 101], to: [144, 112] },
      { from: [176, 112], to: [220, 88] },
      { from: [220, 88], to: [220, 34], order: 2 },
      { from: [220, 88], to: [254, 110] },
    ],
    arrows: [
      { from: [60, 88], to: [106, 84], bend: -16 },
      { from: [131, 106], to: [197, 98], bend: -30 },
      { from: [225, 62], to: [231, 22], bend: 14 },
    ],
  };
}

/** The exam's flawed drawing: cyanide adds to 2-pentanone, with the pi-bond arrow pointing the wrong way. */
export function examFlawedCyanide(): ArrowScene {
  return carbonylAddition("N≡C⁻", "CH₃CH₂CH₂", "CH₃", "piReversed");
}
