import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { listIndustries, startInterview, submitAnswer } from "@/lib/modules/interview";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  return ok({ industries: listIndustries() });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  if (body.action === "answer") {
    const result = await submitAnswer(userId, body.sessionId, body.questionId, body.answer ?? "");
    return ok(result);
  }
  const session = await startInterview(userId, body.industry ?? "it");
  return ok(session, 201);
}
