import { useId } from "react";
import type { ArrowScene as Scene } from "@/lib/quiz/types";

const DOT_OFFSET: Record<string, [number, number, number, number]> = {
  r: [5, -8, 5, -2],
  l: [-5, -8, -5, -2],
  t: [-3, -18, 3, -18],
  b: [-3, 7, 3, 7],
};

export function ArrowScene({ scene }: { scene: Scene }) {
  const marker = useId();
  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${scene.width} ${scene.height}`}
      width={scene.width}
      height={scene.height}
      role="img"
      aria-label={`Curved arrow drawing with ${scene.arrows.length} ${scene.arrows.length === 1 ? "arrow" : "arrows"}`}
    >
      <defs>
        <marker id={marker} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 L 2.5 5 z" fill="var(--arrow)" />
        </marker>
      </defs>
      {scene.bonds.map((bond, i) => {
        const [x1, y1] = bond.from;
        const [x2, y2] = bond.to;
        if (bond.order !== 2) {
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1.5} />;
        }
        const length = Math.hypot(x2 - x1, y2 - y1) || 1;
        const nx = (-(y2 - y1) / length) * 2.4;
        const ny = ((x2 - x1) / length) * 2.4;
        return (
          <g key={i} stroke="currentColor" strokeWidth={1.5}>
            <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} />
            <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} />
          </g>
        );
      })}
      {scene.atoms.map((atom, i) => (
        <g key={i}>
          <text x={atom.x} y={atom.y} textAnchor={atom.anchor ?? "middle"} className="scene-atom">
            {atom.text}
          </text>
          {[...(atom.lonePairs ?? "")].map((side) => {
            const [ax, ay, bx, by] = DOT_OFFSET[side];
            const edge = side === "r" ? 3 : side === "l" ? (atom.anchor === "end" ? -30 : -9) : 0;
            return (
              <g key={side} fill="currentColor">
                <circle cx={atom.x + ax + edge} cy={atom.y + ay} r={1.5} />
                <circle cx={atom.x + bx + edge} cy={atom.y + by} r={1.5} />
              </g>
            );
          })}
        </g>
      ))}
      {scene.arrows.map((arrow, i) => {
        const [x1, y1] = arrow.from;
        const [x2, y2] = arrow.to;
        // Bend sideways from the arrow's own direction, so steep arrows curve too.
        const length = Math.hypot(x2 - x1, y2 - y1) || 1;
        const mx = (x1 + x2) / 2 - (arrow.bend * (y2 - y1)) / length;
        const my = (y1 + y2) / 2 + (arrow.bend * (x2 - x1)) / length;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
            fill="none"
            stroke="var(--arrow)"
            strokeWidth={1.7}
            markerEnd={`url(#${marker})`}
          />
        );
      })}
    </svg>
  );
}
