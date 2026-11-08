import type { Option, Question, TopicId, Visual } from "./types";

export type Draft = {
  prompt: string;
  /** Plain strings or full options. The first is correct unless `answer` says otherwise. */
  options: (string | Option)[];
  explanation: string;
  answer?: number;
  visuals?: Visual[];
  keepOrder?: boolean;
  exam?: boolean;
};

export const toOption = (o: string | Option): Option =>
  typeof o === "string" ? { text: o } : o;

/** Turns a topic's hand-written drafts into questions. Append to a list to keep existing ids stable. */
export function handwritten(topic: TopicId, drafts: Draft[]): Question[] {
  return drafts.map((d, i) => ({
    id: `${topic}-h${i + 1}`,
    topic,
    family: `${topic}:handwritten`,
    prompt: d.prompt,
    visuals: d.visuals,
    options: d.options.map(toOption),
    answer: d.answer ?? 0,
    explanation: d.explanation,
    keepOrder: d.keepOrder,
    fromExam: d.exam,
    handwritten: true,
  }));
}

export const mol = (smiles: string, label?: string): Visual => ({
  kind: "molecule",
  smiles,
  label,
});

export const molOption = (smiles: string, text = ""): Option => ({
  text,
  visual: { kind: "molecule", smiles },
});
