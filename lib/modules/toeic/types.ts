import type { AttemptStatus, AttemptType, SkillTag, ToeicSection } from "./constants";

export type ToeicChoice = {
  id: string;
  text: string;
};

export type ToeicQuestion = {
  id: string;
  section: ToeicSection;
  part: number;
  skill: SkillTag;
  questionText: string;
  choices: ToeicChoice[];
  correctChoiceId: string;
  stimulus?: string;
  audioUrl?: string;
  explanation?: string;
  difficulty: number;
};

export type ToeicAnswer = {
  questionId: string;
  choiceId: string;
  isCorrect: boolean;
  explainWhy?: string;
};

export type SectionScores = {
  listening: number;
  reading: number;
};

export type ToeicAttempt = {
  id: string;
  userId: string;
  type: AttemptType;
  status: AttemptStatus;
  formId?: string;
  questionIds: string[];
  answers: ToeicAnswer[];
  sectionScores?: SectionScores;
  totalScore?: number;
  weakAreas?: string[];
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ToeicReport = {
  attemptId: string;
  type: AttemptType;
  totalScore: number;
  sectionScores: SectionScores;
  weakAreas: string[];
  correctCount: number;
  totalQuestions: number;
  wrongAnswers: Array<{
    questionId: string;
    questionText: string;
    userChoiceId: string;
    correctChoiceId: string;
    explainWhy: string;
  }>;
  completedAt?: Date;
};

export type ToeicLimitStatus = {
  diagnosticCompleted: boolean;
  mocksUsedThisMonth: number;
  mockLimit: number;
  mocksRemaining: number;
  isPaid: boolean;
};

export type StartAttemptInput = {
  type: AttemptType;
  formId?: string;
};

export type SubmitAnswerInput = {
  questionId: string;
  choiceId: string;
};

export type FinishAttemptInput = {
  attemptId: string;
};
