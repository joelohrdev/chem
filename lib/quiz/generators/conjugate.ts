import { molOption } from "../author";
import { ACIDS } from "./acid-data";
import { capped, make } from "./util";

/** Species with their conjugates, plus decoys that are wrong for a stated reason. */
const SPECIES = [
  { f: "H₂O", ca: "H₃O⁺", cb: "HO⁻", d: ["H₂O⁻", "O²⁻"] },
  { f: "NH₃", ca: "NH₄⁺", cb: "NH₂⁻", d: ["NH₃⁻", "NH²⁻"] },
  { f: "HCO₃⁻", ca: "H₂CO₃", cb: "CO₃²⁻", d: ["H₂CO₃⁺", "HCO₃"] },
  { f: "H₂PO₄⁻", ca: "H₃PO₄", cb: "HPO₄²⁻", d: ["PO₄³⁻", "H₂PO₄²⁻"] },
  { f: "HPO₄²⁻", ca: "H₂PO₄⁻", cb: "PO₄³⁻", d: ["H₃PO₄", "HPO₄⁻"] },
  { f: "HSO₄⁻", ca: "H₂SO₄", cb: "SO₄²⁻", d: ["HSO₄²⁻", "H₂SO₄⁻"] },
  { f: "HS⁻", ca: "H₂S", cb: "S²⁻", d: ["H₃S⁺", "HS²⁻"] },
  { f: "H₂S", ca: "H₃S⁺", cb: "HS⁻", d: ["S²⁻", "H₂S⁻"] },
  { f: "CH₃OH", ca: "CH₃OH₂⁺", cb: "CH₃O⁻", d: ["CH₃⁺", "CH₃OH⁻"] },
  { f: "CH₃CH₂OH", ca: "CH₃CH₂OH₂⁺", cb: "CH₃CH₂O⁻", d: ["CH₃CH₂⁺", "CH₃CH₂OH⁻"] },
  { f: "CH₃NH₂", ca: "CH₃NH₃⁺", cb: "CH₃NH⁻", d: ["CH₃N²⁻", "CH₃⁻"] },
  { f: "(CH₃)₂NH", ca: "(CH₃)₂NH₂⁺", cb: "(CH₃)₂N⁻", d: ["(CH₃)₃N", "(CH₃)₂NH⁻"] },
  { f: "C₆H₅OH", ca: "C₆H₅OH₂⁺", cb: "C₆H₅O⁻", d: ["C₆H₅⁻", "C₆H₅OH⁻"] },
  { f: "C₆H₅NH₂", ca: "C₆H₅NH₃⁺", cb: "C₆H₅NH⁻", d: ["C₆H₅⁺", "C₆H₅NH₂⁻"] },
  { f: "CH₃COOH", ca: "CH₃C(OH)₂⁺", cb: "CH₃COO⁻", d: ["CH₃⁻", "CH₃COOH⁻"] },
  { f: "HCOOH", ca: "HC(OH)₂⁺", cb: "HCOO⁻", d: ["H⁻", "HCOOH⁻"] },
  { f: "CH₃CH₂SH", ca: "CH₃CH₂SH₂⁺", cb: "CH₃CH₂S⁻", d: ["CH₃CH₂⁺", "CH₃CH₂SH⁻"] },
  { f: "HC≡CH", ca: "H₂C=CH⁺", cb: "HC≡C⁻", d: ["C≡C²⁻", "HC≡CH⁻"] },
];

