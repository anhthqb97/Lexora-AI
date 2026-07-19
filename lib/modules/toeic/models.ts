import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import { ATTEMPT_STATUSES, ATTEMPT_TYPES, SECTIONS, SKILL_TAGS } from "./constants";
import type { ToeicAttempt, ToeicQuestion } from "./types";

const ToeicQuestionSchema = new Schema(
  {
    questionId: { type: String, required: true, unique: true, index: true },
    section: { type: String, enum: SECTIONS, required: true },
    part: { type: Number, required: true, min: 1, max: 7 },
    skill: { type: String, enum: SKILL_TAGS, required: true },
    questionText: { type: String, required: true },
    choices: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    correctChoiceId: { type: String, required: true },
    stimulus: { type: String },
    audioUrl: { type: String },
    explanation: { type: String },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
    formIds: [{ type: String }],
  },
  { timestamps: true },
);

ToeicQuestionSchema.index({ section: 1, part: 1 });
ToeicQuestionSchema.index({ formIds: 1 });

const ToeicAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    type: { type: String, enum: ATTEMPT_TYPES, required: true },
    status: { type: String, enum: ATTEMPT_STATUSES, default: "in_progress" },
    formId: { type: String },
    questionIds: [{ type: String, required: true }],
    answers: [
      {
        questionId: String,
        choiceId: String,
        isCorrect: Boolean,
        explainWhy: String,
      },
    ],
    sectionScores: {
      listening: Number,
      reading: Number,
    },
    totalScore: { type: Number },
    weakAreas: [{ type: String }],
    startedAt: { type: Date },
    completedAt: { type: Date },
    expiresAt: { type: Date },
  },
  { timestamps: true },
);

ToeicAttemptSchema.index({ userId: 1, type: 1, createdAt: -1 });
ToeicAttemptSchema.index({ userId: 1, status: 1 });

type AttemptDoc = InferSchemaType<typeof ToeicAttemptSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

type QuestionDoc = InferSchemaType<typeof ToeicQuestionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ToeicQuestionModel =
  models.ToeicQuestion ?? model("ToeicQuestion", ToeicQuestionSchema);

export const ToeicAttemptModel = models.ToeicAttempt ?? model("ToeicAttempt", ToeicAttemptSchema);

export function toQuestionDTO(doc: QuestionDoc): ToeicQuestion {
  return {
    id: doc.questionId,
    section: doc.section as ToeicQuestion["section"],
    part: doc.part,
    skill: doc.skill as ToeicQuestion["skill"],
    questionText: doc.questionText,
    choices: doc.choices.map((c) => ({ id: c.id, text: c.text })),
    correctChoiceId: doc.correctChoiceId,
    stimulus: doc.stimulus ?? undefined,
    audioUrl: doc.audioUrl ?? undefined,
    explanation: doc.explanation ?? undefined,
    difficulty: doc.difficulty,
  };
}

export function toAttemptDTO(doc: AttemptDoc): ToeicAttempt {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    type: doc.type as ToeicAttempt["type"],
    status: doc.status as ToeicAttempt["status"],
    formId: doc.formId ?? undefined,
    questionIds: doc.questionIds,
    answers: (doc.answers ?? []).map((a) => ({
      questionId: a.questionId ?? "",
      choiceId: a.choiceId ?? "",
      isCorrect: a.isCorrect ?? false,
      explainWhy: a.explainWhy ?? undefined,
    })),
    sectionScores: doc.sectionScores
      ? {
          listening: doc.sectionScores.listening ?? 0,
          reading: doc.sectionScores.reading ?? 0,
        }
      : undefined,
    totalScore: doc.totalScore ?? undefined,
    weakAreas: doc.weakAreas ?? undefined,
    startedAt: doc.startedAt ?? undefined,
    completedAt: doc.completedAt ?? undefined,
    expiresAt: doc.expiresAt ?? undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toPublicQuestionDTO(
  q: ToeicQuestion,
): Omit<ToeicQuestion, "correctChoiceId" | "explanation"> {
  const { correctChoiceId: _c, explanation: _e, ...rest } = q;
  return rest;
}
