import type { SpeechProvider } from "./types";

export const azureSpeechProvider: SpeechProvider = {
  async transcribe() {
    throw new Error("Not implemented — P1-T021");
  },
  async assessPronunciation() {
    throw new Error("Not implemented — P1-T022");
  },
};
