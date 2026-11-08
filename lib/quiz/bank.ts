import { acidStrength } from "./content/acid-strength";
import { arrows } from "./content/arrows";
import { conjugate } from "./content/conjugate";
import { energyDiagrams } from "./content/energy";
import { enthalpy } from "./content/enthalpy";
import { entropy } from "./content/entropy";
import { equilibrium } from "./content/equilibrium";
import { spontaneity } from "./content/spontaneity";
import { acidQuestions } from "./generators/acid";
import { arrowQuestions } from "./generators/arrows";
import { conjugateQuestions } from "./generators/conjugate";
import { energyQuestions } from "./generators/energy";
import { enthalpyQuestions } from "./generators/enthalpy";
import { entropyQuestions } from "./generators/entropy";
import { equilibriumQuestions } from "./generators/equilibrium";
import { spontaneityQuestions } from "./generators/spontaneity";
import type { Question, TopicId } from "./types";

export const QUESTIONS: Question[] = [
  ...acidStrength,
  ...conjugate,
  ...equilibrium,
  ...energyDiagrams,
  ...enthalpy,
  ...entropy,
  ...spontaneity,
  ...arrows,
  ...acidQuestions(),
  ...conjugateQuestions(),
  ...equilibriumQuestions(),
  ...energyQuestions(),
  ...enthalpyQuestions(),
  ...entropyQuestions(),
  ...spontaneityQuestions(),
  ...arrowQuestions(),
];

export const QUESTIONS_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

export const countByTopic = (topic: TopicId) => QUESTIONS.filter((q) => q.topic === topic).length;
