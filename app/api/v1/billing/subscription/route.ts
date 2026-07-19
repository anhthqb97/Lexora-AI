import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getSubscription } from "@/lib/modules/billing/service";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const subscription = await getSubscription(userId);
  return ok({ data: subscription });
}
