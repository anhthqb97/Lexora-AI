import type { WritingPrompt } from "./types";

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: "W-01",
    title: "My daily routine",
    titleVi: "Thói quen hàng ngày",
    level: "A2",
    minWords: 80,
    maxWords: 150,
  },
  {
    id: "W-02",
    title: "A place I want to visit",
    titleVi: "Nơi tôi muốn đến",
    level: "A2–B1",
    minWords: 100,
    maxWords: 180,
  },
  {
    id: "W-03",
    title: "Technology in my life",
    titleVi: "Công nghệ trong cuộc sống",
    level: "B1",
    minWords: 120,
    maxWords: 200,
  },
  {
    id: "W-04",
    title: "A memorable experience",
    titleVi: "Trải nghiệm đáng nhớ",
    level: "B1–B2",
    minWords: 150,
    maxWords: 250,
  },
  {
    id: "W-05",
    title: "Work-life balance",
    titleVi: "Cân bằng công việc và cuộc sống",
    level: "B2",
    minWords: 150,
    maxWords: 280,
  },
];

export function getPrompt(id: string): WritingPrompt | undefined {
  return WRITING_PROMPTS.find((p) => p.id === id);
}

export function listPrompts(): WritingPrompt[] {
  return WRITING_PROMPTS;
}
