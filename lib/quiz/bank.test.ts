import { describe, expect, it } from "vitest";
import { Molecule } from "openchemlib";
import { QUESTIONS } from "./bank";
import { DRAWN } from "./generators/conjugate";
import type { Species, Visual } from "./types";

function smilesIn(visual: Visual): string[] {
  if (visual.kind === "molecule") return [visual.smiles];
  if (visual.kind === "reaction") {
    return [...visual.left, ...visual.right].flatMap((s: Species) => ("smiles" in s ? [s.smiles] : []));
  }
  return [];
}

const formula = (smiles: string) => {
  const parts: Record<string, number> = {};
  const text = Molecule.fromSmiles(smiles).getMolecularFormula().formula;
  for (const [, el, n] of text.matchAll(/([A-Z][a-z]?)(\d*)/g)) parts[el] = Number(n || 1);
  return parts;
};
const charge = (smiles: string) => {
  const m = Molecule.fromSmiles(smiles);
  let total = 0;
  for (let i = 0; i < m.getAllAtoms(); i++) total += m.getAtomCharge(i);
  return total;
};

describe("question bank", () => {
  it("is large", () => {
    expect(QUESTIONS.length).toBeGreaterThan(2000);
  });

  it("has unique ids", () => {
    const counts = new Map<string, number>();
    for (const q of QUESTIONS) counts.set(q.id, (counts.get(q.id) ?? 0) + 1);
    expect([...counts].filter(([, n]) => n > 1)).toEqual([]);
  });

  it("has no two identical questions", () => {
    const counts = new Map<string, string[]>();
    for (const q of QUESTIONS) {
      const options = q.options.map((o) => o.text + JSON.stringify(o.visual ?? null)).sort();
      const key = q.prompt + JSON.stringify(q.visuals ?? null) + options.join("|");
      counts.set(key, [...(counts.get(key) ?? []), q.id]);
    }
    expect([...counts.values()].filter((ids) => ids.length > 1)).toEqual([]);
  });

  it("has a valid answer, distinct options, and an explanation everywhere", () => {
    const bad = QUESTIONS.filter((q) => {
      const keys = q.options.map((o) => o.text + JSON.stringify(o.visual ?? null));
      return (
        q.answer < 0 ||
        q.answer >= q.options.length ||
        q.options.length < 2 ||
        new Set(keys).size !== keys.length ||
        q.explanation.length < 20
      );
    }).map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it("never prints computer notation in text", () => {
    const pattern = /undefined|\bNaN\b|Infinity|\[object|(^|[\s(])-\d/;
    const bad = QUESTIONS.filter((q) =>
      [q.prompt, q.explanation, ...q.options.map((o) => o.text)].some((t) => pattern.test(t)),
    ).map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it("never doubles a charge sign or gives a pKa-ratio question two right answers", () => {
    const text = (q: (typeof QUESTIONS)[number]) => [q.prompt, ...q.options.map((o) => o.text)];
    expect(QUESTIONS.filter((q) => text(q).some((t) => /⁺⁺|⁻⁻/.test(t))).map((q) => q.id)).toEqual([]);
    const bad = QUESTIONS.filter((q) => {
      const labels = q.options.map((o) => o.text);
      return labels.includes("10¹ times") && labels.includes("10 times");
    });
    expect(bad.map((q) => q.id)).toEqual([]);
  });

  it("uses only structures the renderer can parse", () => {
    const bad = new Set<string>();
    for (const q of QUESTIONS) {
      const visuals = [...(q.visuals ?? []), ...q.options.flatMap((o) => (o.visual ? [o.visual] : []))];
      for (const smiles of visuals.flatMap(smilesIn)) {
        try {
          Molecule.fromSmiles(smiles);
        } catch {
          bad.add(`${q.id}: ${smiles}`);
        }
      }
    }
    expect([...bad]).toEqual([]);
  });

  it("includes every question from the practice exam", () => {
    expect(QUESTIONS.filter((q) => q.fromExam).length).toBeGreaterThanOrEqual(15);
  });
});

describe("drawn conjugates", () => {
  it.each(DRAWN.filter((m) => m.acid))("$name conjugate acid gains exactly H⁺", (m) => {
    const parent = formula(m.smiles);
    expect(formula(m.acid!)).toEqual({ ...parent, H: parent.H + 1 });
    expect(charge(m.acid!)).toBe(charge(m.smiles) + 1);
  });

  it.each(DRAWN.filter((m) => m.base))("$name conjugate base loses exactly H⁺", (m) => {
    const parent = formula(m.smiles);
    expect(formula(m.base!)).toEqual({ ...parent, H: parent.H - 1 });
    expect(charge(m.base!)).toBe(charge(m.smiles) - 1);
  });
});
