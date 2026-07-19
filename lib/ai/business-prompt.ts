import fs from "node:fs";
import path from "node:path";
import type { ChatMessage } from "./client";

const PROMPT_PATH = path.join(process.cwd(), "docs/AI/tutor-business-prompt.md");

const FALLBACK = `You are Lexora Business, a formal English coach for Vietnamese professionals.
Use professional register. Give feedback on tone, clarity, and business vocabulary.
Respond in English with brief Vietnamese explanations when helpful.`;

export function loadBusinessTutorPrompt(): string {
  try {
    const raw = fs.readFileSync(PROMPT_PATH, "utf8");
    const match = raw.match(/```\n([\s\S]*?)```/);
    return match?.[1]?.trim() ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export function buildBusinessSessionMessages(
  scenarioTitle: string,
  userTranscript: string,
): ChatMessage[] {
  return [
    { role: "system", content: loadBusinessTutorPrompt() },
    {
      role: "user",
      content: `Scenario: ${scenarioTitle}\nLearner said: ${userTranscript}\nRespond as a business coach with formal tone feedback.`,
    },
  ];
}
