import { capped, fmt, make, signed } from "./util";

const H_VALUES = [-300, -220, -180, -150, -120, -90, -60, -40, -25, 25, 40, 60, 90, 120, 150, 180, 220, 300];
const S_VALUES = [-400, -320, -250, -180, -120, -80, 80, 120, 180, 250, 320, 400];
const TEMPS = [273, 298, 323, 350, 400, 450, 500, 600];

const combos = H_VALUES.flatMap((H) => S_VALUES.flatMap((S) => TEMPS.map((T) => ({ H, S, T })))).filter(
  ({ H, S, T }) => Math.abs(H - (T * S) / 1000) >= 1,
);

const compute = ({ H, S, T }: { H: number; S: number; T: number }) => H - (T * S) / 1000;
const given = ({ H, S, T }: { H: number; S: number; T: number }) =>
  `ΔH = ${signed(H, 0)} kJ/mol, ΔS = ${signed(S, 0)} J/(mol·K), T = ${T} K`;
const work = (c: { H: number; S: number; T: number }) =>
  `ΔG = ΔH − TΔS = ${fmt(c.H, 0)} − (${c.T})(${fmt(c.S / 1000, 3)}) = ${signed(compute(c))} kJ/mol`;

const SUBSTANCES = [
  { name: "water", mp: 0, bp: 100 },
  { name: "ethanol", mp: -114, bp: 78 },
  { name: "benzene", mp: 5.5, bp: 80 },
  { name: "acetone", mp: -95, bp: 56 },
  { name: "methanol", mp: -98, bp: 65 },
  { name: "cyclohexane", mp: 6.5, bp: 81 },
  { name: "acetic acid", mp: 16.6, bp: 118 },
  { name: "hexane", mp: -95, bp: 69 },
  { name: "toluene", mp: -95, bp: 111 },
];

type Change = {
  verb: string;
  atPoint: "mp" | "bp";
  /** Spontaneous above the phase-change temperature (ΔH and ΔS positive) or below it (both negative). */
  above: boolean;
};
const CHANGES: Change[] = [
  { verb: "melting", atPoint: "mp", above: true },
  { verb: "freezing", atPoint: "mp", above: false },
  { verb: "boiling", atPoint: "bp", above: true },
  { verb: "condensing", atPoint: "bp", above: false },
];

const SIGN_RULES = [
  { H: "negative", S: "positive", ans: "At all temperatures", why: "Both terms in ΔH − TΔS make ΔG negative." },
  { H: "positive", S: "negative", ans: "At no temperature", why: "Both terms in ΔH − TΔS make ΔG positive." },
  { H: "positive", S: "positive", ans: "Only at high temperature", why: "TΔS must grow large enough to outweigh the positive ΔH." },
  { H: "negative", S: "negative", ans: "Only at low temperature", why: "ΔH wins only while the unfavorable −TΔS stays small." },
];
const ANSWERS = SIGN_RULES.map((r) => r.ans);

