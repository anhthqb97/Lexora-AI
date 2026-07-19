import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { connectDatabase } from "@/lib/db/mongoose";
import { registerPushToken } from "@/lib/modules/notifications/push-token";

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const body = await req.json();
  const token = body.token as string | undefined;
  const platform = (body.platform as "ios" | "android" | "unknown") ?? "unknown";

  if (!token || token.length < 10) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "Valid Expo push token required" } },
      { status: 400 },
    );
  }

  await connectDatabase();
  await registerPushToken(userId, token, platform);
  return ok({ registered: true });
}
