import type { Species, Visual as VisualSpec } from "@/lib/quiz/types";
import { ArrowScene } from "./arrow-scene";
import { EnergyDiagram } from "./energy-diagram";
import { Molecule } from "./molecule";

function SpeciesView({ species }: { species: Species }) {
  return "smiles" in species ? (
    <Molecule smiles={species.smiles} />
  ) : (
    <span className="species-text">{species.text}</span>
  );
}

function Side({ items }: { items: Species[] }) {
  return items.map((species, i) => (
    <span key={i} className="reaction-part">
      {i > 0 && <span className="reaction-plus">+</span>}
      <SpeciesView species={species} />
    </span>
  ));
}

export function Visual({ visual, compact }: { visual: VisualSpec; compact?: boolean }) {
  switch (visual.kind) {
    case "molecule":
      return (
        <figure className="figure">
          <Molecule smiles={visual.smiles} />
          {visual.label && <figcaption>{visual.label}</figcaption>}
        </figure>
      );
    case "energy":
      return (
        <figure className="figure">
          <EnergyDiagram profile={visual.profile} compact={compact} />
          {visual.label && <figcaption>{visual.label}</figcaption>}
        </figure>
      );
    case "scene":
      return (
        <figure className="figure">
          <ArrowScene scene={visual.scene} />
        </figure>
      );
    case "reaction":
      if (visual.right.length === 0) {
        return (
          <figure className="figure">
            <Side items={visual.left} />
            {visual.label && <figcaption>{visual.label}</figcaption>}
          </figure>
        );
      }
      return (
        <figure className="reaction">
          {visual.label && <figcaption className="reaction-label">{visual.label}</figcaption>}
          <Side items={visual.left} />
          <span className="reaction-arrow" role="img" aria-label={visual.arrow === "equilibrium" ? "is in equilibrium with" : "reacts to give"}>
            {visual.arrow === "equilibrium" ? "⇌" : "→"}
          </span>
          <Side items={visual.right} />
        </figure>
      );
  }
}
