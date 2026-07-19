import mongoose, { Schema, models, model } from "mongoose";
import type { UserGoal, UserLevel, UserLocale } from "./types";

export interface IUserProfile {
  userId: mongoose.Types.ObjectId;
  name?: string;
  avatarUrl?: string;
  goal?: UserGoal;
  level?: UserLevel;
  locale: UserLocale;
  onboardingCompleted: boolean;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "User" },
    name: { type: String, trim: true },
    avatarUrl: { type: String },
    goal: { type: String, enum: ["toeic", "speaking", "business", "general"] },
    level: { type: String, enum: ["A1", "A2", "B1", "B2", "C1"] },
    locale: { type: String, enum: ["vi", "en"], default: "vi" },
    onboardingCompleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

UserProfileSchema.index({ userId: 1 }, { unique: true });

export const UserProfile =
  models.UserProfile ?? model<IUserProfile>("UserProfile", UserProfileSchema);
