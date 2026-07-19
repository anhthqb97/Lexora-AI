import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import {
  InterviewError,
  submitAnswer,
  getInterviewSession,
  loadQuestionBank,
} from "@/lib/modules/interview";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const { id } = await params;
  try {
    const session = await getInterviewSession(userId, id);
    const bank = loadQuestionBank(session.industry);
    const question = bank[session.currentIndex];
    return ok({ session, question });
  } catch (error) {
    if (error instanceof InterviewError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 404 },
      );
    }
    throw error;
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const { id } = await params;
  try {
    const body = await req.json();
    const result = await submitAnswer(userId, id, body.transcript ?? "");
    return ok(result);
  } catch (error) {
    if (error instanceof InterviewError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 400 },
      );
    }
    throw error;
  }
}
