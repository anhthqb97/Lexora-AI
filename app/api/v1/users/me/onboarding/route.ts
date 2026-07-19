import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import { OnboardingError, setOnboardingGoal } from "@/lib/modules/user/onboarding";

export async function POST(req: Request) {
  const userId = await getAuthUserId();
  if (!userId) return unauthorized();

  try {
    const body = await req.json();

    if (!body.goal) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "goal is required" } },
        { status: 422 },
      );
    }

    const profile = await setOnboardingGoal(userId, body.goal);
    return ok({ data: profile });
  } catch (error) {
    if (error instanceof OnboardingError) {
      return NextResponse.json({ error: { code: error.code, message: error.message } }, { status: 422 });
    }
    throw error;
  }
}
