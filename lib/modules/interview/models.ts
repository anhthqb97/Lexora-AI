import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import type { InterviewSession } from "./types";

const InterviewSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    industry: { type: String, required: true },
    status: { type: String, enum: ["in_progress", "completed"], default: "in_progress" },
    currentIndex: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    questionIds: [{ type: String }],
    answers: [
      {
        questionId: String,
        transcript: String,
        feedback: String,
        score: Number,
      },
    ],
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

type Doc = InferSchemaType<typeof InterviewSessionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const InterviewSessionModel =
  models.InterviewSession ?? model("InterviewSession", InterviewSessionSchema);

export function toInterviewSessionDTO(doc: Doc): InterviewSession {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    industry: doc.industry as InterviewSession["industry"],
    status: doc.status as InterviewSession["status"],
    currentIndex: doc.currentIndex,
    totalQuestions: doc.totalQuestions,
    startedAt: doc.startedAt.toISOString(),
    completedAt: doc.completedAt?.toISOString(),
  };
}
