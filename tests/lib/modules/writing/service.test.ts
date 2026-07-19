import { describe, expect, it } from "vitest";
import { parseWritingEvaluation } from "@/lib/ai/writing-prompt";
import { listPrompts } from "@/lib/modules/writing/content";

describe("writing module", () => {
  it("lists prompts", () => {
    expect(listPrompts().length).toBeGreaterThanOrEqual(5);
  });

  it("parses evaluation JSON", () => {
    const raw = `{"scores":{"grammar":80,"clarity":75,"vocabulary":70,"overall":75},"corrections":[],"explainWhy":"Good job"}`;
    const parsed = parseWritingEvaluation(raw);
    expect(parsed.scores.overall).toBe(75);
  });
});