export function spontaneityQuestions() {
  const value = capped(combos, 180, "spontaneity:dg").map((c) => {
    const dG = compute(c);
    const options = [dG, c.H + (c.T * c.S) / 1000, c.H - c.T * c.S, -dG].map((v) => `${signed(v)} kJ/mol`);
    return make("spontaneity", "spontaneity:dg", {
      key: `${c.H}:${c.S}:${c.T}`,
      prompt: `What is ΔG?\n${given(c)}`,
      options: [...new Set(options)],
      explanation: `Convert ΔS to kJ first: ${signed(c.S, 0)} J is ${signed(c.S / 1000, 3)} kJ. Then ${work(c)}.`,
    });
  });

  const verdict = capped(combos, 180, "spontaneity:verdict").map((c) => {
    const dG = compute(c);
    const yes = dG < 0;
    return make("spontaneity", "spontaneity:verdict", {
      key: `${c.H}:${c.S}:${c.T}`,
      prompt: `Is this reaction spontaneous?\n${given(c)}`,
      options: yes
        ? ["Yes, because ΔG is negative", "No, because ΔG is positive", "Yes, because ΔG is positive", "No, because ΔG is negative"]
        : ["No, because ΔG is positive", "Yes, because ΔG is negative", "Yes, because ΔG is positive", "No, because ΔG is negative"],
      explanation: `${work(c)}. ${yes ? "A negative ΔG is spontaneous." : "A positive ΔG is nonspontaneous."}`,
    });
  });

  const rules = H_VALUES.flatMap((H) =>
    S_VALUES.map((S) => {
      const rule = SIGN_RULES.find((r) => (r.H === "negative") === H < 0 && (r.S === "negative") === S < 0)!;
      return make("spontaneity", "spontaneity:rule", {
        key: `${H}:${S}`,
        prompt: `A reaction has ΔH = ${signed(H, 0)} kJ/mol and ΔS = ${signed(S, 0)} J/(mol·K). When is it spontaneous?`,
        options: [rule.ans, ...ANSWERS.filter((a) => a !== rule.ans)],
        explanation: `ΔH is ${rule.H} and ΔS is ${rule.S}. ${rule.why}`,
      });
    }),
  );

  const crossover = capped(
    H_VALUES.flatMap((H) => S_VALUES.filter((S) => H * S > 0).map((S) => ({ H, S }))),
    90,
    "spontaneity:crossover",
  ).map(({ H, S }) => {
    const T = (H / S) * 1000;
    const above = H > 0;
    const direction = above ? "above" : "below";
    const other = above ? "below" : "above";
    return make("spontaneity", "spontaneity:crossover", {
      key: `${H}:${S}`,
      prompt: `A reaction has ΔH = ${signed(H, 0)} kJ/mol and ΔS = ${signed(S, 0)} J/(mol·K). When is it spontaneous?`,
      options: [
        `${direction} ${fmt(T, 0)} K`,
        `${other} ${fmt(T, 0)} K`,
        `${direction} ${fmt(H / S, 2)} K`,
        `${other} ${fmt(H / S, 2)} K`,
      ].map((s) => s[0].toUpperCase() + s.slice(1)),
      explanation: `ΔG changes sign where ΔH = TΔS, so T = ΔH / ΔS = ${fmt(H * 1000, 0)} J/mol ÷ ${fmt(S, 0)} J/(mol·K) = ${fmt(T, 0)} K. ${above ? "With ΔH and ΔS both positive, it is spontaneous at higher temperatures." : "With ΔH and ΔS both negative, it is spontaneous at lower temperatures."}`,
    });
  });

  const phase = SUBSTANCES.flatMap((sub) =>
    CHANGES.flatMap((change) => {
      const point = sub[change.atPoint];
      return [-40, -15, 15, 40].map((offset) => {
        const T = Math.round(point + offset);
        const yes = T > point === change.above;
        const label = change.atPoint === "mp" ? "melting point" : "boiling point";
        return make("spontaneity", "spontaneity:phase", {
          key: `${sub.name}:${change.verb}:${offset}`,
          prompt: `The ${label} of ${sub.name} is ${fmt(point)} °C at 1 atm. Is ${sub.name} ${change.verb} spontaneous at ${fmt(T, 0)} °C and 1 atm?`,
          options: yes
            ? [
                `Yes, because ΔG is negative at this temperature`,
                `No, because ΔG is positive at this temperature`,
                `No, because ΔG is zero at every temperature`,
              ]
            : [
                `No, because ΔG is positive at this temperature`,
                `Yes, because ΔG is negative at this temperature`,
                `Yes, because ΔG is zero at every temperature`,
              ],
          explanation: `${change.verb[0].toUpperCase() + change.verb.slice(1)} has ΔH and ΔS both ${change.above ? "positive" : "negative"}, so it is spontaneous only ${change.above ? "above" : "below"} the ${label}. ${fmt(T, 0)} °C is ${T > point ? "above" : "below"} ${fmt(point)} °C.`,
        });
      });
    }),
  );

  const keqs = [-8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8, 10, 12].map((log) => {
    const dG = -5.7 * log;
    const K = `10${log < 0 ? "⁻" : ""}${String(Math.abs(log)).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join("")}`;
    return make("spontaneity", "spontaneity:keq", {
      key: `${log}`,
      prompt: `A reaction has Keq = ${K} at 298 K. What is ΔG°? (At 298 K, ΔG° ≈ −5.7 × log Keq in kJ/mol.)`,
      options: [dG, -dG, log * 2.3, -log * 2.3].map((v) => `${signed(v)} kJ/mol`),
      explanation: `log Keq = ${fmt(log, 0)}, so ΔG° ≈ −5.7 × (${fmt(log, 0)}) = ${signed(dG)} kJ/mol. ${log > 0 ? "Keq above 1 means ΔG° is negative." : "Keq below 1 means ΔG° is positive."}`,
    });
  });

  return [...value, ...verdict, ...rules, ...crossover, ...phase, ...keqs];
}
