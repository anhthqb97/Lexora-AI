import { describe, expect, it } from "vitest";
import { getDailyPrompt } from "@/lib/modules/speaking/challenge-prompts";

describe("getDailyPrompt", () => {
  it("returns stable prompt for a given day", () => {
    const a = getDailyPrompt(new Date("2026-07-20T10:00:00.000Z"));
    const b = getDailyPrompt(new Date("2026-07-20T22:00:00.000Z"));
    expect(a.dayKey).toBe("2026-07-20");
    expect(a.prompt).toBe(b.prompt);
    expect(a.prompt.length).toBeGreaterThan(10);
  });
});
