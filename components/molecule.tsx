"use client";

import { Suspense, use } from "react";

type OclModule = typeof import("openchemlib");

// The chemistry toolkit is about 1 MB, so it loads only when a structure first appears.
let toolkit: Promise<OclModule> | undefined;
export const loadToolkit = () => (toolkit ??= import("openchemlib"));

const cache = new Map<string, string>();
let counter = 0;

function drawing(ocl: OclModule, smiles: string) {
  const cached = cache.get(smiles);
  if (cached) return cached;
  const svg = ocl.Molecule.fromSmiles(smiles)
    .toSVG(300, 180, `mol-${++counter}`, {
      autoCrop: true,
      autoCropMargin: 8,
      suppressChiralText: true,
      suppressESR: true,
      suppressCIPParity: true,
      noStereoProblem: true,
    })
    .replace(/rgb\(0,0,0\)/g, "currentColor")
    .replace(/rgb\(255,13,13\)/g, "var(--atom-oxygen)")
    .replace(/rgb\(48,80,248\)/g, "var(--atom-nitrogen)")
    .replace(/rgb\(31,240,31\)|rgb\(144,224,80\)/g, "var(--atom-halogen)")
    .replace(/rgb\(166,41,41\)/g, "var(--atom-bromine)")
    .replace(/rgb\(255,255,48\)/g, "var(--atom-sulfur)")
    // The toolkit draws charges very small, but they often decide the answer.
    .replace(
      /font-size="\d+" fill="([^"]+)">([-+])<\/text>/g,
      (_, fill, sign) =>
        `dx="3" dy="-3" font-size="14" stroke="var(--surface)" stroke-width="3" paint-order="stroke" fill="${fill}">${sign === "-" ? "⊖" : "⊕"}</text>`,
    )
    .replace(/font-family: sans-serif;/, "font-family: var(--font-sans), sans-serif;")
    .replace(/width="(\d+)px" height="(\d+)px"/, (_, w, h) => `width="${Number(w) * 1.25}" height="${Number(h) * 1.25}"`);
  cache.set(smiles, svg);
  return svg;
}

function Drawing({ smiles }: { smiles: string }) {
  const ocl = use(loadToolkit());
  return (
    <span
      className="molecule"
      role="img"
      aria-label="Chemical structure"
      // The SVG is produced locally from the question bank's own structures.
      dangerouslySetInnerHTML={{ __html: drawing(ocl, smiles) }}
    />
  );
}

export function Molecule({ smiles }: { smiles: string }) {
  return (
    <Suspense fallback={<span className="molecule molecule-loading" />}>
      <Drawing smiles={smiles} />
    </Suspense>
  );
}
