import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { SpeakingError, getSession } from "@/lib/modules/speaking";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  const { id } = await params;
  try {
    const session = await getSession(userId, id);
    return ok({ data: session });
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
