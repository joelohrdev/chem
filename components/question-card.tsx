"use client";

import { useEffect, useRef } from "react";
import type { DisplayQuestion } from "@/lib/quiz/deck";
import { TOPICS } from "@/lib/quiz/types";
import { Visual } from "./visual";

const LETTERS = "ABCDEFGH";

export function PromptText({ prompt }: { prompt: string }) {
  const [first, ...given] = prompt.split("\n");
  return (
    <>
      <h2 className="prompt">{first}</h2>
      {given.length > 0 && (
        <div className="given">
          {given.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </>
  );
}

export function QuestionCard({
  question,
  chosen,
  onChoose,
  onNext,
  nextLabel,
}: {
  question: DisplayQuestion;
  /** Index into the question's original options, once answered. */
  chosen: number | undefined;
  onChoose: (original: number) => void;
  onNext: () => void;
  nextLabel: string;
}) {
  const answered = chosen !== undefined;
  const nextButton = useRef<HTMLButtonElement>(null);
  const topic = TOPICS.find((t) => t.id === question.topic)!;
  const hasVisualOptions = question.options.some((o) => o.visual);
  const correctPosition = question.order.indexOf(question.answer);

  useEffect(() => {
    if (answered) nextButton.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [answered]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (answered) {
        if (event.key === "Enter" && document.activeElement !== nextButton.current) {
          event.preventDefault();
          onNext();
        }
        return;
      }
      const position = LETTERS.indexOf(event.key.toUpperCase());
      const numeric = Number(event.key) - 1;
      const pick = position >= 0 ? position : numeric;
      if (pick >= 0 && pick < question.order.length) onChoose(question.order[pick]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answered, onChoose, onNext, question.order]);

  return (
    <article className="question">
      <p className="question-topic">
        {topic.name}
        {question.fromExam && <span className="exam-mark">On the practice exam</span>}
      </p>
      <PromptText prompt={question.prompt} />
      {question.visuals && (
        <div className="visuals">
          {question.visuals.map((visual, i) => (
            <Visual key={i} visual={visual} />
          ))}
        </div>
      )}
      <ol className={hasVisualOptions ? "options options-visual" : "options"}>
        {question.order.map((original, position) => {
          const option = question.options[original];
          const isAnswer = original === question.answer;
          const isChosen = original === chosen;
          const state = !answered ? "" : isAnswer ? "is-right" : isChosen ? "is-wrong" : "is-dim";
          const showText = option.text && option.text !== LETTERS[position];
          return (
            <li key={original}>
              <button
                type="button"
                className={`option ${state}`}
                disabled={answered}
                onClick={() => onChoose(original)}
              >
                <span className="option-letter" aria-hidden="true">
                  {LETTERS[position]}
                </span>
                <span className="option-body">
                  {showText && <span className="option-text">{option.text}</span>}
                  {option.visual && <Visual visual={option.visual} compact />}
                  {!showText && !option.visual && <span className="option-text">{option.text}</span>}
                  {answered && isAnswer && <span className="option-note">Right answer</span>}
                  {answered && isChosen && !isAnswer && <span className="option-note">Your answer</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {answered && (
        <section className="explanation" role="status">
          <h3 className={chosen === question.answer ? "verdict-right" : "verdict-wrong"}>
            {chosen === question.answer ? "Correct" : `Incorrect. The answer is ${LETTERS[correctPosition]}.`}
          </h3>
          <p>{question.explanation}</p>
          <button ref={nextButton} type="button" className="button button-primary" onClick={onNext} autoFocus>
            {nextLabel}
          </button>
        </section>
      )}
    </article>
  );
}
