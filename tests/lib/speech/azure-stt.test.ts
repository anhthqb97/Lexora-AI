import { describe, expect, it } from "vitest";
import { azureSpeechProvider } from "@/lib/speech/azure";

describe("Azure STT", () => {
  it("returns stub transcript without Azure key", async () => {
    const prev = process.env.AZURE_SPEECH_KEY;
    delete process.env.AZURE_SPEECH_KEY;

    const result = await azureSpeechProvider.transcribe(Buffer.from("fake-audio"));
    expect(result.text).toContain("azure-stub");
    expect(result.confidence).toBeGreaterThan(0);

    if (prev) process.env.AZURE_SPEECH_KEY = prev;
  });
});
