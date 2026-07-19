import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { completeDailyChallenge, getDailyChallenge } from "@/lib/modules/speaking/challenge";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const data = await getDailyChallenge(userId);
  return ok(data);
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  let sessionId: string | undefined;
  try {
    const body = await req.json();
    sessionId = body.sessionId;
  } catch {
    sessionId = undefined;
  }
  const data = await completeDailyChallenge(userId, sessionId);
  return ok(data);
}
