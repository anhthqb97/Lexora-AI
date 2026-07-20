import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getTeacherProgress } from "@/lib/modules/centers";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const url = new URL(req.url);
  const centerId = url.searchParams.get("centerId") ?? "";
  if (!centerId) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "centerId required" } },
      { status: 400 },
    );
  }
  const progress = await getTeacherProgress(centerId);
  return ok(progress);
}
