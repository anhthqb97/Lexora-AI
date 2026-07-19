import type { PronunciationScores, SpeechProvider, SpeechTranscript } from "./types";

export function createRemoteSpeechProvider(baseUrl: string): SpeechProvider {
  const url = baseUrl.replace(/\/$/, "");

  return {
    async transcribe(audio: Buffer): Promise<SpeechTranscript> {
      const res = await fetch(`${url}/v1/transcribe`, {
        method: "POST",
        headers: { "Content-Type": "audio/wav" },
        body: new Uint8Array(audio),
      });
      if (!res.ok) {
        throw new Error(`speech-service transcribe failed: ${res.status}`);
      }
      return (await res.json()) as SpeechTranscript;
    },

    async assessPronunciation(audio: Buffer, referenceText: string): Promise<PronunciationScores> {
      const res = await fetch(`${url}/v1/pronunciation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceText, audioLength: audio.length }),
      });
      if (!res.ok) {
        throw new Error(`speech-service pronunciation failed: ${res.status}`);
      }
      return (await res.json()) as PronunciationScores;
    },
  };
}
