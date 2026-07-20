import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { listIndustries, startInterview } from "@/lib/modules/interview";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  return ok({ industries: listIndustries() });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const result = await startInterview(userId, body.industry ?? "it");
  return ok(result, 201);
}
