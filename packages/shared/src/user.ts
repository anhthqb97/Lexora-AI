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

export type DashboardData = {
  profile: UserProfile;
  speaking: SpeakingProgressSummary;
  toeic: ToeicProgressSummary;
};

export type SpeakingProgressSummary = {
  sessionCount: number;
  totalPracticeMinutes: number;
  averageConfidence?: number;
  weeklyUsed?: number;
  weeklyLimit?: number;
};

export type ToeicProgressSummary = {
  diagnosticCompleted: boolean;
  mocksUsedThisMonth: number;
  mockLimit: number;
  mocksRemaining: number;
  latestScore?: number;
};
