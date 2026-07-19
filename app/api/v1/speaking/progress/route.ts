import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getProgress } from "@/lib/modules/speaking";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const progress = await getProgress(userId);
  return ok({ data: progress });
}
