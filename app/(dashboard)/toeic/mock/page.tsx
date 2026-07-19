import { ToeicExamClient } from "@/components/toeic/toeic-exam-client";
import { getAuthUserId } from "@/lib/api/auth";
import { startAttempt } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

export default async function ToeicMockPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  try {
    const { attempt, questions } = await startAttempt(userId, { type: "mock" });

    return (
      <ToeicExamClient
        attemptId={attempt.id}
        questions={questions}
        title="Thi thử TOEIC đầy đủ"
        finishUrl="/api/v1/toeic/mock"
      />
    );
  } catch {
    redirect("/toeic");
  }
}
