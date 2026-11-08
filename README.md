# CHM 2410 Exam 3 practice

A quiz app built from `CHM2410 Practice Exam 3 FA 25.pdf`. Every question has an explanation, and questions don't repeat until you've answered them all. Progress is saved in the browser.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `lib/quiz/content/`: hand-written questions, including the exam's own. Append new ones to the end of a list so existing ids stay stable.
- `lib/quiz/generators/`: questions computed from data tables of pKa values, bond energies and phase-change temperatures. Ids and content are seeded, so they're the same on every visit.
- `lib/quiz/deck.ts`: picks a session's questions and prevents repeats.
- `components/`: the interface, including the structure, energy diagram and curved-arrow drawings.

## Checks

```bash
npm test
```

The tests check the whole bank: unique ids, valid answers, distinct options, parsable structures, and that each drawn conjugate acid or base differs from its parent by exactly one H⁺.
