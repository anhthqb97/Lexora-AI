import { chatCompletionOrStub } from "@/lib/ai/client";
import { buildWritingEvaluationMessages, parseWritingEvaluation } from "@/lib/ai/writing-prompt";
import { connectDatabase } from "@/lib/db/mongoose";
import { getPrompt, listPrompts } from "./content";
import { toSubmissionDTO, WritingSubmissionModel } from "./models";
import type { WritingSubmission } from "./types";

export class WritingError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const FREE_WEEKLY_LIMIT = 3;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function getWeeklySubmissionCount(userId: string): Promise<number> {
  await connectDatabase();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return WritingSubmissionModel.countDocuments({ userId, createdAt: { $gte: weekAgo } });
}

export async function submitWriting(
  userId: string,
  promptId: string,
  content: string,
  tier: "free" | "paid" = "free",
): Promise<WritingSubmission> {
  await connectDatabase();
  const prompt = getPrompt(promptId);
  if (!prompt) throw new WritingError("INVALID_PROMPT", "Prompt not found");

  const wordCount = countWords(content);
  if (wordCount < prompt.minWords) {
    throw new WritingError("TOO_SHORT", `Minimum ${prompt.minWords} words required`);
  }
  if (wordCount > prompt.maxWords) {
    throw new WritingError("TOO_LONG", `Maximum ${prompt.maxWords} words allowed`);
  }

  if (tier === "free") {
    const count = await getWeeklySubmissionCount(userId);
    if (count >= FREE_WEEKLY_LIMIT) {
      throw new WritingError("LIMIT_REACHED", "Weekly free limit reached");
    }
  }

  const messages = buildWritingEvaluationMessages(content, prompt.title);
  const result = await chatCompletionOrStub(messages, { maxTokens: 800 });
  const evaluation = parseWritingEvaluation(result.content);

  const doc = await WritingSubmissionModel.create({
    userId,
    promptId,
    content,
    wordCount,
    scores: evaluation.scores,
    corrections: evaluation.corrections,
    explainWhy: evaluation.explainWhy,
  });

  return toSubmissionDTO(doc);
}

export async function listSubmissions(userId: string): Promise<WritingSubmission[]> {
  await connectDatabase();
  const docs = await WritingSubmissionModel.find({ userId }).sort({ createdAt: -1 }).limit(50);
  return docs.map(toSubmissionDTO);
}

export async function getSubmission(userId: string, id: string): Promise<WritingSubmission> {
  await connectDatabase();
  const doc = await WritingSubmissionModel.findOne({ _id: id, userId });
  if (!doc) throw new WritingError("NOT_FOUND", "Submission not found");
  return toSubmissionDTO(doc);
}

export { listPrompts, getPrompt };