/** Drawn structures for the exam's "draw the conjugate" questions. */
export const DRAWN: {
  key: string;
  name: string;
  smiles: string;
  acid?: string;
  base?: string;
  decoy: string;
  /** A second wrong answer, for compounds with only one conjugate to draw. */
  decoy2?: string;
  acidNote?: string;
  baseNote?: string;
}[] = [
  { key: "cyclohexanol", name: "cyclohexanol", smiles: "OC1CCCCC1", acid: "[OH2+]C1CCCCC1", base: "[O-]C1CCCCC1", decoy: "O=C1CCCCC1" },
  { key: "ethanol", name: "ethanol", smiles: "CCO", acid: "CC[OH2+]", base: "CC[O-]", decoy: "CC=O" },
  { key: "tbuoh", name: "tert-butanol", smiles: "CC(C)(C)O", acid: "CC(C)(C)[OH2+]", base: "CC(C)(C)[O-]", decoy: "CC(C)C" },
  { key: "phenol", name: "phenol", smiles: "Oc1ccccc1", acid: "[OH2+]c1ccccc1", base: "[O-]c1ccccc1", decoy: "O=C1C=CCC=C1" },
  { key: "aniline", name: "aniline", smiles: "Nc1ccccc1", acid: "[NH3+]c1ccccc1", base: "[NH-]c1ccccc1", decoy: "c1ccccc1" },
  { key: "ethylamine", name: "ethylamine", smiles: "CCN", acid: "CC[NH3+]", base: "CC[NH-]", decoy: "CC=N" },
  { key: "cyclohexylamine", name: "cyclohexylamine", smiles: "NC1CCCCC1", acid: "[NH3+]C1CCCCC1", base: "[NH-]C1CCCCC1", decoy: "N=C1CCCCC1" },
  { key: "diethylamine", name: "diethylamine", smiles: "CCNCC", acid: "CC[NH2+]CC", base: "CC[N-]CC", decoy: "CCN(C)CC" },
  { key: "aceticacid", name: "acetic acid", smiles: "CC(=O)O", acid: "CC(O)=[OH+]", base: "CC(=O)[O-]", decoy: "CC(=O)C" },
  { key: "benzoic", name: "benzoic acid", smiles: "OC(=O)c1ccccc1", acid: "OC(=[OH+])c1ccccc1", base: "[O-]C(=O)c1ccccc1", decoy: "O=Cc1ccccc1" },
  { key: "propanoic", name: "propanoic acid", smiles: "CCC(=O)O", acid: "CCC(O)=[OH+]", base: "CCC(=O)[O-]", decoy: "CCC=O" },
  { key: "acetone", name: "acetone", smiles: "CC(C)=O", acid: "CC(C)=[OH+]", base: "CC(=O)[CH2-]", decoy: "CC(C)O" },
  { key: "cyclohexanone", name: "cyclohexanone", smiles: "O=C1CCCCC1", acid: "[OH+]=C1CCCCC1", base: "O=C1[CH-]CCCC1", decoy: "OC1CCCCC1" },
  { key: "ethanethiol", name: "ethanethiol", smiles: "CCS", acid: "CC[SH2+]", base: "CC[S-]", decoy: "CCO" },
  { key: "ether", name: "diethyl ether", smiles: "CCOCC", acid: "CC[OH+]CC", decoy: "CCOC", decoy2: "CC[O-]" },
  { key: "thf", name: "tetrahydrofuran", smiles: "C1CCOC1", acid: "C1CC[OH+]C1", decoy: "C1CCCC1", decoy2: "[O-]CCCC" },
  { key: "pyridine", name: "pyridine", smiles: "c1ccncc1", acid: "c1cc[nH+]cc1", decoy: "c1ccccc1", decoy2: "C1CCNCC1" },
  { key: "triethylamine", name: "triethylamine", smiles: "CCN(CC)CC", acid: "CC[NH+](CC)CC", decoy: "CCNCC", decoy2: "CC[N-]CC" },
  { key: "acetylene", name: "1-propyne", smiles: "CC#C", base: "CC#[C-]", decoy: "CC=C", decoy2: "[CH2-]C#C" },
  { key: "isopropanol", name: "isopropanol", smiles: "CC(C)O", acid: "CC(C)[OH2+]", base: "CC(C)[O-]", decoy: "CC(C)=O" },
  { key: "butanol", name: "1-butanol", smiles: "CCCCO", acid: "CCCC[OH2+]", base: "CCCC[O-]", decoy: "CCCC=O" },
  { key: "acetamide", name: "acetamide", smiles: "CC(N)=O", acid: "CC(N)=[OH+]", base: "CC(=O)[NH-]", decoy: "CC(O)=O" },
];

