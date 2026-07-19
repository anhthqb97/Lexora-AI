import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { ToeicError, getReport } from "@/lib/modules/toeic";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  const { id } = await params;

  try {
    const report = await getReport(userId, id);
    return ok({ data: report });
  } catch (error) {
    if (error instanceof ToeicError) {
      const status = error.code === "NOT_FOUND" ? 404 : error.code === "NOT_READY" ? 409 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
