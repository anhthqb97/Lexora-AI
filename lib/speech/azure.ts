import type { SpeechProvider, SpeechTranscript } from "./types";

const AZURE_STT_URL = (region: string) =>
  `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;

function getAzureConfig() {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION ?? "southeastasia";
  if (!key) {
    throw new Error("AZURE_SPEECH_KEY is not configured");
  }
  return { key, region };
}

async function azureTranscribe(audio: Buffer): Promise<SpeechTranscript> {
  const { key, region } = getAzureConfig();

  const res = await fetch(AZURE_STT_URL(region), {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "audio/wav",
    },
    body: new Uint8Array(audio),
  });

  if (!res.ok) {
    throw new Error(`Azure STT error: ${res.status}`);
  }

  const data = (await res.json()) as {
    DisplayText?: string;
    NBest?: { Display: string; Confidence: number }[];
  };

  const text = data.DisplayText ?? data.NBest?.[0]?.Display ?? "";
  const confidence = data.NBest?.[0]?.Confidence ?? 0.9;

  return { text, confidence };
}

export const azureSpeechProvider: SpeechProvider = {
  async transcribe(audio: Buffer): Promise<SpeechTranscript> {
    if (!process.env.AZURE_SPEECH_KEY) {
      return { text: "[azure-stub] Hello from speech recognition.", confidence: 0.85 };
    }
    return azureTranscribe(audio);
  },
  async assessPronunciation() {
    throw new Error("Not implemented — P1-T022");
  },
};
