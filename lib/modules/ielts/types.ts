export type IeltsSkill = "listening" | "reading" | "writing" | "speaking";

export type IeltsDiagnosticResult = {
  id: string;
  userId: string;
  overallBand: number;
  skills: Record<IeltsSkill, number>;
  weakAreas: string[];
  completedAt: string;
};

export type StartIeltsDiagnosticInput = {
  targetBand?: number;
};
