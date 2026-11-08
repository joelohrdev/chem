export type Acid = {
  key: string;
  /** Formula as drawn in a question. */
  f: string;
  name: string;
  pKa: number;
  /** The conjugate base. */
  base: string;
};

/** Approximate textbook pKa values. Questions always state the value they rely on. */
export const ACIDS: Acid[] = [
  { key: "tfoh", f: "CF₃SO₃H", name: "triflic acid", pKa: -14, base: "CF₃SO₃⁻" },
  { key: "hi", f: "HI", name: "hydroiodic acid", pKa: -10, base: "I⁻" },
  { key: "hbr", f: "HBr", name: "hydrobromic acid", pKa: -9, base: "Br⁻" },
  { key: "hcl", f: "HCl", name: "hydrochloric acid", pKa: -7, base: "Cl⁻" },
  { key: "h2so4", f: "H₂SO₄", name: "sulfuric acid", pKa: -3, base: "HSO₄⁻" },
  { key: "meoh2", f: "CH₃OH₂⁺", name: "protonated methanol", pKa: -2.5, base: "CH₃OH" },
  { key: "h3o", f: "H₃O⁺", name: "hydronium", pKa: -1.7, base: "H₂O" },
  { key: "hno3", f: "HNO₃", name: "nitric acid", pKa: -1.4, base: "NO₃⁻" },
  { key: "tfa", f: "CF₃COOH", name: "trifluoroacetic acid", pKa: 0.5, base: "CF₃COO⁻" },
  { key: "dca", f: "Cl₂CHCOOH", name: "dichloroacetic acid", pKa: 1.3, base: "Cl₂CHCOO⁻" },
  { key: "cla", f: "ClCH₂COOH", name: "chloroacetic acid", pKa: 2.9, base: "ClCH₂COO⁻" },
  { key: "hf", f: "HF", name: "hydrofluoric acid", pKa: 3.2, base: "F⁻" },
  { key: "formic", f: "HCOOH", name: "formic acid", pKa: 3.8, base: "HCOO⁻" },
  { key: "benzoic", f: "C₆H₅COOH", name: "benzoic acid", pKa: 4.2, base: "C₆H₅COO⁻" },
  { key: "anilinium", f: "C₆H₅NH₃⁺", name: "anilinium", pKa: 4.6, base: "C₆H₅NH₂" },
  { key: "acetic", f: "CH₃COOH", name: "acetic acid", pKa: 4.8, base: "CH₃COO⁻" },
  { key: "pyridinium", f: "C₅H₅NH⁺", name: "pyridinium", pKa: 5.2, base: "C₅H₅N" },
  { key: "h2co3", f: "H₂CO₃", name: "carbonic acid", pKa: 6.4, base: "HCO₃⁻" },
  { key: "h2s", f: "H₂S", name: "hydrogen sulfide", pKa: 7, base: "HS⁻" },
  { key: "acac", f: "CH₃COCH₂COCH₃", name: "pentane-2,4-dione", pKa: 9, base: "CH₃COCH⁻COCH₃" },
  { key: "hcn", f: "HCN", name: "hydrogen cyanide", pKa: 9.2, base: "CN⁻" },
  { key: "nh4", f: "NH₄⁺", name: "ammonium", pKa: 9.3, base: "NH₃" },
  { key: "phenol", f: "C₆H₅OH", name: "phenol", pKa: 10, base: "C₆H₅O⁻" },
  { key: "etsh", f: "CH₃CH₂SH", name: "ethanethiol", pKa: 10.6, base: "CH₃CH₂S⁻" },
  { key: "menh3", f: "CH₃NH₃⁺", name: "methylammonium", pKa: 10.6, base: "CH₃NH₂" },
  { key: "et3nh", f: "(CH₃CH₂)₃NH⁺", name: "triethylammonium", pKa: 10.8, base: "(CH₃CH₂)₃N" },
  { key: "meoh", f: "CH₃OH", name: "methanol", pKa: 15.5, base: "CH₃O⁻" },
  { key: "water", f: "H₂O", name: "water", pKa: 15.7, base: "HO⁻" },
  { key: "etoh", f: "CH₃CH₂OH", name: "ethanol", pKa: 16, base: "CH₃CH₂O⁻" },
  { key: "tbuoh", f: "(CH₃)₃COH", name: "tert-butanol", pKa: 18, base: "(CH₃)₃CO⁻" },
  { key: "acetone", f: "CH₃COCH₃", name: "acetone", pKa: 19, base: "CH₃COCH₂⁻" },
  { key: "etoac", f: "CH₃COOCH₂CH₃", name: "ethyl acetate", pKa: 25, base: "⁻CH₂COOCH₂CH₃" },
  { key: "alkyne", f: "HC≡CH", name: "acetylene", pKa: 25, base: "HC≡C⁻" },
  { key: "h2", f: "H₂", name: "hydrogen", pKa: 35, base: "H⁻" },
  { key: "nh3", f: "NH₃", name: "ammonia", pKa: 38, base: "NH₂⁻" },
  { key: "ethene", f: "H₂C=CH₂", name: "ethylene", pKa: 44, base: "H₂C=CH⁻" },
  { key: "ethane", f: "CH₃CH₃", name: "ethane", pKa: 50, base: "CH₃CH₂⁻" },
];

export type Series = {
  key: string;
  reason: string;
  members: { label: string; pKa: number }[];
};

