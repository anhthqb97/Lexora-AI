import { describe, expect, it } from "vitest";
import { loadPrompt, loadSpeakingSystemPrompt } from "@/lib/ai/prompts";

describe("prompt loader", () => {
  it("loads tutor-speaking prompt from docs/AI", () => {
    const prompt = loadPrompt("tutor-speaking");
    expect(prompt).toContain("Lexora");
    expect(prompt).toContain("English speaking coach");
  });

  it("combines tutor prompt with guardrails", () => {
    const combined = loadSpeakingSystemPrompt();
    expect(combined).toContain("GUARDRAILS");
  });
});
