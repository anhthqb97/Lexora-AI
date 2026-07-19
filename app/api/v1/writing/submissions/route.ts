import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { listPrompts, listSubmissions, submitWriting, WritingError } from "@/lib/modules/writing";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const submissions = await listSubmissions(userId);
  return ok({ prompts: listPrompts(), submissions });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  try {
    const body = await req.json();
    const submission = await submitWriting(userId, body.promptId ?? "", body.content ?? "");
    return ok(submission, 201);
  } catch (error) {
    if (error instanceof WritingError) {
      const status = error.code === "LIMIT_REACHED" ? 429 : 400;
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status });
    }
    throw error;
  }
}
