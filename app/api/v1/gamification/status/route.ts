import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getGamificationStatus, recordPracticeMinutes } from "@/lib/modules/gamification";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  return ok(await getGamificationStatus(userId));
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const minutes = Number(body.minutes ?? 0);
  if (minutes <= 0) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "minutes required" } },
      { status: 400 },
    );
  }
  return ok(await recordPracticeMinutes(userId, minutes));
}
