import itBank from "./content/it.json";
import hospitalityBank from "./content/hospitality.json";

export type InterviewQuestion = {
  id: string;
  industry: string;
  question: string;
  followUp: string;
};

const BANKS: Record<string, InterviewQuestion[]> = {
  it: itBank as InterviewQuestion[],
  hospitality: hospitalityBank as InterviewQuestion[],
};

export function listIndustries(): string[] {
  return Object.keys(BANKS);
}

export function getQuestions(industry: string, count = 5): InterviewQuestion[] {
  const bank = BANKS[industry] ?? [];
  return bank.slice(0, count);
}
