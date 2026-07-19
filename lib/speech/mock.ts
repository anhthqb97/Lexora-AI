import type { PronunciationScores, SpeechProvider, SpeechTranscript } from "./types";

export const mockSpeechProvider: SpeechProvider = {
  async transcribe(): Promise<SpeechTranscript> {
    return { text: "Hello, this is a mock transcript.", confidence: 0.95 };
  },
  async assessPronunciation(): Promise<PronunciationScores> {
    return { accuracy: 85, fluency: 80, completeness: 90 };
  },
};
