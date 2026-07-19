import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { ToeicError, ToeicLimitError, finishAttempt, startAttempt } from "@/lib/modules/toeic";

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  try {
    const result = await startAttempt(userId, { type: "diagnostic" });
    return ok({ data: result }, 201);
  } catch (error) {
    if (error instanceof ToeicLimitError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 402 },
      );
    }
    if (error instanceof ToeicError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 400 },
      );
    }
    throw error;
  }
}

export async function PATCH(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  try {
    const body = (await req.json()) as { attemptId?: string };
    if (!body.attemptId) {
      return NextResponse.json(
        { error: { code: "INVALID_INPUT", message: "attemptId required" } },
        { status: 400 },
      );
    }
    const result = await finishAttempt(userId, { attemptId: body.attemptId });
    return ok({ data: result });
  } catch (error) {
    if (error instanceof ToeicError) {
      const status = error.code === "NOT_FOUND" ? 404 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
