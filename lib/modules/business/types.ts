export type BusinessScenarioType = "meeting" | "email" | "presentation";

export type BusinessScenario = {
  id: string;
  title: string;
  titleVi: string;
  type: BusinessScenarioType;
  level: string;
  opener: string;
  description: string;
};

export type BusinessSessionSummary = {
  scenarioId: string;
  scenarioTitle: string;
  formalToneScore: number;
  completedAt: string;
};
