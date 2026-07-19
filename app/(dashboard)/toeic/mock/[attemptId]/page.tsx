import { ToeicExamClient } from "@/components/toeic/toeic-exam-client";
import { getAuthUserId } from "@/lib/api/auth";
import { getAttempt, getQuestionsForAttempt, toPublicQuestionDTO } from "@/lib/modules/toeic";
import { redirect } from "next/navigation";

type PageProps = { params: Promise<{ attemptId: string }> };

export default async function ToeicMockAttemptPage({ params }: PageProps) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");
  const { attemptId } = await params;

  try {
    const attempt = await getAttempt(userId, attemptId);
    const questions = await getQuestionsForAttempt(attempt.questionIds);
    return (
      <ToeicExamClient
        attemptId={attempt.id}
        questions={questions.map(toPublicQuestionDTO)}
        title={`Thi thử TOEIC ${attempt.formId ?? ""}`}
        finishUrl="/api/v1/toeic/mock"
      />
    );
  } catch {
    redirect("/toeic/mock");
  }
}