/** Wider gaps pair species that would never meet, such as H₂ with triflate. */
const MAX_PKA_GAP = 30;

export function conjugateQuestions() {
  const fromTable = SPECIES.flatMap((s) => [
    make("conjugate", "conjugate:formula", {
      key: `base:${s.f}`,
      prompt: `What is the conjugate base of ${s.f}?`,
      options: [s.cb, s.ca, ...s.d],
      explanation: `The conjugate base has one fewer H⁺, which removes one hydrogen and lowers the charge by one. Taking H⁺ from ${s.f} gives ${s.cb}.`,
    }),
    make("conjugate", "conjugate:formula", {
      key: `acid:${s.f}`,
      prompt: `What is the conjugate acid of ${s.f}?`,
      options: [s.ca, s.cb, ...s.d],
      explanation: `The conjugate acid has one more H⁺, which adds one hydrogen and raises the charge by one. Adding H⁺ to ${s.f} gives ${s.ca}.`,
    }),
  ]);

  const drawn = DRAWN.flatMap((m) => {
    const out = [];
    if (m.acid) {
      out.push(
        make("conjugate", "conjugate:drawn", {
          key: `acid:${m.key}`,
          prompt: `What is the conjugate acid of ${m.name}?`,
          visuals: [{ kind: "molecule", smiles: m.smiles }],
          options: [m.acid, m.base ?? m.decoy2!, m.decoy].map((s) => molOption(s)),
          explanation: `The conjugate acid has one more H⁺ and a charge raised by one. The proton bonds to the most available lone pair in ${m.name}, which leaves that atom with a +1 charge.`,
        }),
      );
    }
    if (m.base) {
      out.push(
        make("conjugate", "conjugate:drawn", {
          key: `base:${m.key}`,
          prompt: `What is the conjugate base of ${m.name}?`,
          visuals: [{ kind: "molecule", smiles: m.smiles }],
          options: [m.base, m.acid ?? m.decoy2!, m.decoy].map((s) => molOption(s)),
          explanation: `The conjugate base has one fewer H⁺ and a charge lowered by one. Removing the most acidic proton of ${m.name} leaves the negative charge on the atom that held it.`,
        }),
      );
    }
    return out;
  });

  const rolePairs = ACIDS.flatMap((left) =>
    ACIDS.filter((right) => right.pKa !== left.pKa && Math.abs(right.pKa - left.pKa) <= MAX_PKA_GAP && left.base !== right.f && right.base !== left.f).map(
      (right) => [left, right] as const,
    ),
  );
  const roles = capped(rolePairs, 200, "conjugate:role").map(([left, right], i) => {
    const eq = `${left.f} + ${right.base} ⇌ ${left.base} + ${right.f}`;
    const ask = (["acid", "base", "conjugate acid", "conjugate base"] as const)[i % 4];
    const answer = { acid: left.f, base: right.base, "conjugate acid": right.f, "conjugate base": left.base }[ask];
    const others = [left.f, right.base, right.f, left.base].filter((s) => s !== answer);
    return make("conjugate", "conjugate:role", {
      key: `${left.key}>${right.key}:${ask}`,
      prompt: `In this reaction, which species is the ${ask}?\n${eq}`,
      options: [answer, ...others],
      explanation: `${left.f} gives up a proton, so it is the acid, and it becomes the conjugate base ${left.base}. ${right.base} accepts that proton, so it is the base, and it becomes the conjugate acid ${right.f}.`,
    });
  });

  return [...fromTable, ...drawn, ...roles];
}
