import { azureSpeechProvider } from "./azure";
import { mockSpeechProvider } from "./mock";
import { createRemoteSpeechProvider } from "./remote";
import type { SpeechProvider } from "./types";
import { whisperLocalProvider } from "./whisper-local";

export type SpeechProviderName = "mock" | "whisper-local" | "azure";

export function getSpeechProvider(): SpeechProvider {
  const serviceUrl = process.env.SPEECH_SERVICE_URL;
  if (serviceUrl) {
    return createRemoteSpeechProvider(serviceUrl);
  }

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
