import { SessionSummaryView } from "@/components/speaking/session-summary-view";
import { getAuthUserId } from "@/lib/api/auth";
import { getSummary } from "@/lib/modules/speaking";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SessionSummaryPage({ params }: Props) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  try {
    const summary = await getSummary(userId, id);
    return (
      <SessionSummaryView
        sessionId={id}
        overallConfidence={summary.overallConfidence}
        dimensions={summary.dimensions}
        improvements={summary.improvements}
        topFocusAreas={summary.topFocusAreas}
        encouragement={summary.encouragement}
        explainWhy={summary.explainWhy}
        hasFlaggedPhrases={(summary.flaggedPhrases?.length ?? 0) > 0}
      />
    );
  } catch {
    notFound();
  }
}
