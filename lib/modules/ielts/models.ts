import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";
import type { IeltsDiagnosticResult, IeltsSkill } from "./types";

const IeltsDiagnosticSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    overallBand: { type: Number, required: true },
    skills: {
      listening: Number,
      reading: Number,
      writing: Number,
      speaking: Number,
    },
    weakAreas: [String],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

type Doc = InferSchemaType<typeof IeltsDiagnosticSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const IeltsDiagnosticModel =
  models.IeltsDiagnostic ?? model("IeltsDiagnostic", IeltsDiagnosticSchema);

export function toIeltsDiagnosticDTO(doc: Doc): IeltsDiagnosticResult {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    overallBand: doc.overallBand,
    skills: doc.skills as Record<IeltsSkill, number>,
    weakAreas: doc.weakAreas ?? [],
    completedAt: doc.completedAt.toISOString(),
  };
}
