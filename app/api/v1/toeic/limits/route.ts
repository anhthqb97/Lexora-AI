import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getLimits } from "@/lib/modules/toeic";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const limits = await getLimits(userId);
  return ok({ data: limits });
}
