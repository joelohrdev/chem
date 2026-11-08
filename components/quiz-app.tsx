"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/quiz/bank";
import { arrange, buildDeck, type DisplayQuestion } from "@/lib/quiz/deck";
import { clearSeen, recordAnswer, resetProgress, useProgress } from "@/lib/quiz/progress";
import { shuffle } from "@/lib/quiz/rng";
import { TOPICS, type Question, type TopicId } from "@/lib/quiz/types";
import { loadToolkit } from "./molecule";
import { PromptText, QuestionCard } from "./question-card";
import { ReactionTrace } from "./reaction-trace";
import { Visual } from "./visual";

const SIZES = [10, 25, 50, 100];
const ALL_TOPICS = TOPICS.map((t) => t.id);
const EXAM_QUESTIONS = QUESTIONS.filter((q) => q.fromExam);
const number = new Intl.NumberFormat("en-US");

type Session = {
  deck: DisplayQuestion[];
  answers: (number | undefined)[];
  index: number;
  finished: boolean;
};

const newSession = (questions: Question[]): Session => ({
  deck: questions.map((q) => arrange(q, Math.random)),
  answers: questions.map(() => undefined),
  index: 0,
  finished: false,
});

export function QuizApp() {
  const progress = useProgress();
  const [topics, setTopics] = useState<TopicId[]>(ALL_TOPICS);
  const [size, setSize] = useState(25);
  const [session, setSession] = useState<Session | null>(null);

  // Fetch the structure drawing code up front, so questions never show blank structures.
  useEffect(() => {
    void loadToolkit();
  }, []);

  const pool = useMemo(() => QUESTIONS.filter((q) => topics.includes(q.topic)), [topics]);
  const remaining = pool.filter((q) => !progress.seen[q.id]).length;
  const missed = QUESTIONS.filter((q) => progress.results[q.id]?.lastRight === false);

  const start = () => {
    const deck = buildDeck(pool, new Set(Object.keys(progress.seen)), size, Math.random);
    if (deck.length > 0) setSession(newSession(deck));
  };

  const choose = useCallback(
    (original: number) => {
      if (!session || session.answers[session.index] !== undefined) return;
      const question = session.deck[session.index];
      recordAnswer(question.id, original === question.answer);
      const answers = [...session.answers];
      answers[session.index] = original;
      setSession({ ...session, answers });
    },
    [session],
  );

  const next = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      if (s.index + 1 >= s.deck.length) return { ...s, finished: true };
      return { ...s, index: s.index + 1 };
    });
    window.scrollTo({ top: 0 });
  }, []);

  if (session?.finished) {
    return (
      <Summary
        session={session}
        onAgain={() => {
          setSession(null);
        }}
        onRetryMissed={(questions) => setSession(newSession(shuffle(questions, Math.random)))}
      />
    );
  }

  if (session) {
    const question = session.deck[session.index];
    const outcomes = session.answers.flatMap((a, i) =>
      a === undefined ? [] : [a === session.deck[i].answer],
    );
    return (
      <main className="page">
        <header className="session-bar">
          <p>
            Question {session.index + 1} of {session.deck.length}
          </p>
          <button type="button" className="button-link" onClick={() => setSession({ ...session, finished: true })}>
            End session
          </button>
        </header>
        <ReactionTrace outcomes={outcomes} total={session.deck.length} />
        <QuestionCard
          key={question.id}
          question={question}
          chosen={session.answers[session.index]}
          onChoose={choose}
          onNext={next}
          nextLabel={session.index + 1 === session.deck.length ? "See results" : "Next question"}
        />
      </main>
    );
  }

  const toggleTopic = (id: TopicId) =>
    setTopics((list) => (list.includes(id) ? list.filter((t) => t !== id) : [...list, id]));

  const accuracy = (id: TopicId) => {
    let right = 0;
    let total = 0;
    for (const q of QUESTIONS) {
      const r = progress.results[q.id];
      if (q.topic === id && r) {
        right += r.right;
        total += r.right + r.wrong;
      }
    }
    return total === 0 ? null : Math.round((right / total) * 100);
  };

  const answeredCount = Object.keys(progress.seen).length;

  return (
    <main className="page">
      <header className="masthead">
        <h1>CHM 2410 Exam 3 practice</h1>
        <p>
          {number.format(QUESTIONS.length)} questions based on your practice exam, each with an
          explanation. You won&apos;t see a question twice until you&apos;ve answered them all.
        </p>
      </header>

      <section aria-labelledby="topics-heading">
        <div className="section-heading">
          <h2 id="topics-heading">Topics</h2>
          <button
            type="button"
            className="button-link"
            onClick={() => setTopics(topics.length === TOPICS.length ? [] : ALL_TOPICS)}
          >
            {topics.length === TOPICS.length ? "Clear all" : "Select all"}
          </button>
        </div>
        <ul className="tiles">
          {TOPICS.map((topic) => {
            const selected = topics.includes(topic.id);
            const score = accuracy(topic.id);
            const count = QUESTIONS.filter((q) => q.topic === topic.id).length;
            return (
              <li key={topic.id}>
                <button
                  type="button"
                  className="tile"
                  aria-pressed={selected}
                  onClick={() => toggleTopic(topic.id)}
                >
                  <span className="tile-top">
                    <span>{count}</span>
                    <span>{score === null ? "" : `${score}%`}</span>
                  </span>
                  <span className="tile-symbol">{topic.symbol}</span>
                  <span className="tile-name">{topic.name}</span>
                  <span className="tile-blurb">{topic.blurb}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="setup" aria-labelledby="size-heading">
        <h2 id="size-heading">Questions in this session</h2>
        <div className="sizes" role="radiogroup" aria-labelledby="size-heading">
          {SIZES.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={size === option}
              className="size"
              onClick={() => setSize(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {topics.length === 0 ? (
          <p className="notice">Select at least one topic to start.</p>
        ) : remaining === 0 ? (
          <div className="notice">
            <p>You&apos;ve answered every question in these topics.</p>
            <button type="button" className="button" onClick={() => clearSeen(pool.map((q) => q.id))}>
              Start these topics over
            </button>
          </div>
        ) : (
          <>
            <button type="button" className="button button-primary button-start" onClick={start}>
              Start {Math.min(size, remaining)} questions
            </button>
            <p className="hint">
              {number.format(remaining)} new questions left in these topics. Press A to E to answer
              and Enter to continue.
            </p>
          </>
        )}
      </section>

      <section className="extras" aria-label="Other ways to practice">
        <button type="button" className="button" onClick={() => setSession(newSession(EXAM_QUESTIONS))}>
          Take the {EXAM_QUESTIONS.length} practice exam questions
        </button>
        {missed.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setSession(newSession(shuffle(missed, Math.random).slice(0, size)))}
          >
            Review {number.format(missed.length)} missed {missed.length === 1 ? "question" : "questions"}
          </button>
        )}
        {answeredCount > 0 && (
          <button
            type="button"
            className="button-link"
            onClick={() => {
              if (window.confirm("Reset all progress? Scores and answered questions will be cleared.")) resetProgress();
            }}
          >
            Reset progress
          </button>
        )}
      </section>
    </main>
  );
}

function Summary({
  session,
  onAgain,
  onRetryMissed,
}: {
  session: Session;
  onAgain: () => void;
  onRetryMissed: (questions: Question[]) => void;
}) {
  const attempted = session.deck.flatMap((q, i) => {
    const chosen = session.answers[i];
    return chosen === undefined ? [] : [{ question: q, chosen, right: chosen === q.answer }];
  });
  const rightCount = attempted.filter((a) => a.right).length;
  const misses = attempted.filter((a) => !a.right);
  const perTopic = TOPICS.flatMap((topic) => {
    const list = attempted.filter((a) => a.question.topic === topic.id);
    return list.length === 0 ? [] : [{ topic, total: list.length, right: list.filter((a) => a.right).length }];
  });

  return (
    <main className="page">
      <header className="masthead">
        <h1>
          {rightCount} of {attempted.length} right
        </h1>
        {attempted.length > 0 && (
          <p>Your session as a reaction: every right answer runs downhill, and every miss climbs.</p>
        )}
      </header>
      {attempted.length > 0 && (
        <ReactionTrace outcomes={attempted.map((a) => a.right)} total={attempted.length} large />
      )}

      {perTopic.length > 0 && (
        <table className="scores">
          <caption>Score by topic</caption>
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Right</th>
              <th scope="col">Out of</th>
            </tr>
          </thead>
          <tbody>
            {perTopic.map(({ topic, right, total }) => (
              <tr key={topic.id}>
                <th scope="row">{topic.name}</th>
                <td>{right}</td>
                <td>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="summary-actions">
        <button type="button" className="button button-primary" onClick={onAgain}>
          Start another session
        </button>
        {misses.length > 0 && (
          <button type="button" className="button" onClick={() => onRetryMissed(misses.map((m) => m.question))}>
            Retry {misses.length} missed
          </button>
        )}
      </div>

      {misses.length > 0 && (
        <section className="review" aria-labelledby="review-heading">
          <h2 id="review-heading">What to review</h2>
          {misses.map(({ question, chosen }) => {
            const answer = question.options[question.answer];
            const yours = question.options[chosen];
            return (
              <article key={question.id} className="review-item">
                <PromptText prompt={question.prompt} />
                {question.visuals && (
                  <div className="visuals">
                    {question.visuals.map((visual, i) => (
                      <Visual key={i} visual={visual} />
                    ))}
                  </div>
                )}
                <div className="review-answers">
                  <div>
                    <h3 className="verdict-wrong">Your answer</h3>
                    {yours.text && <p>{yours.text}</p>}
                    {yours.visual && <Visual visual={yours.visual} compact />}
                  </div>
                  <div>
                    <h3 className="verdict-right">Right answer</h3>
                    {answer.text && <p>{answer.text}</p>}
                    {answer.visual && <Visual visual={answer.visual} compact />}
                  </div>
                </div>
                <p>{question.explanation}</p>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
