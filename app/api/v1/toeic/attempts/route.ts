import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { ToeicError, listAttempts } from "@/lib/modules/toeic";
import { submitAnswer } from "@/lib/modules/toeic/service";

export async function GET(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "diagnostic" | "mock" | null;

  const attempts = await listAttempts(userId, type ?? undefined);
  return ok({ data: attempts });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = (await req.json()) as {
      attemptId?: string;
      questionId?: string;
      choiceId?: string;
    };

    if (!body.attemptId || !body.questionId || !body.choiceId) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_INPUT",
            message: "attemptId, questionId, and choiceId required",
          },
        },
        { status: 400 },
      );
    }

    const attempt = await submitAnswer(userId, body.attemptId, {
      questionId: body.questionId,
      choiceId: body.choiceId,
    });
    return ok({ data: attempt });
  } catch (error) {
    if (error instanceof ToeicError) {
      const status = error.code === "NOT_FOUND" ? 404 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
