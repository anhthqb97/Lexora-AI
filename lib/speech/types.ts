export type SpeechTranscript = {
  text: string;
  confidence: number;
};

export type PronunciationScores = {
  accuracy: number;
  fluency: number;
  completeness: number;
};

export interface SpeechProvider {
  transcribe(_audio: Buffer): Promise<SpeechTranscript>;
  assessPronunciation(_audio: Buffer, _referenceText: string): Promise<PronunciationScores>;
}
