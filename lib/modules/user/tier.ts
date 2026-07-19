import { connectDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/modules/auth/models";

export type UserTier = "free" | "paid";

export class TierError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function getUserTier(userId: string): Promise<UserTier> {
  await connectDatabase();
  const user = await User.findById(userId);
  if (!user || user.status !== "active") {
    throw new TierError("NOT_FOUND", "User not found");
  }
  return user.tier;
}

export async function isPaidUser(userId: string): Promise<boolean> {
  const tier = await getUserTier(userId);
  return tier === "paid";
}

export async function requirePaidTier(userId: string): Promise<void> {
  const tier = await getUserTier(userId);
  if (tier !== "paid") {
    throw new TierError("LIMIT_REACHED", "Upgrade to Pro to access this feature");
  }
}

export async function setUserTier(userId: string, tier: UserTier): Promise<UserTier> {
  await connectDatabase();
  const user = await User.findById(userId);
  if (!user || user.status !== "active") {
    throw new TierError("NOT_FOUND", "User not found");
  }

  user.tier = tier;
  await user.save();
  return user.tier;
}

export function canAccessFeature(
  tier: UserTier,
  feature: "speaking" | "toeic_mock" | "business",
): boolean {
  if (tier === "paid") return true;
  if (feature === "business") return false;
  return true; // free tier allowed with quota checks elsewhere
}
