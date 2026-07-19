import { ToeicExamClient } from "@/components/toeic/toeic-exam-client";
import { getAuthUserId } from "@/lib/api/auth";
import { startAttempt } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

export default async function ToeicDiagnosticPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  try {
    const { attempt, questions } = await startAttempt(userId, { type: "diagnostic" });

    return (
      <ToeicExamClient
        attemptId={attempt.id}
        questions={questions}
        title="Bài chẩn đoán TOEIC"
        finishUrl="/api/v1/toeic/diagnostic"
      />
    );
  } catch {
    redirect("/toeic");
  }
}
