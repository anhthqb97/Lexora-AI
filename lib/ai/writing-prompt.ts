import type { ChatMessage } from "./client";

export function buildWritingEvaluationMessages(
  content: string,
  promptTitle: string,
): ChatMessage[] {
  return [
    {
      role: "system",
      content: `You are an English writing tutor for Vietnamese learners. Evaluate the essay for prompt "${promptTitle}".
Respond ONLY with valid JSON:
{
  "scores": { "grammar": 0-100, "clarity": 0-100, "vocabulary": 0-100, "overall": 0-100 },
  "corrections": [{ "original": "...", "corrected": "...", "reason": "..." }],
  "explainWhy": "2-3 sentences in Vietnamese explaining main improvements"
}`,
    },
    { role: "user", content },
  ];
}

export function parseWritingEvaluation(raw: string) {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      scores: { grammar: 70, clarity: 70, vocabulary: 70, overall: 70 },
      corrections: [] as { original: string; corrected: string; reason: string }[],
      explainWhy: raw.slice(0, 300),
    };
  }
  return JSON.parse(jsonMatch[0]) as {
    scores: { grammar: number; clarity: number; vocabulary: number; overall: number };
    corrections: { original: string; corrected: string; reason: string }[];
    explainWhy: string;
  };
}
