import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { listTopics } from "@/lib/modules/speaking";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  return ok({ data: listTopics() });
}
