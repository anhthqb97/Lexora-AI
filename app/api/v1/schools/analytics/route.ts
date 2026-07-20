import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { getSchoolAnalytics } from "@/lib/modules/schools";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  try {
    const stats = await getSchoolAnalytics(userId);
    return ok(stats);
  } catch {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Not allowed" } },
      { status: 403 },
    );
  }
}
