import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { listBusinessScenarios, startBusinessSession } from "@/lib/modules/business";

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  return ok({ scenarios: listBusinessScenarios() });
}

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  try {
    const body = await req.json();
    const session = await startBusinessSession(userId, body.scenarioId ?? "", body.durationMinutes);
    return ok(session, 201);
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_SCENARIO", message: "Scenario not found" } },
      { status: 400 },
    );
  }
}
