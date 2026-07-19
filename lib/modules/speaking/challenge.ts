import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import { getDailyPrompt } from "./challenge-prompts";

const ChallengeProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    dayKey: { type: String, required: true },
    completedAt: { type: Date, required: true },
    sessionId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

ChallengeProgressSchema.index({ userId: 1, dayKey: 1 }, { unique: true });

export const ChallengeProgressModel =
  models.ChallengeProgress ?? model("ChallengeProgress", ChallengeProgressSchema);

export type DailyChallengeStatus = {
  dayKey: string;
  prompt: string;
  completedToday: boolean;
  streak: number;
  completedAt?: string;
};

function computeStreak(completedDays: string[], today: string): number {
  const set = new Set(completedDays);
  let streak = 0;
  const cursor = new Date(`${today}T12:00:00.000Z`);
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!set.has(key)) break;
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export async function getDailyChallenge(userId: string): Promise<DailyChallengeStatus> {
  await connectDatabase();
  const { dayKey, prompt } = getDailyPrompt();
  const todayDoc = await ChallengeProgressModel.findOne({ userId, dayKey });
  const recent = await ChallengeProgressModel.find({ userId })
    .sort({ dayKey: -1 })
    .limit(60)
    .lean();
  const completedDays = recent.map((d) => d.dayKey as string);
  return {
    dayKey,
    prompt,
    completedToday: Boolean(todayDoc),
    streak: computeStreak(completedDays, dayKey),
    completedAt: todayDoc?.completedAt?.toISOString(),
  };
}

export async function completeDailyChallenge(
  userId: string,
  sessionId?: string,
): Promise<DailyChallengeStatus> {
  await connectDatabase();
  const { dayKey, prompt } = getDailyPrompt();
  await ChallengeProgressModel.findOneAndUpdate(
    { userId, dayKey },
    { userId, dayKey, completedAt: new Date(), sessionId },
    { upsert: true, new: true },
  );
  return getDailyChallenge(userId);
}

export { getDailyPrompt };
