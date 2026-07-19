import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getOrCreateReferralCode } from "@/lib/modules/referral";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const data = await getOrCreateReferralCode(userId);
  return ok(data);
}
