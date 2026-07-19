import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { grantVoiceConsent, hasVoiceConsent } from "@/lib/modules/speaking";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const granted = await hasVoiceConsent(userId);
  return ok({ data: { granted } });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const body = await req.json();
  if (body.type !== "voice_recording" || !body.granted) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "Voice consent required" } },
      { status: 400 },
    );
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  await grantVoiceConsent(userId, ip);
  return ok({ granted: true }, 201);
}
