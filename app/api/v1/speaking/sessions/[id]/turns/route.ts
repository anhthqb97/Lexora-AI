import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { SpeakingError, processTurn } from "@/lib/modules/speaking";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Params) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const { id } = await params;
  try {
    const body = await req.json();
    const result = await processTurn({
      sessionId: id,
      userId,
      audioBase64: body.audioBase64,
      transcript: body.transcript,
    });
    return ok({ data: result });
  } catch (error) {
    if (error instanceof SpeakingError) {
      const status = error.code === "NO_SPEECH" ? 422 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
