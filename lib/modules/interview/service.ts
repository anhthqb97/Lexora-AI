import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import { chatCompletionOrStub } from "@/lib/ai/client";
import { getQuestions, type InterviewQuestion } from "./content";

const InterviewSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    industry: { type: String, required: true },
    questions: [{ id: String, question: String, followUp: String }],
    answers: [{ questionId: String, answer: String, feedback: String }],
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  { timestamps: true },
);

export const InterviewSessionModel =
  models.InterviewSession ?? model("InterviewSession", InterviewSessionSchema);

export async function startInterview(userId: string, industry: string) {
  await connectDatabase();
  const questions = getQuestions(industry);
  if (!questions.length) throw new Error("Invalid industry");
  const doc = await InterviewSessionModel.create({ userId, industry, questions });
  return { id: doc._id.toString(), industry, questions };
}

export async function submitAnswer(
  userId: string,
  sessionId: string,
  questionId: string,
  answer: string,
) {
  await connectDatabase();
  const session = await InterviewSessionModel.findOne({ _id: sessionId, userId });
  if (!session) throw new Error("Session not found");
  const q = (session.questions as InterviewQuestion[]).find((x) => x.id === questionId);
  const result = await chatCompletionOrStub(
    [
      {
        role: "system",
        content: "Give brief interview feedback: structure, vocabulary, clarity. 2-3 sentences.",
      },
      { role: "user", content: `Question: ${q?.question}\nAnswer: ${answer}` },
    ],
    { maxTokens: 200 },
  );
  session.answers.push({ questionId, answer, feedback: result.content });
  if (session.answers.length >= session.questions.length) {
    session.status = "completed";
  }
  await session.save();
  return { feedback: result.content, completed: session.status === "completed" };
}

export { getQuestions, listIndustries };
