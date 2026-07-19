import mongoose from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import {
  DIAGNOSTIC_DURATION_MINUTES,
  MOCK_DURATION_MINUTES,
  MOCK_FORM_ID,
  type AttemptType,
} from "./constants";
import {
  getQuestionsForAttempt,
  selectDiagnosticQuestionIds,
  selectMockQuestionIds,
} from "./content";
import { buildReport, gradeAnswer } from "./evaluation";
import {
  assertCanStartDiagnostic,
  assertCanStartMock,
  getLimitStatus,
  ToeicLimitError,
} from "./limits";
import { ToeicAttemptModel, toAttemptDTO, toPublicQuestionDTO } from "./models";
import type {
  FinishAttemptInput,
  StartAttemptInput,
  SubmitAnswerInput,
  ToeicAttempt,
  ToeicQuestion,
  ToeicReport,
} from "./types";

export class ToeicError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function getLimits(userId: string) {
  return getLimitStatus(userId);
}

export async function listAttempts(userId: string, type?: AttemptType): Promise<ToeicAttempt[]> {
  await connectDatabase();
  const filter: Record<string, unknown> = {
    userId: new mongoose.Types.ObjectId(userId),
  };
  if (type) filter.type = type;

  const docs = await ToeicAttemptModel.find(filter).sort({ createdAt: -1 }).limit(20);
  return docs.map(toAttemptDTO);
}

export async function getAttempt(userId: string, attemptId: string): Promise<ToeicAttempt> {
  await connectDatabase();
  const doc = await ToeicAttemptModel.findOne({
    _id: new mongoose.Types.ObjectId(attemptId),
    userId: new mongoose.Types.ObjectId(userId),
  });
  if (!doc) throw new ToeicError("NOT_FOUND", "Attempt not found");
  return toAttemptDTO(doc);
}

export async function startAttempt(
  userId: string,
  input: StartAttemptInput,
): Promise<{
  attempt: ToeicAttempt;
  questions: Omit<ToeicQuestion, "correctChoiceId" | "explanation">[];
}> {
  await connectDatabase();

  if (input.type === "diagnostic") {
    await assertCanStartDiagnostic(userId);
  } else {
    await assertCanStartMock(userId);
  }

  const questionIds =
    input.type === "diagnostic"
      ? await selectDiagnosticQuestionIds()
      : await selectMockQuestionIds();

  const durationMinutes =
    input.type === "diagnostic" ? DIAGNOSTIC_DURATION_MINUTES : MOCK_DURATION_MINUTES;
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + durationMinutes * 60_000);

  const doc = await ToeicAttemptModel.create({
    userId: new mongoose.Types.ObjectId(userId),
    type: input.type,
    status: "in_progress",
    formId: input.type === "mock" ? MOCK_FORM_ID : undefined,
    questionIds,
    answers: [],
    startedAt,
    expiresAt,
  });

  const questions = await getQuestionsForAttempt(questionIds);
  return {
    attempt: toAttemptDTO(doc),
    questions: questions.map(toPublicQuestionDTO),
  };
}

export async function submitAnswer(
  userId: string,
  attemptId: string,
  input: SubmitAnswerInput,
): Promise<ToeicAttempt> {
  await connectDatabase();
  const doc = await ToeicAttemptModel.findOne({
    _id: new mongoose.Types.ObjectId(attemptId),
    userId: new mongoose.Types.ObjectId(userId),
    status: "in_progress",
  });
  if (!doc) throw new ToeicError("NOT_FOUND", "Attempt not found or already completed");

  if (!doc.questionIds.includes(input.questionId)) {
    throw new ToeicError("INVALID_INPUT", "Question not part of this attempt");
  }

  const questions = await getQuestionsForAttempt(doc.questionIds);
  const question = questions.find((q) => q.id === input.questionId);
  if (!question) throw new ToeicError("NOT_FOUND", "Question not found");

  const graded = gradeAnswer(question, input.choiceId);
  const existing = doc.answers.filter((a) => a.questionId !== input.questionId);
  existing.push(graded);
  doc.answers = existing;
  await doc.save();

  return toAttemptDTO(doc);
}

export async function finishAttempt(
  userId: string,
  input: FinishAttemptInput,
): Promise<{ attempt: ToeicAttempt; report: ToeicReport }> {
  await connectDatabase();
  const doc = await ToeicAttemptModel.findOne({
    _id: new mongoose.Types.ObjectId(input.attemptId),
    userId: new mongoose.Types.ObjectId(userId),
    status: "in_progress",
  });
  if (!doc) throw new ToeicError("NOT_FOUND", "Attempt not found or already completed");

  const questions = await getQuestionsForAttempt(doc.questionIds);
  const answers = doc.answers.map((a) => ({
    questionId: a.questionId ?? "",
    choiceId: a.choiceId ?? "",
    isCorrect: a.isCorrect ?? false,
    explainWhy: a.explainWhy ?? undefined,
  }));

  const report = await buildReport(
    doc._id.toString(),
    doc.type as AttemptType,
    questions,
    answers,
    new Date(),
  );

  doc.status = "completed";
  doc.completedAt = new Date();
  doc.sectionScores = report.sectionScores;
  doc.totalScore = report.totalScore;
  doc.weakAreas = report.weakAreas;
  doc.answers = report.wrongAnswers.length
    ? [
        ...answers.filter((a) => a.isCorrect),
        ...report.wrongAnswers.map((w) => ({
          questionId: w.questionId,
          choiceId: w.userChoiceId,
          isCorrect: false,
          explainWhy: w.explainWhy,
        })),
      ]
    : answers;
  await doc.save();

  return { attempt: toAttemptDTO(doc), report };
}

export async function getReport(userId: string, attemptId: string): Promise<ToeicReport> {
  const attempt = await getAttempt(userId, attemptId);
  if (attempt.status !== "completed") {
    throw new ToeicError("NOT_READY", "Attempt not completed yet");
  }

  const questions = await getQuestionsForAttempt(attempt.questionIds);
  return buildReport(attempt.id, attempt.type, questions, attempt.answers, attempt.completedAt);
}

/** @deprecated use startAttempt */
export async function startMockTest(userId: string): Promise<{ id: string }> {
  const { attempt } = await startAttempt(userId, { type: "mock" });
  return { id: attempt.id };
}

export {
  getLimitStatus,
  getMonthlyMockCount,
  hasCompletedDiagnostic,
  ToeicLimitError,
} from "./limits";

export { getSampleQuestions, expandQuestionsToCount, countQuestionsInDb } from "./content";

export {
  computeSectionScores,
  computeTotalScore,
  gradeAnswer,
  identifyWeakAreas,
} from "./evaluation";
