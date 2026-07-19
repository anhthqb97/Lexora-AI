import { RetryPhrases } from "@/components/speaking/retry-phrases";
import { getAuthUserId } from "@/lib/api/auth";
import { getSummary } from "@/lib/modules/speaking";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RetryPhrasesPage({ params }: Props) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  const { id } = await params;

  try {
    const summary = await getSummary(userId, id);
    const phrases = (summary.flaggedPhrases ?? summary.improvements).slice(0, 5);
    return <RetryPhrases sessionId={id} phrases={phrases} />;
  } catch {
    notFound();
  }
}
