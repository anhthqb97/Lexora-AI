import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getPlans } from "@/lib/modules/billing/service";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const plans = await getPlans();
  return ok({ data: plans });
}
