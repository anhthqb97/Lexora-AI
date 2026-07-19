import { ScoreReportView } from "@/components/toeic/score-report-view";
import { getAuthUserId } from "@/lib/api/auth";
import { getReport, ToeicError } from "@/lib/modules/toeic";
import { notFound, redirect } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function ToeicReportPage({ params }: PageProps) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  try {
    const report = await getReport(userId, id);
    return <ScoreReportView report={report} />;
  } catch (error) {
    if (error instanceof ToeicError && error.code === "NOT_FOUND") notFound();
    notFound();
  }
}
