import { shuffle, type Rng } from "./rng";
import type { Question } from "./types";

/** Share of a session that comes from individually written questions while any remain. */
const HANDWRITTEN_SHARE = 0.55;

/**
 * Picks the questions for a session. Questions in `seen` are excluded, so nothing repeats
 * until the pool runs out. Generated questions rotate through their families, which keeps a
 * short session from being ten variations on one shape.
 */
export function buildDeck(
  pool: readonly Question[],
  seen: ReadonlySet<string>,
  size: number,
  rng: Rng,
): Question[] {
  const fresh = pool.filter((q) => !seen.has(q.id));
  const written = shuffle(
    fresh.filter((q) => q.handwritten),
    rng,
  );

  const byFamily = new Map<string, Question[]>();
  for (const q of shuffle(
    fresh.filter((q) => !q.handwritten),
    rng,
  )) {
    const list = byFamily.get(q.family);
    if (list) list.push(q);
    else byFamily.set(q.family, [q]);
  }
  let families = shuffle([...byFamily.keys()], rng);
  let cursor = 0;

  const takeGenerated = (): Question | undefined => {
    if (families.length === 0) return undefined;
    cursor %= families.length;
    const family = families[cursor];
    const list = byFamily.get(family)!;
    const q = list.pop()!;
    if (list.length === 0) families = families.filter((f) => f !== family);
    else cursor++;
    return q;
  };

  const deck: Question[] = [];
  while (deck.length < size) {
    const preferWritten = rng() < HANDWRITTEN_SHARE;
    const next = preferWritten
      ? (written.pop() ?? takeGenerated())
      : (takeGenerated() ?? written.pop());
    if (!next) break;
    deck.push(next);
  }
  return deck;
}

export type DisplayQuestion = Question & {
  /** Original option positions in display order, for reading the choice back. */
  order: number[];
};

/** Shuffles the options for display, except where their order means something. */
export function arrange(question: Question, rng: Rng): DisplayQuestion {
  const indexes = question.options.map((_, i) => i);
  return { ...question, order: question.keepOrder ? indexes : shuffle(indexes, rng) };
}
