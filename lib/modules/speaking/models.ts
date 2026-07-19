import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import { SESSION_DURATIONS, SESSION_STATUSES, SESSION_TYPES } from "./constants";
import type { SpeakingSession, SpeakingSummary, SpeakingTurn } from "./types";

const SpeakingSessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    type: { type: String, enum: SESSION_TYPES, required: true },
    topicId: { type: String },
    scenarioId: { type: String },
    durationMinutes: { type: Number, enum: SESSION_DURATIONS, required: true },
    status: { type: String, enum: SESSION_STATUSES, default: "created" },
    vietnameseHelp: { type: Boolean, default: false },
    currentLevel: { type: String, enum: ["A1", "A2", "B1", "B2", "C1"] },
    startedAt: { type: Date },
    endedAt: { type: Date },
    expiresAt: { type: Date },
  },
  { timestamps: true },
);

SpeakingSessionSchema.index({ userId: 1, startedAt: -1 });

const TurnScoresSchema = new Schema(
  {
    pronunciation: Number,
    fluency: Number,
    grammar: Number,
    vocabulary: Number,
    confidence: Number,
  },
  { _id: false },
);

const SpeakingTurnSchema = new Schema(
  {
    sessionId: { type: Schema.Types.ObjectId, required: true, index: true },
    turnNumber: { type: Number, required: true },
    role: { type: String, enum: ["user", "assistant"], required: true },
    transcript: { type: String },
    aiResponse: { type: String },
    scores: TurnScoresSchema,
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

SpeakingTurnSchema.index({ sessionId: 1, turnNumber: 1 }, { unique: true });

const SpeakingSummarySchema = new Schema(
  {
    sessionId: { type: Schema.Types.ObjectId, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    overallConfidence: { type: Number, required: true },
    dimensions: {
      pronunciation: { type: Number, required: true },
      fluency: { type: Number, required: true },
      grammar: { type: Number, required: true },
      vocabulary: { type: Number, required: true },
      confidence: { type: Number, required: true },
    },
    improvements: [
      {
        original: String,
        corrected: String,
        reason: String,
      },
    ],
    topFocusAreas: [String],
    encouragement: { type: String, required: true },
    explainWhy: { type: String },
    flaggedPhrases: [
      {
        original: String,
        corrected: String,
        reason: String,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

type SessionDoc = InferSchemaType<typeof SpeakingSessionSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const SpeakingSessionModel =
  models.SpeakingSession ?? model("SpeakingSession", SpeakingSessionSchema);

export const SpeakingTurnModel = models.SpeakingTurn ?? model("SpeakingTurn", SpeakingTurnSchema);

export const SpeakingSummaryModel =
  models.SpeakingSummary ?? model("SpeakingSummary", SpeakingSummarySchema);

export { mongoose as speakingMongoose };

export function toSessionDTO(doc: SessionDoc): SpeakingSession {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    type: doc.type,
    topicId: doc.topicId ?? undefined,
    scenarioId: doc.scenarioId ?? undefined,
    durationMinutes: doc.durationMinutes as SpeakingSession["durationMinutes"],
    status: doc.status as SpeakingSession["status"],
    vietnameseHelp: doc.vietnameseHelp ?? false,
    currentLevel: doc.currentLevel ?? undefined,
    startedAt: doc.startedAt ?? undefined,
    endedAt: doc.endedAt ?? undefined,
    expiresAt: doc.expiresAt ?? undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export type { SpeakingTurn, SpeakingSummary };
