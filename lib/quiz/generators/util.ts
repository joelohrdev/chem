import { toOption } from "../author";
import { seeded, shuffle, type Rng } from "../rng";
import type { Option, Question, TopicId, Visual } from "../types";

const SUPER: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻", ".": "·",
};

/** 10 raised to a power, written with Unicode superscripts: 10⁴·⁴ */
export const pow10 = (n: number) =>
  "10" + (Math.round(n * 10) / 10).toString().split("").map((c) => SUPER[c]).join("");

/** Trims trailing noise from a computed value: 12.300000001 becomes 12.3 */
export const fmt = (n: number, digits = 1) => {
  const v = Number(n.toFixed(digits));
  return (v === 0 ? 0 : v).toString().replace("-", "−");
};

export const signed = (n: number, digits = 1) => (n > 0 ? "+" : "") + fmt(n, digits);

export type GenSpec = {
  key: string;
  prompt: string;
  /** First option is correct unless `answer` is set. */
  options: (string | Option)[];
  explanation: string;
  visuals?: Visual[];
  answer?: number;
  keepOrder?: boolean;
};

export function make(topic: TopicId, family: string, spec: GenSpec): Question {
  return {
    id: `${family}:${spec.key}`,
    topic,
    family,
    prompt: spec.prompt,
    visuals: spec.visuals,
    options: spec.options.map(toOption),
    answer: spec.answer ?? 0,
    explanation: spec.explanation,
    keepOrder: spec.keepOrder,
  };
}

/** Seeds from a family name, so adding one family doesn't change another's questions. */
export const rngFor = (family: string): Rng => {
  let h = 2166136261;
  for (const c of family) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return seeded(h >>> 0);
};

export function combinations<T>(items: readonly T[], size: number): T[][] {
  if (size === 0) return [[]];
  return items.flatMap((item, i) =>
    combinations(items.slice(i + 1), size - 1).map((rest) => [item, ...rest]),
  );
}

export function permutations<T>(items: readonly T[]): T[][] {
  if (items.length <= 1) return [[...items]];
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]),
  );
}

/** Takes up to `count` items in shuffled order, using a seed unique to the family. */
export const capped = <T,>(items: readonly T[], count: number, family: string): T[] =>
  shuffle(items, rngFor(family + ":cap")).slice(0, count);
