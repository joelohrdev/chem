import { handwritten, mol, molOption } from "../author";

export const acidStrength = handwritten("acid", [
  {
    exam: true,
    keepOrder: true,
    answer: 3,
    prompt: "Which of the following best explains which compound is more acidic: HF or HBr?",
    options: [
      "HF is more acidic due to the F atom being more electronegative than Br",
      "HBr is more acidic due to the Br atom being less electronegative than F",
      "HF is more acidic due to the F⁻ anion being smaller than Br⁻",
      "HBr is more acidic due to the Br⁻ anion being larger than F⁻",
      "HF is capable of participating in hydrogen bonding and therefore is a strong acid",
    ],
    explanation:
      "F and Br are in the same group, and going down a group size beats electronegativity. Br⁻ spreads its charge over a much larger volume, so it is the more stable conjugate base and HBr (pKa about −9) is far stronger than HF (pKa about 3.2).",
  },
  {
    exam: true,
    keepOrder: true,
    prompt: "Which of the following is the strongest acid?",
    visuals: [
      mol("FC(F)(F)S(=O)(=O)O", "A, pKa = −14"),
      mol("CC(C)(C)O", "B, pKa = 18.0"),
      mol("O=C(C)c1ccccc1", "C, pKa = 16.0"),
    ],
    options: ["A", "B", "C"],
    explanation:
      "The lowest pKa is the strongest acid, and A (triflic acid) has a pKa of −14. Its conjugate base is stabilized by resonance across three oxygens and by the strongly electron-withdrawing CF₃ group.",
  },
  {
    exam: true,
    keepOrder: true,
    prompt: "Rank these acids from most acidic to least acidic.",
    visuals: [
      mol("NC(C)C(Cl)(Cl)Cl", "A"),
      { kind: "reaction", left: [{ text: "HBr" }], right: [], arrow: "forward", label: "B" },
      mol("OC(=O)C(Cl)(Cl)Cl", "C"),
      mol("NC(=O)C(Cl)(Cl)Cl", "D"),
      mol("NC(C)C(Br)(Br)Br", "E"),
    ],
    options: [
      "B > C > D > A > E",
      "C > B > D > A > E",
      "B > C > D > E > A",
      "B > D > C > A > E",
      "C > D > B > E > A",
    ],
    explanation:
      "HBr is a strong acid because Br⁻ is large and stable. Between C and D, both have resonance, but C's negative charge ends up on oxygen, which is more electronegative than the nitrogen in D. D beats A and E because the amide anion has resonance and the amine anions do not. A beats E because chlorine is more electronegative than bromine, so CCl₃ withdraws electrons more strongly.",
  },
  {
    prompt: "Going down a column of the periodic table, what mainly controls the acidity of H–X?",
    options: [
      "The size of X, because a larger anion spreads its charge better",
      "The electronegativity of X, because it decreases going down",
      "The hybridization of X, because lower atoms use more s character",
      "The number of lone pairs on X, because they increase going down",
    ],
    explanation:
      "Within a group, size dominates. Larger anions hold charge over more volume, and the H–X bond is also weaker. That is why HI > HBr > HCl > HF even though fluorine is the most electronegative.",
  },
  {
    prompt: "Going across a row of the periodic table, what mainly controls the acidity of H–X?",
    options: [
      "The electronegativity of X, because it stabilizes the negative charge",
      "The size of X, because atoms get much larger across a row",
      "Resonance, because atoms farther right have more resonance forms",
      "Induction from neighboring atoms, because X has more neighbors",
    ],
    explanation:
      "Atoms in the same row are close in size, so electronegativity decides. That gives the order CH₄ < NH₃ < H₂O < HF.",
  },
  {
    keepOrder: true,
    prompt: "Which order correctly ranks these from most acidic to least acidic?",
    options: ["HF > H₂O > NH₃ > CH₄", "CH₄ > NH₃ > H₂O > HF", "H₂O > HF > NH₃ > CH₄", "NH₃ > H₂O > HF > CH₄"],
    explanation:
      "All four central atoms are in the second row, so acidity follows electronegativity: F > O > N > C. Approximate pKa values are 3.2, 15.7, 38 and 50.",
  },
  {
    keepOrder: true,
    prompt: "Which order correctly ranks the hydrogen halides from most acidic to least acidic?",
    options: ["HI > HBr > HCl > HF", "HF > HCl > HBr > HI", "HCl > HBr > HI > HF", "HBr > HI > HCl > HF"],
    explanation:
      "Going down the group the anion gets larger and more stable. Size beats electronegativity within a group, so HI is the strongest and HF the weakest.",
  },
  {
    prompt: "Which is the stronger acid, H₂O or H₂S, and why?",
    options: [
      "H₂S, because HS⁻ is larger and holds the charge more stably",
      "H₂O, because oxygen is more electronegative than sulfur",
      "H₂O, because HO⁻ is smaller and concentrates the charge",
      "H₂S, because sulfur is more electronegative than oxygen",
    ],
    explanation:
      "O and S are in the same group, so size decides. HS⁻ is the more stable base, which makes H₂S (pKa about 7) much more acidic than H₂O (pKa 15.7).",
  },
  {
    prompt: "Which is the stronger acid, HCl or H₂S, and why?",
    options: [
      "HCl, because Cl is more electronegative than S and they are similar in size",
      "H₂S, because it has two acidic hydrogens to lose",
      "H₂S, because S is larger than Cl",
      "HCl, because Cl⁻ has resonance stabilization and HS⁻ does not",
    ],
    explanation:
      "Cl and S are neighbors in the same row, so electronegativity decides. Cl⁻ is the more stable base, so HCl (pKa about −7) is stronger than H₂S (pKa about 7).",
  },
  {
    prompt: "What does the acronym ARIO list?",
    options: [
      "The factors that stabilize a conjugate base: atom, resonance, induction, orbital",
      "The steps of an acid-base reaction: acid, reaction, intermediate, outcome",
      "The kinds of curved arrow: attack, rearrange, ionize, open",
      "The types of acid: Arrhenius, reactive, inorganic, organic",
    ],
    explanation:
      "ARIO is a checklist for comparing acids by their conjugate bases, usually applied in this order: which Atom carries the charge, Resonance, Induction, and the Orbital holding the charge.",
  },
  {
    prompt: "To compare two acids that have similar structures, what should you look at first?",
    options: [
      "The stability of each conjugate base",
      "The number of hydrogens on each acid",
      "The molar mass of each acid",
      "The boiling point of each acid",
    ],
    explanation:
      "Acid strength tracks conjugate base stability. The more stable the base left behind after losing H⁺, the stronger the acid.",
  },
  {
    prompt: "Why is acetic acid (pKa 4.8) so much more acidic than ethanol (pKa 16)?",
    visuals: [mol("CC(=O)O", "acetic acid"), mol("CCO", "ethanol")],
    options: [
      "Acetate shares its charge across two oxygens through resonance",
      "Acetic acid has a larger central atom holding the proton",
      "Ethanol's oxygen is less electronegative than acetic acid's",
      "Ethoxide spreads its charge over its carbon chain by resonance",
    ],
    explanation:
      "Both lose H⁺ from oxygen, so the atom is the same. Acetate delocalizes the charge equally over two oxygens, while ethoxide's charge stays on one oxygen.",
  },
  {
    prompt: "Why is phenol (pKa 10) more acidic than cyclohexanol (pKa 16)?",
    visuals: [mol("Oc1ccccc1", "phenol"), mol("OC1CCCCC1", "cyclohexanol")],
    options: [
      "Phenoxide's charge is delocalized into the aromatic ring",
      "Cyclohexanol's oxygen carries a larger partial positive charge",
      "Phenol's oxygen is larger than the oxygen in cyclohexanol",
      "The cyclohexane ring withdraws electrons by resonance",
    ],
    explanation:
      "The negative charge on phenoxide is shared with three ring carbons by resonance. Cyclohexoxide has no π system, so its charge stays on oxygen.",
  },
  {
    prompt: "Why is acetic acid (pKa 4.8) more acidic than phenol (pKa 10), when both conjugate bases have resonance?",
    options: [
      "Acetate's resonance forms all place the charge on oxygen, while three of phenoxide's place it on carbon",
      "Phenoxide has fewer resonance forms because the ring blocks delocalization completely",
      "Acetic acid has more hydrogens available to lose than phenol does",
      "The ring in phenol donates a proton back to the oxygen after deprotonation",
    ],
    explanation:
      "Counting resonance forms isn't enough. Acetate's two forms both place the charge on electronegative oxygen, whereas three of phenoxide's forms place it on less electronegative carbon.",
  },
  {
    prompt: "Why is chloroacetic acid (pKa 2.9) stronger than acetic acid (pKa 4.8)?",
    visuals: [mol("OC(=O)CCl", "chloroacetic acid"), mol("CC(=O)O", "acetic acid")],
    options: [
      "Chlorine pulls electron density through the sigma bonds and stabilizes the anion",
      "Chlorine adds another resonance form that places charge on chlorine",
      "Chlorine donates its lone pairs into the carboxylate oxygens",
      "Chlorine makes the O–H bond shorter and stronger than before",
    ],
    explanation:
      "This is induction: the electronegative Cl withdraws electron density through σ bonds, which disperses the carboxylate's negative charge.",
  },
  {
    keepOrder: true,
    prompt: "Rank these from most acidic to least acidic.",
    visuals: [mol("OC(=O)C(Cl)(Cl)Cl", "I"), mol("OC(=O)C(Cl)Cl", "II"), mol("OC(=O)CCl", "III"), mol("CC(=O)O", "IV")],
    options: ["I > II > III > IV", "IV > III > II > I", "III > II > I > IV", "I > III > II > IV"],
    explanation:
      "Each added chlorine withdraws more electron density by induction. The pKa values are about 0.7, 1.3, 2.9 and 4.8.",
  },
  {
    prompt: "Which is the stronger acid?",
    options: [
      { text: "Fluoroacetic acid (FCH₂COOH)" },
      { text: "Chloroacetic acid (ClCH₂COOH)" },
      { text: "Bromoacetic acid (BrCH₂COOH)" },
      { text: "Iodoacetic acid (ICH₂COOH)" },
    ],
    explanation:
      "The halogen isn't carrying the charge here, so size doesn't apply. It only acts through induction, which follows electronegativity, and fluorine is the strongest withdrawer.",
  },
  {
    prompt: "Which of these chlorobutanoic acids is the most acidic?",
    options: [
      molOption("CCC(Cl)C(=O)O", "2-chlorobutanoic acid"),
      molOption("CC(Cl)CC(=O)O", "3-chlorobutanoic acid"),
      molOption("ClCCCC(=O)O", "4-chlorobutanoic acid"),
      molOption("CCCC(=O)O", "butanoic acid"),
    ],
    explanation:
      "Induction weakens quickly with distance through σ bonds. The closer the chlorine is to the carboxyl group, the more it stabilizes the anion, so the 2-chloro acid is strongest.",
  },
  {
    keepOrder: true,
    prompt: "Rank these C–H acids from most acidic to least acidic.",
    options: [
      "HC≡CH > H₂C=CH₂ > H₃C–CH₃",
      "H₃C–CH₃ > H₂C=CH₂ > HC≡CH",
      "H₂C=CH₂ > HC≡CH > H₃C–CH₃",
      "HC≡CH > H₃C–CH₃ > H₂C=CH₂",
    ],
    explanation:
      "The charge sits in an sp, sp² or sp³ orbital. More s character holds electrons closer to the nucleus, so sp is best. The pKa values are about 25, 44 and 50.",
  },
  {
    prompt: "Why is the anion of a terminal alkyne more stable than the anion of an alkane?",
    options: [
      "Its lone pair is in an sp orbital with 50% s character, close to the nucleus",
      "Its lone pair is delocalized across the triple bond by resonance",
      "Its carbon is larger than an sp³ carbon and spreads the charge farther",
      "Its triple bond donates electron density into the lone pair orbital",
    ],
    explanation:
      "s orbitals sit closer to the nucleus than p orbitals. An sp orbital is 50% s, sp² is 33% and sp³ is 25%. The acetylide lone pair is perpendicular to the π bonds, so resonance isn't involved.",
  },
  {
    prompt: "Which is the stronger acid: ethanol, or 2,2,2-trifluoroethanol?",
    visuals: [mol("CCO", "ethanol"), mol("OCC(F)(F)F", "2,2,2-trifluoroethanol")],
    options: [
      "2,2,2-Trifluoroethanol, because the three fluorines withdraw electrons by induction",
      "Ethanol, because the methyl group stabilizes the alkoxide oxygen",
      "2,2,2-Trifluoroethanol, because fluorine creates new resonance forms",
      "Ethanol, because fluorine atoms donate electrons to the oxygen",
    ],
    explanation:
      "The CF₃ group pulls electron density away from the oxygen and stabilizes the alkoxide. Trifluoroethanol's pKa is about 12.4, compared with 16 for ethanol.",
  },
  {
    prompt: "Which is the stronger acid: ethanol (CH₃CH₂OH) or ethanethiol (CH₃CH₂SH)?",
    options: [
      "Ethanethiol, because sulfur is larger than oxygen",
      "Ethanol, because oxygen is more electronegative than sulfur",
      "Ethanethiol, because sulfur is more electronegative than oxygen",
      "Ethanol, because its conjugate base is smaller",
    ],
    explanation:
      "O and S are in the same group, so size wins. The thiolate is more stable, giving ethanethiol a pKa near 10.6, compared with 16 for ethanol.",
  },
  {
    prompt: "Why is an amide N–H (pKa about 17) more acidic than an amine N–H (pKa about 38)?",
    visuals: [mol("CC(N)=O", "acetamide"), mol("CCN", "ethylamine")],
    options: [
      "The amide anion delocalizes its charge onto the carbonyl oxygen",
      "The amine nitrogen is more electronegative than the amide nitrogen",
      "The amide nitrogen is larger because it is bonded to a carbonyl",
      "The ethyl group of the amine withdraws electrons by resonance",
    ],
    explanation:
      "Both acids lose a proton from nitrogen, so the atom is the same. The amide's conjugate base has resonance that places charge on oxygen, which is a large stabilization.",
  },
  {
    prompt: "Why are the C–H bonds next to a carbonyl (pKa about 19) so much more acidic than those in an alkane (pKa about 50)?",
    visuals: [mol("CC(C)=O", "acetone")],
    options: [
      "The anion is an enolate, with resonance that places charge on oxygen",
      "The carbonyl carbon donates electrons to the neighboring carbon",
      "Alpha carbons are sp hybridized and hold the lone pair closely",
      "The oxygen atom hydrogen bonds to the alpha hydrogens",
    ],
    explanation:
      "Removing an alpha H gives an enolate. Its resonance form with the charge on oxygen makes it far more stable than an alkyl anion.",
  },
  {
    prompt: "Which C–H hydrogens are most acidic in pentane-2,4-dione?",
    visuals: [mol("CC(=O)CC(C)=O", "pentane-2,4-dione")],
    options: [
      "The CH₂ between the two carbonyls",
      "The CH₃ groups at the ends",
      "All of the C–H bonds are equally acidic",
      "None of the C–H bonds can be removed by a base",
    ],
    explanation:
      "The central carbanion is stabilized by both carbonyls, so its charge spreads onto two oxygens. That drops the pKa to about 9, compared with about 19 for a simple ketone.",
  },
  {
    prompt: "Which hydrogen is most acidic in 4-hydroxybutanoic acid?",
    visuals: [mol("OCCCC(=O)O", "4-hydroxybutanoic acid")],
    options: [
      "The O–H of the carboxylic acid",
      "The O–H of the alcohol",
      "The C–H next to the carbonyl",
      "The C–H next to the alcohol",
    ],
    explanation:
      "The carboxylic acid's conjugate base has resonance over two oxygens (pKa about 4 to 5). The alcohol's pKa is about 16, and the C–H bonds are far less acidic.",
  },
  {
    prompt: "Which positively charged acid is the strongest?",
    options: ["CH₃OH₂⁺", "CH₃NH₃⁺", "NH₄⁺", "(CH₃)₃NH⁺"],
    explanation:
      "Oxygen is more electronegative than nitrogen and holds a positive charge poorly, so it gives up the proton readily. Protonated methanol has a pKa near −2, while alkylammonium ions are near 10.",
  },
  {
    prompt: "Why is pyridinium (pKa about 5) a stronger acid than an alkylammonium ion such as CH₃NH₃⁺ (pKa about 10.6)?",
    options: [
      "Pyridine's nitrogen lone pair is in an sp² orbital, making pyridine the weaker base",
      "Pyridinium's positive charge is delocalized around the ring by resonance",
      "Pyridine's nitrogen is larger than the nitrogen in methylamine",
      "The methyl group in methylammonium withdraws electrons by induction",
    ],
    explanation:
      "The lone pair in pyridine sits in an sp² orbital and is held more tightly than an sp³ lone pair. Pyridine is therefore a weaker base, so its conjugate acid is stronger.",
  },
  {
    prompt: "Why is anilinium (pKa about 4.6) a much stronger acid than cyclohexylammonium (pKa about 10.6)?",
    visuals: [mol("[NH3+]c1ccccc1", "anilinium"), mol("[NH3+]C1CCCCC1", "cyclohexylammonium")],
    options: [
      "Losing H⁺ gives aniline, whose nitrogen lone pair is stabilized by the ring",
      "Anilinium's positive charge is delocalized around the ring by resonance",
      "The cyclohexane ring is a strong electron-withdrawing group",
      "Anilinium's nitrogen has a larger atomic radius than an alkyl nitrogen",
    ],
    explanation:
      "In aniline the lone pair delocalizes into the ring. That stabilization is lost if nitrogen is protonated, so aniline is a weak base and anilinium is a relatively strong acid. In anilinium itself, the N has no lone pair to share.",
  },
  {
    prompt: "A substance has a pKa of −2 and another has a pKa of 3. How much stronger is the first acid?",
    options: ["100,000 times", "5 times", "500 times", "1 million times"],
    explanation:
      "pKa is a log scale, so each unit is a factor of 10. A difference of 5 units is a factor of 10⁵.",
  },
  {
    prompt: "A stronger acid has which of these?",
    options: [
      "A lower pKa and a more stable conjugate base",
      "A higher pKa and a more stable conjugate base",
      "A lower pKa and a less stable conjugate base",
      "A higher pKa and a less stable conjugate base",
    ],
    explanation:
      "pKa = −log Ka, so a stronger acid has a larger Ka and a lower pKa. Stronger acids leave behind weaker, more stable conjugate bases.",
  },
  {
    prompt: "Which is the most stable conjugate base?",
    options: ["I⁻", "Br⁻", "Cl⁻", "F⁻"],
    explanation:
      "Iodide is the largest and spreads the charge over the most volume. It is the weakest base of the four because HI is the strongest acid.",
  },
  {
    prompt: "Which is the strongest base?",
    options: ["CH₃⁻", "NH₂⁻", "HO⁻", "F⁻"],
    explanation:
      "Carbon is the least electronegative atom in this row, so it holds a negative charge worst. Methyl anion's conjugate acid, methane, is also the weakest acid here.",
  },
  {
    prompt: "Which is the stronger acid: formic acid (HCOOH) or acetic acid (CH₃COOH)?",
    options: [
      "Formic acid, because acetic acid's methyl group is weakly electron-donating",
      "Acetic acid, because its methyl group is electron-withdrawing",
      "Formic acid, because its conjugate base has more resonance forms",
      "Acetic acid, because it has more hydrogens available to lose",
    ],
    explanation:
      "Alkyl groups are weakly electron-donating, which slightly destabilizes the carboxylate. Formic acid's pKa is 3.75 and acetic acid's is 4.76.",
  },
  {
    prompt: "How does a nitro group at the para position change the acidity of phenol?",
    visuals: [mol("Oc1ccc(cc1)[N+](=O)[O-]", "4-nitrophenol")],
    options: [
      "It increases acidity, because the charge can delocalize onto the nitro oxygens",
      "It decreases acidity, because the nitro group donates electrons into the ring",
      "It has no effect, because the nitro group is too far from the oxygen",
      "It decreases acidity, because the molecule becomes larger and less polar",
    ],
    explanation:
      "The nitro group withdraws electrons by resonance and induction and gives the anion extra resonance forms. 4-Nitrophenol has a pKa near 7, compared with 10 for phenol.",
  },
  {
    prompt: "Which is the stronger acid: H₃O⁺ or H₂O?",
    options: [
      "H₃O⁺, because losing a proton removes an unfavorable positive charge",
      "H₂O, because it is neutral and more stable than the cation",
      "H₂O, because it has more lone pairs available for bonding",
      "They are equal, because each contains only oxygen and hydrogen",
    ],
    explanation:
      "Adding positive charge makes a species more acidic. H₃O⁺ has a pKa of about −1.7, while H₂O's is 15.7.",
  },
  {
    prompt: "Why is tert-butanol (pKa 18) a weaker acid than ethanol (pKa 16) in solution?",
    visuals: [mol("CC(C)(C)O", "tert-butanol"), mol("CCO", "ethanol")],
    options: [
      "Its bulky alkoxide is less well stabilized by surrounding solvent molecules",
      "Its alkoxide has fewer resonance forms than ethoxide does",
      "Its oxygen is less electronegative than the oxygen in ethanol",
      "Its carbon bonded to oxygen is sp² hybridized",
    ],
    explanation:
      "The three methyl groups crowd the oxygen, so solvent can't surround and stabilize the charge as well.",
  },
  {
    prompt: "Which compound would be the most acidic?",
    options: [
      molOption("OC(=O)C(F)(F)F", "trifluoroacetic acid"),
      molOption("CC(=O)O", "acetic acid"),
      molOption("Oc1ccccc1", "phenol"),
      molOption("CCO", "ethanol"),
    ],
    explanation:
      "Trifluoroacetic acid combines carboxylate resonance with strong induction from three fluorines, giving a pKa near 0. Acetic acid is about 4.8, phenol about 10, and ethanol about 16.",
  },
  {
    prompt: "An acid's O–H proton is removed. When comparing HO–CH₂CH₃ and HO–CH=CH₂, which factor makes the second more acidic?",
    options: [
      "Resonance: the enolate's charge can spread onto carbon",
      "Atom: its oxygen is larger than the oxygen in ethanol",
      "Orbital: its oxygen lone pair is in an sp orbital",
      "Induction: its vinyl group is more electron-donating than ethyl",
    ],
    explanation:
      "HO–CH=CH₂ is an enol. Removing its proton gives an enolate, whose charge is delocalized between oxygen and carbon, so it is more acidic than a normal alcohol.",
  },
]);
