import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { SpeakingError, getSummary } from "@/lib/modules/speaking";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const { id } = await params;
  try {
    const summary = await getSummary(userId, id);
    return ok({ data: summary });
  } catch (error) {
    if (error instanceof SpeakingError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 404 },
      );
    }
    throw error;
  }
}
