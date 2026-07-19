import { connectDatabase } from "@/lib/db/mongoose";
import { UserProfile } from "./models";
import type { UserGoal } from "./types";
import { getProfile } from "./service";

export class OnboardingError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

async function getOrCreateProfile(userId: string) {
  await connectDatabase();
  let profile = await UserProfile.findOne({ userId });
  if (!profile) {
    profile = await UserProfile.create({ userId, locale: "vi", onboardingCompleted: false });
  }
  return profile;
}

export async function setOnboardingGoal(userId: string, goal: UserGoal) {
  const valid: UserGoal[] = ["toeic", "speaking", "business", "general"];
  if (!valid.includes(goal)) {
    throw new OnboardingError("VALIDATION_ERROR", "Invalid goal");
  }

  const profile = await getOrCreateProfile(userId);
  profile.goal = goal;
  await profile.save();
  return getProfile(userId);
}
