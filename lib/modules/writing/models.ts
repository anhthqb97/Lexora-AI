import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import type { WritingSubmission } from "./types";

const WritingSubmissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    promptId: { type: String, required: true },
    content: { type: String, required: true },
    wordCount: { type: Number, required: true },
    scores: {
      grammar: { type: Number, required: true },
      clarity: { type: Number, required: true },
      vocabulary: { type: Number, required: true },
      overall: { type: Number, required: true },
    },
    corrections: [
      {
        original: String,
        corrected: String,
        reason: String,
      },
    ],
    explainWhy: { type: String, required: true },
  },
  { timestamps: true },
);

WritingSubmissionSchema.index({ userId: 1, createdAt: -1 });

type Doc = InferSchemaType<typeof WritingSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
};

export const WritingSubmissionModel =
  models.WritingSubmission ?? model("WritingSubmission", WritingSubmissionSchema);

export function toSubmissionDTO(doc: Doc): WritingSubmission {
  const scores = doc.scores ?? {
    grammar: 0,
    clarity: 0,
    vocabulary: 0,
    overall: 0,
  };
  const corrections = (doc.corrections ?? []).map((c) => ({
    original: c.original ?? "",
    corrected: c.corrected ?? "",
    reason: c.reason ?? "",
  }));
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    promptId: doc.promptId,
    content: doc.content,
    wordCount: doc.wordCount,
    scores,
    corrections,
    explainWhy: doc.explainWhy,
    createdAt: doc.createdAt,
  };
}
