export type UserGoal = "toeic" | "speaking" | "business" | "general";
export type UserLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type UserLocale = "vi" | "en";

export type UserProfile = {
  userId: string;
  email?: string;
  phone?: string;
  name?: string;
  avatarUrl?: string;
  goal?: UserGoal;
  level?: UserLevel;
  locale: UserLocale;
  tier: "free" | "paid";
  onboardingCompleted: boolean;
};

export type UpdateProfileInput = {
  name?: string;
  avatarUrl?: string;
  locale?: UserLocale;
};
