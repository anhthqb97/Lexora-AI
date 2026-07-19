import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getLimits } from "@/lib/modules/toeic";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const limits = await getLimits(userId);
  return ok({ data: limits });
}
