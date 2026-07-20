import fs from "fs";
import path from "path";
import type { InterviewIndustry, InterviewQuestion } from "./types";

const BANK_FILES: Record<InterviewIndustry, string> = {
  it: "interview-it.json",
  hospitality: "interview-hospitality.json",
};

function loadFile(industry: InterviewIndustry): InterviewQuestion[] {
  const filePath = path.join(process.cwd(), "content", BANK_FILES[industry]);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as InterviewQuestion[];
}

export function listIndustries(): InterviewIndustry[] {
  return ["it", "hospitality"];
}

export function loadQuestionBank(industry: string): InterviewQuestion[] {
  if (industry !== "it" && industry !== "hospitality") return [];
  return loadFile(industry);
}

export function getQuestions(industry: string, count = 5): InterviewQuestion[] {
  return loadQuestionBank(industry).slice(0, count);
}
