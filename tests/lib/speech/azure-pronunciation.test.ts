import { describe, expect, it } from "vitest";
import { azureSpeechProvider } from "@/lib/speech/azure";

describe("Azure pronunciation scoring", () => {
  it("returns scores for reference text", async () => {
    const scores = await azureSpeechProvider.assessPronunciation(
      Buffer.from("audio"),
      "Hello world",
    );
    expect(scores.accuracy).toBeGreaterThan(0);
    expect(scores.fluency).toBeGreaterThan(0);
    expect(scores.completeness).toBeGreaterThan(0);
  });
});
