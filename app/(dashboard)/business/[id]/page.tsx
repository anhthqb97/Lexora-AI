import { redirect } from "next/navigation";
import { getAuthUserId } from "@/lib/api/auth";
import { getBusinessScenario, startBusinessScenario } from "@/lib/modules/business";

type PageProps = { params: Promise<{ id: string }> };

export default async function BusinessScenarioPage({ params }: PageProps) {
  const userId = await getAuthUserId();
  if (!userId) redirect("/login");
  const { id } = await params;
  const scenario = getBusinessScenario(id);
  if (!scenario) redirect("/business");

  const session = await startBusinessScenario(userId, id);
  redirect(`/speaking/session/${session.id}`);
}
