import { SpeakingHome } from "@/components/speaking/speaking-home";
import { getAuthUserId } from "@/lib/api/auth";
import { connectDatabase } from "@/lib/db/mongoose";
import { SpeakingSessionModel, SpeakingSummaryModel } from "@/lib/modules/speaking/models";
import { getProgress, getWeeklyLimitStatus } from "@/lib/modules/speaking";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

function formatRelativeDate(date: Date): string {
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days === 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  return `${days} ngày trước`;
}

export default async function SpeakingHomePage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  await connectDatabase();
  const [progress, weekly] = await Promise.all([getProgress(userId), getWeeklyLimitStatus(userId)]);

  const sessions = await SpeakingSessionModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    status: "completed",
  })
    .sort({ endedAt: -1 })
    .limit(5);

  const recentSessions = await Promise.all(
    sessions.map(async (s) => {
      const summary = await SpeakingSummaryModel.findOne({ sessionId: s._id });
      return {
        id: s._id.toString(),
        type: s.type,
        score: summary ? summary.overallConfidence / 10 : undefined,
        date: formatRelativeDate(s.endedAt ?? s.createdAt),
      };
    }),
  );

  return (
    <SpeakingHome
      weeklyUsed={weekly.used}
      weeklyLimit={weekly.isPaid ? weekly.used : weekly.limit}
      isPaid={weekly.isPaid}
      totalMinutes={progress.totalPracticeMinutes}
      recentSessions={recentSessions}
    />
  );
}
