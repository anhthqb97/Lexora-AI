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

export type TurnScores = {
  pronunciation?: number;
  fluency?: number;
  grammar?: number;
  vocabulary?: number;
  confidence?: number;
};

export type SpeakingSession = {
  id: string;
  userId: string;
  type: SessionType;
  topicId?: string;
  scenarioId?: string;
  durationMinutes: SessionDuration;
  status: SessionStatus;
  vietnameseHelp: boolean;
  currentLevel?: string;
  startedAt?: string;
  endedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type SpeakingTurn = {
  id: string;
  sessionId: string;
  turnNumber: number;
  role: "user" | "assistant";
  transcript?: string;
  aiResponse?: string;
  scores?: TurnScores;
  createdAt: string;
};

export type SpeakingSummary = {
  id: string;
  sessionId: string;
  userId: string;
  overallConfidence: number;
  dimensions: Required<TurnScores>;
  improvements: Array<{ original: string; corrected: string; reason: string }>;
  topFocusAreas: string[];
  encouragement: string;
  explainWhy?: string;
  flaggedPhrases?: Array<{ original: string; corrected: string; reason: string }>;
  createdAt: string;
};

export type CreateSessionInput = {
  type: SessionType;
  topicId?: string;
  scenarioId?: string;
  durationMinutes: SessionDuration;
  vietnameseHelp?: boolean;
};

export type TurnResult = {
  turnNumber: number;
  transcript: string;
  aiResponse: string;
  scores?: TurnScores;
  inlineCorrection?: { original: string; corrected: string; reason: string };
  vietnameseHelp?: string;
};

export type SessionWithTurns = SpeakingSession & {
  turns: SpeakingTurn[];
  greeting?: string;
};

export type SpeakingTopic = {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  description?: string;
};

export type SpeakingScenario = {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  role: string;
  setting: string;
};

export type DailyChallenge = {
  date: string;
  prompt: string;
  promptVi: string;
  streak: number;
  completedToday: boolean;
};
