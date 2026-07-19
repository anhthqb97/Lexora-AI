import mongoose from "mongoose";
import { FREE_TOEIC_MOCKS_PER_MONTH } from "@/lib/modules/billing/constants";
import { connectDatabase } from "@/lib/db/mongoose";
import { getUserTier } from "@/lib/modules/user/tier";
import { ToeicAttemptModel } from "./models";

/** ICT month starts 1st 00:00 UTC+7 */
function getMonthStartICT(): Date {
  const now = new Date();
  const ictOffset = 7 * 60;
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  const ict = new Date(utcMs + ictOffset * 60_000);

  ict.setUTCDate(1);
  ict.setUTCHours(0, 0, 0, 0);

  return new Date(ict.getTime() - ictOffset * 60_000);
}

export class ToeicLimitError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function hasCompletedDiagnostic(userId: string): Promise<boolean> {
  await connectDatabase();
  const count = await ToeicAttemptModel.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
    type: "diagnostic",
    status: "completed",
  });
  return count > 0;
}

export async function getMonthlyMockCount(userId: string): Promise<number> {
  await connectDatabase();
  const monthStart = getMonthStartICT();
  return ToeicAttemptModel.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
    type: "mock",
    status: { $in: ["in_progress", "completed"] },
    startedAt: { $gte: monthStart },
  });
}

export async function getLimitStatus(userId: string) {
  const tier = await getUserTier(userId);
  const isPaid = tier === "paid";
  const diagnosticCompleted = await hasCompletedDiagnostic(userId);
  const mocksUsedThisMonth = await getMonthlyMockCount(userId);
  const mockLimit = isPaid ? mocksUsedThisMonth : FREE_TOEIC_MOCKS_PER_MONTH;

  return {
    diagnosticCompleted,
    mocksUsedThisMonth,
    mockLimit: isPaid ? Infinity : FREE_TOEIC_MOCKS_PER_MONTH,
    mocksRemaining: isPaid
      ? Infinity
      : Math.max(0, FREE_TOEIC_MOCKS_PER_MONTH - mocksUsedThisMonth),
    isPaid,
  };
}

export async function assertCanStartDiagnostic(userId: string): Promise<void> {
  const completed = await hasCompletedDiagnostic(userId);
  const tier = await getUserTier(userId);
  if (completed && tier !== "paid") {
    throw new ToeicLimitError(
      "DIAGNOSTIC_ALREADY_TAKEN",
      "Free tier allows one diagnostic test. Upgrade to Pro for unlimited retests.",
    );
  }
}

export async function assertCanStartMock(userId: string): Promise<void> {
  const status = await getLimitStatus(userId);
  if (!status.isPaid && status.mocksUsedThisMonth >= FREE_TOEIC_MOCKS_PER_MONTH) {
    throw new ToeicLimitError("LIMIT_REACHED", "Free tier limit of 1 mock exam per month reached");
  }
}
