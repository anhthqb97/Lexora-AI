import { LiveSession } from "@/components/speaking/live-session";
import { getAuthUserId } from "@/lib/api/auth";
import { getSession } from "@/lib/modules/speaking";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ resume?: string }>;
};

export default async function LiveSessionPage({ params, searchParams }: Props) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");

  const { id } = await params;
  const { resume } = await searchParams;

  try {
    const session = await getSession(userId, id);
    if (session.status === "completed") {
      redirect(`/speaking/session/${id}/summary`);
    }

    return (
      <LiveSession
        sessionId={id}
        durationMinutes={session.durationMinutes}
        greeting={session.greeting ?? "Hello! Let's start practicing."}
        vietnameseHelp={session.vietnameseHelp}
        canResume={resume === "1"}
      />
    );
  } catch {
    notFound();
  }
}
