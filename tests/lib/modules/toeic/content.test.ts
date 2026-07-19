import { describe, expect, it } from "vitest";
import { getSampleQuestions, expandQuestionsToCount } from "@/lib/modules/toeic/content";
import {
  computeSectionScores,
  computeTotalScore,
  gradeAnswer,
  identifyWeakAreas,
} from "@/lib/modules/toeic/evaluation";
import { DIAGNOSTIC_QUESTION_COUNT, MOCK_QUESTION_COUNT } from "@/lib/modules/toeic/constants";

describe("toeic content", () => {
  it("provides 55+ sample questions", () => {
    const samples = getSampleQuestions();
    expect(samples.length).toBeGreaterThanOrEqual(55);
  });

  it("expands to 500 questions", () => {
    const expanded = expandQuestionsToCount(getSampleQuestions(), MOCK_QUESTION_COUNT);
    expect(expanded).toHaveLength(MOCK_QUESTION_COUNT);
  });

  it("diagnostic subset size is 40", () => {
    expect(DIAGNOSTIC_QUESTION_COUNT).toBe(40);
  });
});

describe("toeic evaluation", () => {
  const questions = getSampleQuestions().slice(0, 4);
  const answers = questions.map((q) => gradeAnswer(q, q.correctChoiceId));

  it("grades correct answers", () => {
    expect(answers.every((a) => a.isCorrect)).toBe(true);
  });

  it("computes section scores", () => {
    const scores = computeSectionScores(questions, answers);
    expect(scores.listening).toBeGreaterThanOrEqual(5);
    expect(scores.reading).toBeGreaterThanOrEqual(5);
  });

  it("computes total score", () => {
    const scores = computeSectionScores(questions, answers);
    const total = computeTotalScore(scores);
    expect(total).toBeGreaterThanOrEqual(10);
  });

  it("identifies weak areas when mostly wrong", () => {
    const wrong = questions.map((q) => gradeAnswer(q, "WRONG"));
    const weak = identifyWeakAreas(questions, wrong);
    expect(weak.length).toBeGreaterThan(0);
  });
});
