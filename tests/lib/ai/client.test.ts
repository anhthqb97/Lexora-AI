import { describe, expect, it } from "vitest";
import { chatCompletionOrStub } from "@/lib/ai/client";

describe("OpenAI client", () => {
  it("returns stub response without API key", async () => {
    const prev = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const result = await chatCompletionOrStub([{ role: "user", content: "Hello" }]);

    expect(result.model).toBe("stub");
    expect(result.content).toContain("Hello");

    if (prev) process.env.OPENAI_API_KEY = prev;
  });
});
