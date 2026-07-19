export type InterviewIndustry = "it" | "hospitality";

export type InterviewQuestion = {
  id: string;
  industry: InterviewIndustry;
  question: string;
  questionVi: string;
  timeLimitSeconds: number;
  difficulty: string;
};

export type InterviewSession = {
  id: string;
  userId: string;
  industry: InterviewIndustry;
  status: "in_progress" | "completed";
  currentIndex: number;
  totalQuestions: number;
  startedAt: string;
  completedAt?: string;
};

export type InterviewAnswer = {
  questionId: string;
  transcript: string;
  feedback: string;
  score: number;
};
