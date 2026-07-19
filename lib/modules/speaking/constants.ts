export const SESSION_TYPES = ["free_talk", "topic", "scenario", "toeic"] as const;
export type SessionType = (typeof SESSION_TYPES)[number];

export const SESSION_STATUSES = [
  "created",
  "active",
  "ending",
  "evaluating",
  "completed",
  "abandoned",
] as const;
export type SessionStatus = (typeof SESSION_STATUSES)[number];

export const SESSION_DURATIONS = [5, 10, 15, 20] as const;
export type SessionDuration = (typeof SESSION_DURATIONS)[number];

export const FREE_TIER_SESSIONS_PER_WEEK = 3;
