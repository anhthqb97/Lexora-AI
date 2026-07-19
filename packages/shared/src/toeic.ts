export type ToeicSection = "listening" | "reading";
export type AttemptType = "diagnostic" | "mock";
export type AttemptStatus = "in_progress" | "completed" | "expired";

export type ToeicChoice = {
  id: string;
  text: string;
};

export type ToeicQuestion = {
  id: string;
  section: ToeicSection;
  part: number;
  skill: string;
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
  startedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ToeicLimitStatus = {
  diagnosticCompleted: boolean;
  mocksUsedThisMonth: number;
  mockLimit: number;
  mocksRemaining: number;
  isPaid: boolean;
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
  completedAt?: string;
};

export type MockExamStart = {
  attempt: ToeicAttempt;
  questions: ToeicQuestion[];
};
