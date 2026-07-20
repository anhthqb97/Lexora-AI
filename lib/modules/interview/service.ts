import { chatCompletionOrStub } from "@/lib/ai/client";
import { connectDatabase } from "@/lib/db/mongoose";
import { DEFAULT_QUESTIONS_PER_SESSION } from "./constants";
import { getQuestions, loadQuestionBank } from "./content";
import { InterviewSessionModel, toInterviewSessionDTO } from "./models";
import type { InterviewQuestion } from "./types";

export class InterviewError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function startInterview(userId: string, industry: string) {
  await connectDatabase();
  const bank = getQuestions(industry, DEFAULT_QUESTIONS_PER_SESSION);
  if (!bank.length) throw new InterviewError("INVALID_INDUSTRY", "Unknown industry");

  const doc = await InterviewSessionModel.create({
    userId,
    industry,
    totalQuestions: bank.length,
    questionIds: bank.map((q) => q.id),
    currentIndex: 0,
    status: "in_progress",
  });

  return { session: toInterviewSessionDTO(doc) };
}

export async function getInterviewSession(userId: string, sessionId: string) {
  await connectDatabase();
  const doc = await InterviewSessionModel.findOne({ _id: sessionId, userId });
  if (!doc) throw new InterviewError("NOT_FOUND", "Session not found");
  return toInterviewSessionDTO(doc);
}

function getQuestionByIndex(
  industry: string,
  questionIds: string[],
  index: number,
): InterviewQuestion | null {
  const bank = loadQuestionBank(industry);
  const id = questionIds[index];
  return bank.find((q) => q.id === id) ?? bank[index] ?? null;
}

export async function submitAnswer(userId: string, sessionId: string, transcript: string) {
  await connectDatabase();
  const doc = await InterviewSessionModel.findOne({ _id: sessionId, userId });
  if (!doc) throw new InterviewError("NOT_FOUND", "Session not found");
  if (doc.status === "completed") {
    throw new InterviewError("SESSION_COMPLETE", "Interview already completed");
  }

  const question = getQuestionByIndex(doc.industry, doc.questionIds as string[], doc.currentIndex);
  if (!question) throw new InterviewError("NO_QUESTION", "No active question");

  const result = await chatCompletionOrStub(
    [
      {
        role: "system",
        content:
          'Score interview answer 0-100 and give 2-3 sentence feedback. Respond JSON: {"score": number, "feedback": string}',
      },
      { role: "user", content: `Q: ${question.question}\nA: ${transcript}` },
    ],
    { maxTokens: 250 },
  );

  let score = 70;
  let feedback = result.content;
  try {
    const parsed = JSON.parse(result.content.match(/\{[\s\S]*\}/)?.[0] ?? "{}") as {
      score?: number;
      feedback?: string;
    };
    if (parsed.score != null) score = parsed.score;
    if (parsed.feedback) feedback = parsed.feedback;
  } catch {
    /* use raw */
  }

  doc.answers.push({
    questionId: question.id,
    transcript,
    feedback,
    score,
  });

  doc.currentIndex += 1;
  if (doc.currentIndex >= doc.totalQuestions) {
    doc.status = "completed";
    doc.completedAt = new Date();
  }
  await doc.save();

  const nextQuestion =
    doc.status === "in_progress"
      ? getQuestionByIndex(doc.industry, doc.questionIds as string[], doc.currentIndex)
      : null;

  return {
    feedback,
    score,
    completed: doc.status === "completed",
    nextQuestion,
  };
}

export { loadQuestionBank, getQuestions, listIndustries } from "./content";
