import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { importRoster, listClasses, getSchoolAnalytics } from "@/lib/modules/schools";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const url = new URL(req.url);
  const schoolId = url.searchParams.get("schoolId") ?? userId;
  if (url.searchParams.get("analytics") === "1") {
    return ok(await getSchoolAnalytics(schoolId));
  }
  return ok({ classes: await listClasses(schoolId) });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const cls = await importRoster(
    body.schoolId ?? userId,
    body.className ?? "Class A",
    body.studentIds ?? [],
  );
  return ok(cls, 201);
}