/** Groups whose order follows one named factor, so the explanation can name it. */
export const SERIES: Series[] = [
  {
    key: "halides",
    reason: "These atoms are in the same group, so size decides: larger anions hold charge more stably.",
    members: [
      { label: "HI", pKa: -10 },
      { label: "HBr", pKa: -9 },
      { label: "HCl", pKa: -7 },
      { label: "HF", pKa: 3.2 },
    ],
  },
  {
    key: "chalcogens",
    reason: "These atoms are in the same group, so size decides: larger anions hold charge more stably.",
    members: [
      { label: "H₂Te", pKa: 2.6 },
      { label: "H₂Se", pKa: 3.9 },
      { label: "H₂S", pKa: 7 },
      { label: "H₂O", pKa: 15.7 },
    ],
  },
  {
    key: "row2",
    reason: "These atoms are in the same row, so electronegativity decides: the charge is most stable on the most electronegative atom.",
    members: [
      { label: "HF", pKa: 3.2 },
      { label: "H₂O", pKa: 15.7 },
      { label: "NH₃", pKa: 38 },
      { label: "CH₄", pKa: 50 },
    ],
  },
  {
    key: "row3",
    reason: "These atoms are in the same row, so electronegativity decides: the charge is most stable on the most electronegative atom.",
    members: [
      { label: "HCl", pKa: -7 },
      { label: "H₂S", pKa: 7 },
      { label: "PH₃", pKa: 27 },
    ],
  },
  {
    key: "haloacetic",
    reason: "Each halogen acts by induction, which follows electronegativity. The more electronegative the halogen, the more it stabilizes the carboxylate.",
    members: [
      { label: "FCH₂COOH", pKa: 2.6 },
      { label: "ClCH₂COOH", pKa: 2.9 },
      { label: "ICH₂COOH", pKa: 3.2 },
      { label: "CH₃COOH", pKa: 4.8 },
    ],
  },
  {
    key: "chlorocount",
    reason: "Each extra chlorine withdraws more electron density by induction and further stabilizes the carboxylate.",
    members: [
      { label: "Cl₃CCOOH", pKa: 0.7 },
      { label: "Cl₂CHCOOH", pKa: 1.3 },
      { label: "ClCH₂COOH", pKa: 2.9 },
      { label: "CH₃COOH", pKa: 4.8 },
    ],
  },
  {
    key: "fluorocount",
    reason: "Each extra fluorine withdraws more electron density by induction and further stabilizes the carboxylate.",
    members: [
      { label: "CF₃COOH", pKa: 0.5 },
      { label: "CHF₂COOH", pKa: 1.3 },
      { label: "CH₂FCOOH", pKa: 2.6 },
      { label: "CH₃COOH", pKa: 4.8 },
    ],
  },
  {
    key: "distance",
    reason: "Induction weakens with distance, so the closer the chlorine sits to the COOH group, the stronger the acid.",
    members: [
      { label: "CH₃CH₂CHClCOOH", pKa: 2.8 },
      { label: "CH₃CHClCH₂COOH", pKa: 4.0 },
      { label: "ClCH₂CH₂CH₂COOH", pKa: 4.5 },
      { label: "CH₃CH₂CH₂COOH", pKa: 4.8 },
    ],
  },
  {
    key: "oxygen",
    reason: "All lose H⁺ from oxygen, so resonance decides. A carboxylate shares charge over two oxygens, a phenoxide shares with the ring, and an alkoxide has no resonance.",
    members: [
      { label: "CH₃COOH", pKa: 4.8 },
      { label: "C₆H₅OH", pKa: 10 },
      { label: "CH₃CH₂OH", pKa: 16 },
    ],
  },
  {
    key: "hybrid",
    reason: "The lone pair sits in an sp, sp² or sp³ orbital. More s character holds it closer to the nucleus and stabilizes it.",
    members: [
      { label: "HC≡CH", pKa: 25 },
      { label: "H₂C=CH₂", pKa: 44 },
      { label: "CH₃CH₃", pKa: 50 },
    ],
  },
  {
    key: "ethylX",
    reason: "These lose H⁺ from different atoms. Sulfur is largest, so it wins by size; then O > N > C by electronegativity.",
    members: [
      { label: "CH₃CH₂SH", pKa: 10.6 },
      { label: "CH₃CH₂OH", pKa: 16 },
      { label: "CH₃CH₂NH₂", pKa: 38 },
      { label: "CH₃CH₃", pKa: 50 },
    ],
  },
  {
    key: "carbonacids",
    reason: "All lose H⁺ from carbon, so resonance decides. Two carbonyls stabilize the anion best, one is next (ketones more than esters), and no carbonyl leaves the charge on carbon alone.",
    members: [
      { label: "CH₃COCH₂COCH₃", pKa: 9 },
      { label: "CH₃COCH₃", pKa: 19 },
      { label: "CH₃COOCH₂CH₃", pKa: 25 },
      { label: "CH₃CH₃", pKa: 50 },
    ],
  },
  {
    key: "cations",
    reason: "All are positively charged acids. A positive charge on electronegative oxygen is least stable, so oxonium ions are strongest. An N lone pair that is delocalized or in an sp² orbital makes a weaker base, and so a stronger conjugate acid.",
    members: [
      { label: "CH₃OH₂⁺", pKa: -2.5 },
      { label: "C₆H₅NH₃⁺", pKa: 4.6 },
      { label: "C₅H₅NH⁺", pKa: 5.2 },
      { label: "CH₃NH₃⁺", pKa: 10.6 },
    ],
  },
  {
    key: "charge",
    reason: "Adding a positive charge makes a species more acidic, since losing H⁺ then removes the unfavorable charge.",
    members: [
      { label: "H₃O⁺", pKa: -1.7 },
      { label: "NH₄⁺", pKa: 9.3 },
      { label: "H₂O", pKa: 15.7 },
      { label: "NH₃", pKa: 38 },
    ],
  },
];
