import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getScoreTrends } from "@/lib/modules/speaking";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const url = new URL(req.url);
  const daysParam = Number(url.searchParams.get("days") ?? "7");
  const days = ([7, 30, 90] as const).includes(daysParam as 7 | 30 | 90)
    ? (daysParam as 7 | 30 | 90)
    : 7;

  const trends = await getScoreTrends(userId, days);
  return ok({ data: trends });
}
