import { SessionSetupForm } from "@/components/speaking/session-setup-form";
import { getAuthUserId } from "@/lib/api/auth";
import { hasVoiceConsent, listScenarios, listTopics } from "@/lib/modules/speaking";
import { redirect } from "next/navigation";

export default async function SessionSetupPage() {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  const [topics, scenarios, voiceConsent] = await Promise.all([
    Promise.resolve(listTopics()),
    Promise.resolve(listScenarios()),
    hasVoiceConsent(userId),
  ]);

  return (
    <SessionSetupForm
      topics={topics.map((t) => ({
        id: t.id,
        title: t.title,
        titleVi: t.titleVi,
        level: t.level,
      }))}
      scenarios={scenarios.map((s) => ({
        id: s.id,
        title: s.title,
        titleVi: s.titleVi,
        level: s.level,
      }))}
      hasVoiceConsent={voiceConsent}
    />
  );
}
