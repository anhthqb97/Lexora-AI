import { connectDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/modules/auth/models";
import { UserProfile } from "./models";
import type { UpdateProfileInput, UserProfile as UserProfileDto } from "./types";

export class UserError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

async function ensureProfile(userId: string) {
  await connectDatabase();
  let profile = await UserProfile.findOne({ userId });
  if (!profile) {
    profile = await UserProfile.create({ userId, locale: "vi", onboardingCompleted: false });
  }
  return profile;
}

export async function getProfile(userId: string): Promise<UserProfileDto> {
  await connectDatabase();
  const [user, profile] = await Promise.all([User.findById(userId), ensureProfile(userId)]);

  if (!user || user.status !== "active") {
    throw new UserError("NOT_FOUND", "User not found");
  }

  return {
    userId,
    email: user.email,
    phone: user.phone,
    name: profile.name,
    avatarUrl: profile.avatarUrl,
    goal: profile.goal,
    level: profile.level,
    locale: profile.locale,
    tier: user.tier,
    onboardingCompleted: profile.onboardingCompleted,
  };
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<UserProfileDto> {
  await connectDatabase();
  const profile = await ensureProfile(userId);

  if (input.name !== undefined) profile.name = input.name.trim() || undefined;
  if (input.avatarUrl !== undefined) profile.avatarUrl = input.avatarUrl || undefined;
  if (input.locale !== undefined) profile.locale = input.locale;

  await profile.save();
  return getProfile(userId);
}

export async function deleteAccount(userId: string): Promise<void> {
  await connectDatabase();
  const user = await User.findById(userId);
  if (!user) {
    throw new UserError("NOT_FOUND", "User not found");
  }

  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();
}
