import type { EnergyProfile } from "@/lib/quiz/types";

/** Smooth curve through the points, flat at each one, so peaks and valleys fall exactly on them. */
export function curveThrough(points: [number, number][]) {
  return points
    .map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = points[i - 1];
      const mid = (x - px) / 2;
      return `C ${px + mid} ${py}, ${x - mid} ${y}, ${x} ${y}`;
    })
    .join(" ");
}

export function EnergyDiagram({ profile, compact }: { profile: EnergyProfile; compact?: boolean }) {
  const scale = profile.scale ?? false;
  const width = compact ? 220 : 400;
  const height = compact ? 130 : 230;
  const left = scale ? 46 : 18;
  const right = 14;
  const top = 18;
  const bottom = 30;
  const plotW = width - left - right;
  const plotH = height - top - bottom;

  const highest = Math.max(...profile.points);
  const maxY = scale ? Math.ceil((highest + 5) / 10) * 10 : highest * 1.15;
  const y = (v: number) => top + plotH * (1 - v / maxY);

  const flat = plotW * 0.08;
  const stepW = (plotW - flat * 2) / Math.max(profile.points.length - 1, 1);
  const points = profile.points.map((v, i): [number, number] => [left + flat + i * stepW, y(v)]);

  const path = profile.straight
    ? `M ${left + flat} ${points[0][1]} L ${left + plotW - flat} ${points[points.length - 1][1]}`
    : `M ${left + 2} ${points[0][1]} L ${points[0][0]} ${points[0][1]} ${curveThrough(points).replace(/^M [^C]*/, "")} L ${left + plotW - 2} ${points[points.length - 1][1]}`;

  const grid: number[] = [];
  if (scale) for (let v = 5; v <= maxY; v += 5) grid.push(v);

  const description = profile.straight
    ? "Energy diagram: a straight line with no peaks."
    : `Energy diagram with free energy values ${profile.points.join(", ")} kilojoules per mole at its successive peaks and valleys.`;

  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={description}
    >
      {grid.map((v) => (
        <g key={v}>
          <line
            x1={left}
            x2={left + plotW}
            y1={y(v)}
            y2={y(v)}
            stroke="var(--line)"
            strokeDasharray={v % 10 === 0 ? undefined : "2 4"}
          />
          {v % 10 === 0 && (
            <text x={left - 6} y={y(v) + 4} textAnchor="end" className="diagram-tick">
              {v}
            </text>
          )}
        </g>
      ))}
      <path d={`M ${left} ${top - 6} L ${left} ${top + plotH} L ${left + plotW} ${top + plotH}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.2} strokeLinecap="round" />
      {profile.labels?.map((label, i) => {
        const isPeak = i % 2 === 1;
        return (
          <text
            key={label}
            x={points[i][0]}
            y={points[i][1] + (isPeak ? -7 : 17)}
            textAnchor="middle"
            className="diagram-label"
          >
            {label}
          </text>
        );
      })}
      <text x={left + plotW / 2} y={height - 9} textAnchor="middle" className="diagram-axis">
        reaction coordinate
      </text>
      {scale && (
        <text
          transform={`translate(14 ${top + plotH / 2}) rotate(-90)`}
          textAnchor="middle"
          className="diagram-axis"
        >
          free energy, kJ/mol
        </text>
      )}
    </svg>
  );
}
