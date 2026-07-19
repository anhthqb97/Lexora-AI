import { chatCompletionOrStub } from "@/lib/ai/client";
import { loadToeicTutorPrompt } from "@/lib/ai/toeic-prompt";
import {
  TOEIC_SECTION_MAX,
  TOEIC_SECTION_MIN,
  TOEIC_SCORE_MIN,
  type SkillTag,
  type ToeicSection,
} from "./constants";
import type { ToeicAnswer, ToeicQuestion, SectionScores, ToeicReport } from "./types";

export function scoreSection(correct: number, total: number): number {
  if (total === 0) return TOEIC_SECTION_MIN;
  const ratio = correct / total;
  return Math.round(TOEIC_SECTION_MIN + ratio * (TOEIC_SECTION_MAX - TOEIC_SECTION_MIN));
}

export function computeSectionScores(
  questions: ToeicQuestion[],
  answers: ToeicAnswer[],
): SectionScores {
  const bySection: Record<ToeicSection, { correct: number; total: number }> = {
    listening: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  };

  const answerMap = new Map(answers.map((a) => [a.questionId, a]));

  for (const q of questions) {
    bySection[q.section].total += 1;
    const ans = answerMap.get(q.id);
    if (ans?.isCorrect) bySection[q.section].correct += 1;
  }

  return {
    listening: scoreSection(bySection.listening.correct, bySection.listening.total),
    reading: scoreSection(bySection.reading.correct, bySection.reading.total),
  };
}

export function computeTotalScore(sectionScores: SectionScores): number {
  return Math.max(TOEIC_SCORE_MIN, sectionScores.listening + sectionScores.reading);
}

export function identifyWeakAreas(questions: ToeicQuestion[], answers: ToeicAnswer[]): SkillTag[] {
  const stats = new Map<SkillTag, { wrong: number; total: number }>();
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));

  for (const q of questions) {
    const prev = stats.get(q.skill) ?? { wrong: 0, total: 0 };
    prev.total += 1;
    const ans = answerMap.get(q.id);
    if (ans && !ans.isCorrect) prev.wrong += 1;
    stats.set(q.skill, prev);
  }

  return [...stats.entries()]
    .filter(([, s]) => s.total > 0 && s.wrong / s.total >= 0.4)
    .sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total)
    .map(([skill]) => skill);
}

export async function generateExplainWhy(
  question: ToeicQuestion,
  userChoiceId: string,
): Promise<string> {
  if (userChoiceId === question.correctChoiceId) {
    return question.explanation ?? "Correct! Well done.";
  }

  const userChoice = question.choices.find((c) => c.id === userChoiceId);
  const correctChoice = question.choices.find((c) => c.id === question.correctChoiceId);

  const systemPrompt = loadToeicTutorPrompt();
  const userPrompt = `Question: ${question.questionText}
${question.stimulus ? `Context: ${question.stimulus}` : ""}
Choices:
${question.choices.map((c) => `- ${c.id}: ${c.text}`).join("\n")}
Learner chose: ${userChoice?.text ?? userChoiceId}
Correct answer: ${correctChoice?.text ?? question.correctChoiceId}

Explain in 2-3 sentences why the correct answer is right and why the learner's choice is wrong. Use simple English with a brief Vietnamese hint if helpful.`;

  const result = await chatCompletionOrStub(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { maxTokens: 200, temperature: 0.5 },
  );

  return (
    result.content || question.explanation || "Review the grammar or context clues in the passage."
  );
}

export async function buildReport(
  attemptId: string,
  type: ToeicReport["type"],
  questions: ToeicQuestion[],
  answers: ToeicAnswer[],
  completedAt?: Date,
): Promise<ToeicReport> {
  const sectionScores = computeSectionScores(questions, answers);
  const totalScore = computeTotalScore(sectionScores);
  const weakAreas = identifyWeakAreas(questions, answers);
  const questionMap = new Map(questions.map((q) => [q.id, q]));
  const correctCount = answers.filter((a) => a.isCorrect).length;

  const wrongAnswers = await Promise.all(
    answers
      .filter((a) => !a.isCorrect)
      .map(async (a) => {
        const q = questionMap.get(a.questionId)!;
        const explainWhy = a.explainWhy ?? (await generateExplainWhy(q, a.choiceId));
        return {
          questionId: a.questionId,
          questionText: q.questionText,
          userChoiceId: a.choiceId,
          correctChoiceId: q.correctChoiceId,
          explainWhy,
        };
      }),
  );

  return {
    attemptId,
    type,
    totalScore,
    sectionScores,
    weakAreas,
    correctCount,
    totalQuestions: questions.length,
    wrongAnswers,
    completedAt,
  };
}

export function gradeAnswer(question: ToeicQuestion, choiceId: string): ToeicAnswer {
  return {
    questionId: question.id,
    choiceId,
    isCorrect: choiceId === question.correctChoiceId,
  };
}
