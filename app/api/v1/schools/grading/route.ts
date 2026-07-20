import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { AssignmentModel } from "@/lib/modules/centers/models";

export async function PATCH(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const doc = await AssignmentModel.findOneAndUpdate(
    { _id: body.assignmentId, teacherId: userId },
    { status: body.status ?? "completed", grade: body.grade },
    { new: true },
  );
  if (!doc) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Assignment not found" } },
      { status: 404 },
    );
  }
  return ok({
    id: doc._id.toString(),
    status: doc.status,
    grade: (doc as { grade?: number }).grade,
  });
}
