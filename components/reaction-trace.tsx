import { curveThrough } from "./energy-diagram";

/**
 * The session's progress, drawn as a reaction energy curve: each right answer runs downhill,
 * each miss climbs. It fills from left to right across the whole session.
 */
export function ReactionTrace({
  outcomes,
  total,
  large,
}: {
  outcomes: boolean[];
  total: number;
  large?: boolean;
}) {
  const width = 720;
  const height = large ? 170 : 72;
  const pad = 10;

  const levels = outcomes.reduce<number[]>(
    (acc, right) => [...acc, acc[acc.length - 1] + (right ? -1 : 1)],
    [0],
  );
  const reach = Math.max(4, ...levels.map(Math.abs));
  const x = (i: number) => pad + ((width - pad * 2) * i) / Math.max(total, 1);
  const y = (level: number) => height / 2 - ((height / 2 - pad) * level) / reach;
  const points = levels.map((level, i): [number, number] => [x(i), y(level)]);
  const right = outcomes.filter(Boolean).length;

  return (
    <svg
      className="trace"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${right} right and ${outcomes.length - right} wrong so far, out of ${total} questions`}
    >
      <line x1={pad} x2={width - pad} y1={height / 2} y2={height / 2} stroke="var(--line)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
      <path d={curveThrough(points)} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {outcomes.map((isRight, i) => (
        // A zero-length round line stays a true circle when the SVG stretches to fit its width.
        <line
          key={i}
          x1={x(i + 1)}
          x2={x(i + 1)}
          y1={y(levels[i + 1])}
          y2={y(levels[i + 1])}
          stroke={isRight ? "var(--right)" : "var(--wrong)"}
          strokeWidth={large ? 10 : 8}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
