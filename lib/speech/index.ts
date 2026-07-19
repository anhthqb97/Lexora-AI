import { azureSpeechProvider } from "./azure";
import { mockSpeechProvider } from "./mock";
import type { SpeechProvider } from "./types";
import { whisperLocalProvider } from "./whisper-local";

export type SpeechProviderName = "mock" | "whisper-local" | "azure";

export function getSpeechProvider(): SpeechProvider {
  const provider = (process.env.SPEECH_PROVIDER ?? "mock") as SpeechProviderName;

  switch (provider) {
    case "azure":
      return azureSpeechProvider;
    case "whisper-local":
      return whisperLocalProvider;
    case "mock":
    default:
      return mockSpeechProvider;
  }
}
