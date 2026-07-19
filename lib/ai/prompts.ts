import { readFileSync } from "fs";
import { join } from "path";

const PROMPTS_DIR = join(process.cwd(), "docs/AI");

const promptCache = new Map<string, string>();

export function loadPrompt(name: string): string {
  const cached = promptCache.get(name);
  if (cached) return cached;

  const fileMap: Record<string, string> = {
    "tutor-speaking": "tutor-speaking-prompt.md",
    guardrails: "guardrails.md",
  };

  const filename = fileMap[name] ?? `${name}.md`;
  const filepath = join(PROMPTS_DIR, filename);
  const raw = readFileSync(filepath, "utf-8");

  const systemMatch = raw.match(/## System Prompt\s+```\s*([\s\S]*?)```/);
  const content = systemMatch?.[1]?.trim() ?? raw;
  promptCache.set(name, content);
  return content;
}

export function loadSpeakingSystemPrompt(): string {
  const tutor = loadPrompt("tutor-speaking");
  const guardrails = loadPrompt("guardrails");
  return `${tutor}\n\n---\n\nGUARDRAILS:\n${guardrails.slice(0, 2000)}`;
}
