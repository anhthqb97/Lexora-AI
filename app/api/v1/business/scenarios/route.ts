import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import {
  BusinessError,
  listBusinessProgress,
  listBusinessScenarios,
  startBusinessScenario,
} from "@/lib/modules/business";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const progress = await listBusinessProgress(userId);
  return ok({ scenarios: listBusinessScenarios(), progress });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  try {
    const body = await req.json();
    const session = await startBusinessScenario(userId, body.scenarioId ?? "");
    return ok(session, 201);
  } catch (error) {
    if (error instanceof BusinessError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 400 },
      );
    }
    throw error;
  }
}
