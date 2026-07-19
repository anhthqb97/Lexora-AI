import mongoose from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import { getUserTier } from "@/lib/modules/user/tier";
import { FREE_TIER_SESSIONS_PER_WEEK } from "./constants";
import { SpeakingSessionModel } from "./models";

/** ICT week starts Monday 00:00 UTC+7 */
function getWeekStartICT(): Date {
  const now = new Date();
  const ictOffset = 7 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const ict = new Date(utcMs + ictOffset * 60_000);

  const day = ict.getUTCDay();
  const diff = day === 0 ? 6 : day - 1;
  ict.setUTCDate(ict.getUTCDate() - diff);
  ict.setUTCHours(0, 0, 0, 0);

  return new Date(ict.getTime() - ictOffset * 60_000);
}

export type WeeklyLimitStatus = {
  used: number;
  limit: number;
  remaining: number;
  isPaid: boolean;
};

export async function getWeeklySessionCount(userId: string): Promise<number> {
  await connectDatabase();
  const weekStart = getWeekStartICT();
  return SpeakingSessionModel.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
    status: { $in: ["active", "ending", "evaluating", "completed"] },
    startedAt: { $gte: weekStart },
  });
}

export async function getWeeklyLimitStatus(userId: string): Promise<WeeklyLimitStatus> {
  const tier = await getUserTier(userId);
  const isPaid = tier === "paid";
  const used = await getWeeklySessionCount(userId);
  const limit = isPaid ? used : FREE_TIER_SESSIONS_PER_WEEK;

  return {
    used,
    limit,
    remaining: isPaid ? Infinity : Math.max(0, FREE_TIER_SESSIONS_PER_WEEK - used),
    isPaid,
  };
}

export async function assertCanStartSession(userId: string): Promise<void> {
  const status = await getWeeklyLimitStatus(userId);
  if (!status.isPaid && status.used >= FREE_TIER_SESSIONS_PER_WEEK) {
    throw new SpeakingLimitError("LIMIT_REACHED", "Free tier limit of 3 sessions per week reached");
  }
}

export class SpeakingLimitError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}
