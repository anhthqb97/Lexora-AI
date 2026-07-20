import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { IeltsError, startDiagnostic, getLatestDiagnostic } from "@/lib/modules/ielts";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const latest = await getLatestDiagnostic(userId);
  return ok({ latest });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  try {
    const body = await req.json().catch(() => ({}));
    const result = await startDiagnostic(userId, body);
    return ok(result, 201);
  } catch (error) {
    if (error instanceof IeltsError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 400 },
      );
    }
    throw error;
  }
}
