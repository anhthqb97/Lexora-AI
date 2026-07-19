import type { SpeechProvider } from "./types";

export const whisperLocalProvider: SpeechProvider = {
  async transcribe() {
    throw new Error("Not implemented — optional local Whisper");
  },
  async assessPronunciation() {
    throw new Error("Whisper local does not support pronunciation assessment");
  },
};
