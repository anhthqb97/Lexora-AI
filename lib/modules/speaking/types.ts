import type { SessionDuration, SessionStatus, SessionType } from "./constants";

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
  startedAt?: Date;
  endedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SpeakingTurn = {
  id: string;
  sessionId: string;
  turnNumber: number;
  role: "user" | "assistant";
  transcript?: string;
  aiResponse?: string;
  scores?: TurnScores;
  createdAt: Date;
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
  createdAt: Date;
};

export type CreateSessionInput = {
  type: SessionType;
  topicId?: string;
  scenarioId?: string;
  durationMinutes: SessionDuration;
  vietnameseHelp?: boolean;
};

export type ProcessTurnInput = {
  sessionId: string;
  userId: string;
  audioBase64?: string;
  transcript?: string;
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
  currentLevel?: string;
};

export type SpeakingProgress = {
  sessionCount: number;
  totalPracticeMinutes: number;
  averageConfidence?: number;
  weeklyUsed?: number;
  weeklyLimit?: number;
};

export type ScoreTrendPoint = {
  date: string;
  confidence: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
};

export type SpeakingTrends = {
  days: number;
  points: ScoreTrendPoint[];
};

export type SpeakingSessionDTO = SpeakingSession;
export type SpeakingSummaryDTO = SpeakingSummary;
