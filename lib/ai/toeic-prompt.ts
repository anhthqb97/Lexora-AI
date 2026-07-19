import fs from "node:fs";
import path from "node:path";

const PROMPT_PATH = path.join(process.cwd(), "docs/AI/tutor-toeic-prompt.md");

const FALLBACK_PROMPT = `You are Lexora, an AI TOEIC tutor for Vietnamese learners.
Explain why answers are correct or incorrect clearly and concisely.
Do not give away answers to future questions. Focus on grammar, vocabulary, and context clues.`;

export function loadToeicTutorPrompt(): string {
  try {
    const raw = fs.readFileSync(PROMPT_PATH, "utf8");
    const match = raw.match(/```\n([\s\S]*?)```/);
    return match?.[1]?.trim() ?? FALLBACK_PROMPT;
  } catch {
    return FALLBACK_PROMPT;
  }
}
