import { ToeicHome } from "@/components/toeic/toeic-home";
import { getAuthUserId } from "@/lib/api/auth";
import { connectDatabase } from "@/lib/db/mongoose";
import { getLimits, listAttempts } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

export default async function ToeicHomePage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  await connectDatabase();
  const [limits, attempts] = await Promise.all([getLimits(userId), listAttempts(userId)]);

  const latest = attempts.find((a) => a.status === "completed");

  return (
    <ToeicHome
      diagnosticCompleted={limits.diagnosticCompleted}
      mocksUsed={limits.mocksUsedThisMonth}
      mockLimit={limits.isPaid ? limits.mocksUsedThisMonth : limits.mockLimit}
      isPaid={limits.isPaid}
      recentScore={latest?.totalScore}
      recentType={latest?.type === "diagnostic" ? "Chẩn đoán" : "Thi thử"}
    />
  );
}
