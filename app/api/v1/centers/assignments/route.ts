import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import {
  createAssignment,
  listAssignmentsForStudent,
  getTeacherProgress,
} from "@/lib/modules/centers";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const url = new URL(req.url);
  const centerId = url.searchParams.get("centerId");
  if (centerId) {
    const progress = await getTeacherProgress(centerId);
    return ok(progress);
  }
  const assignments = await listAssignmentsForStudent(userId);
  return ok({ assignments });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const assignment = await createAssignment({
    centerId: body.centerId,
    teacherId: userId,
    studentId: body.studentId,
    type: body.type ?? "speaking",
    title: body.title ?? "Speaking homework",
    dueAt: body.dueAt,
  });
  return ok(assignment, 201);
}
