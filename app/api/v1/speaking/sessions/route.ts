import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import {
  SpeakingError,
  SpeakingLimitError,
  createSession,
  listSessions,
} from "@/lib/modules/speaking";
import { SESSION_DURATIONS, SESSION_TYPES } from "@/lib/modules/speaking/constants";

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const sessions = await listSessions(userId);
    return ok({ data: sessions });
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

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();
    const type = body.type as string;
    const durationMinutes = Number(body.durationMinutes);

    if (!SESSION_TYPES.includes(type as (typeof SESSION_TYPES)[number])) {
      return NextResponse.json(
        { error: { code: "INVALID_INPUT", message: "Invalid session type" } },
        { status: 400 },
      );
    }
    if (!SESSION_DURATIONS.includes(durationMinutes as (typeof SESSION_DURATIONS)[number])) {
      return NextResponse.json(
        { error: { code: "INVALID_INPUT", message: "Invalid duration" } },
        { status: 400 },
      );
    }

    const session = await createSession(userId, {
      type: type as (typeof SESSION_TYPES)[number],
      topicId: body.topicId,
      scenarioId: body.scenarioId,
      durationMinutes: durationMinutes as (typeof SESSION_DURATIONS)[number],
      vietnameseHelp: body.vietnameseHelp,
    });
    return ok({ data: session }, 201);
  } catch (error) {
    if (error instanceof SpeakingLimitError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 402 },
      );
    }
    if (error instanceof SpeakingError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 400 },
      );
    }
    throw error;
  }
}
