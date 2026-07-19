import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";

export type ConsentType = "voice_recording" | "terms" | "privacy";

export interface IUserConsent {
  userId: mongoose.Types.ObjectId;
  type: ConsentType;
  granted: boolean;
  grantedAt?: Date;
  ipAddress?: string;
}

const UserConsentSchema = new Schema<IUserConsent>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    type: {
      type: String,
      enum: ["voice_recording", "terms", "privacy"],
      required: true,
    },
    granted: { type: Boolean, required: true },
    grantedAt: { type: Date },
    ipAddress: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

UserConsentSchema.index({ userId: 1, type: 1 }, { unique: true });

export const UserConsent =
  models.UserConsent ?? model<IUserConsent>("UserConsent", UserConsentSchema);

export async function hasVoiceConsent(userId: string): Promise<boolean> {
  await connectDatabase();
  const consent = await UserConsent.findOne({
    userId,
    type: "voice_recording",
    granted: true,
  });
  return !!consent;
}

export async function grantVoiceConsent(userId: string, ipAddress?: string): Promise<void> {
  await connectDatabase();
  await UserConsent.findOneAndUpdate(
    { userId, type: "voice_recording" },
    {
      userId,
      type: "voice_recording",
      granted: true,
      grantedAt: new Date(),
      ipAddress,
    },
    { upsert: true, new: true },
  );
}
