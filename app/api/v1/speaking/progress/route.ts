import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getProgress } from "@/lib/modules/speaking";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const progress = await getProgress(userId);
  return ok({ data: progress });
}
