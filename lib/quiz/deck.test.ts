import { describe, expect, it } from "vitest";
import { arrange, buildDeck } from "./deck";
import { seeded } from "./rng";
import type { Question } from "./types";

const make = (id: string, family: string, handwritten = false): Question => ({
  id,
  topic: "acid",
  family,
  prompt: id,
  options: [{ text: "a" }, { text: "b" }, { text: "c" }],
  answer: 0,
  explanation: "",
  handwritten,
});

const pool = [
  ...Array.from({ length: 10 }, (_, i) => make(`w${i}`, "acid:handwritten", true)),
  ...Array.from({ length: 30 }, (_, i) => make(`a${i}`, "alpha")),
  ...Array.from({ length: 30 }, (_, i) => make(`b${i}`, "beta")),
];

describe("buildDeck", () => {
  it("never returns a question twice in a session", () => {
    const deck = buildDeck(pool, new Set(), 50, seeded(1));
    expect(deck).toHaveLength(50);
    expect(new Set(deck.map((q) => q.id)).size).toBe(50);
  });

  it("excludes questions already seen", () => {
    const seen = new Set(pool.slice(0, 60).map((q) => q.id));
    const deck = buildDeck(pool, seen, 50, seeded(2));
    expect(deck).toHaveLength(10);
    expect(deck.every((q) => !seen.has(q.id))).toBe(true);
  });

  it("works through the whole pool across sessions with no repeats", () => {
    const seen = new Set<string>();
    const rng = seeded(3);
    for (;;) {
      const deck = buildDeck(pool, seen, 7, rng);
      if (deck.length === 0) break;
      for (const q of deck) {
        expect(seen.has(q.id)).toBe(false);
        seen.add(q.id);
      }
    }
    expect(seen.size).toBe(pool.length);
  });

  it("spreads generated questions across families", () => {
    const generated = buildDeck(pool.slice(10), new Set(), 10, seeded(4));
    expect(generated.filter((q) => q.family === "alpha")).toHaveLength(5);
  });
});

describe("arrange", () => {
  it("keeps every option and leaves ordered lists alone", () => {
    const q = make("x", "alpha");
    expect([...arrange(q, seeded(5)).order].sort()).toEqual([0, 1, 2]);
    expect(arrange({ ...q, keepOrder: true }, seeded(5)).order).toEqual([0, 1, 2]);
  });
});
