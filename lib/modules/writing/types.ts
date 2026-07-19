export type WritingPrompt = {
  id: string;
  title: string;
  titleVi: string;
  level: string;
  minWords: number;
  maxWords: number;
};

export type WritingScores = {
  grammar: number;
  clarity: number;
  vocabulary: number;
  overall: number;
};

export type WritingCorrection = {
  original: string;
  corrected: string;
  reason: string;
};

export type WritingSubmission = {
  id: string;
  userId: string;
  promptId: string;
  content: string;
  wordCount: number;
  scores: WritingScores;
  corrections: WritingCorrection[];
  explainWhy: string;
  createdAt: Date;
};
