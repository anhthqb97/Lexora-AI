import { describe, expect, it, vi, afterEach } from "vitest";
import { createRemoteSpeechProvider } from "@/lib/speech/remote";

describe("createRemoteSpeechProvider", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls speech-service transcribe endpoint", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ text: "hi", confidence: 0.9 }), { status: 200 }),
      );

    const provider = createRemoteSpeechProvider("http://localhost:8082");
    const result = await provider.transcribe(Buffer.from("audio"));

    expect(result.text).toBe("hi");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8082/v1/transcribe",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
