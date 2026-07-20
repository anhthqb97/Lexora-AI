import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import { getDailyChallenge, completeDailyChallenge } from "@/lib/modules/speaking/challenge";

const DailyGoalSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, index: true },
    dayKey: { type: String, required: true },
    targetMinutes: { type: Number, default: 15 },
    completedMinutes: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

DailyGoalSchema.index({ userId: 1, dayKey: 1 }, { unique: true });

export const DailyGoalModel = models.DailyGoal ?? model("DailyGoal", DailyGoalSchema);

export type GamificationStatus = {
  streak: number;
  dailyGoal: { targetMinutes: number; completedMinutes: number; completed: boolean };
  challengeCompleted: boolean;
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getGamificationStatus(userId: string): Promise<GamificationStatus> {
  await connectDatabase();
  const challenge = await getDailyChallenge(userId);
  const dayKey = todayKey();
  let goal = await DailyGoalModel.findOne({ userId, dayKey });
  if (!goal) {
    goal = await DailyGoalModel.create({ userId, dayKey, targetMinutes: 15 });
  }
  return {
    streak: challenge.streak,
    dailyGoal: {
      targetMinutes: goal.targetMinutes,
      completedMinutes: goal.completedMinutes,
      completed: goal.completed,
    },
    challengeCompleted: challenge.completedToday,
  };
}

export async function recordPracticeMinutes(
  userId: string,
  minutes: number,
): Promise<GamificationStatus> {
  await connectDatabase();
  const dayKey = todayKey();
  const goal = await DailyGoalModel.findOneAndUpdate(
    { userId, dayKey },
    { $inc: { completedMinutes: minutes } },
    { upsert: true, new: true },
  );
  if (goal && goal.completedMinutes >= goal.targetMinutes && !goal.completed) {
    goal.completed = true;
    await goal.save();
    await completeDailyChallenge(userId).catch(() => {});
  }
  return getGamificationStatus(userId);
}

export { getDailyChallenge, completeDailyChallenge };
