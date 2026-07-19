import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";
import {
  completeOnboarding,
  OnboardingError,
  setOnboardingGoal,
  setOnboardingLevel,
} from "@/lib/modules/user/onboarding";

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();

  try {
    const body = await req.json();

    if (body.goal && body.level) {
      const profile = await completeOnboarding(userId, {
        goal: body.goal,
        level: body.level,
      });
      return ok({ data: profile });
    }

    if (body.level) {
      const profile = await setOnboardingLevel(userId, body.level);
      return ok({ data: profile });
    }

    if (body.goal) {
      const profile = await setOnboardingGoal(userId, body.goal);
      return ok({ data: profile });
    }

    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "goal or level required" } },
      { status: 422 },
    );
  } catch (error) {
    if (error instanceof OnboardingError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: 422 },
      );
    }
    throw error;
  }
}
