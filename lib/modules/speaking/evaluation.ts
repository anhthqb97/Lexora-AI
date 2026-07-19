import type { PronunciationScores } from "@/lib/speech/types";
import type { TurnScores } from "./types";

export type ImprovementItem = {
  original: string;
  corrected: string;
  reason: string;
};

export type InlineCorrection = {
  original: string;
  corrected: string;
  reason: string;
};

const FILLER_PATTERN = /\b(um+|uh+|er+|like|you know|sort of|kind of)\b/gi;

const VN_ACCENT_PATTERNS: Array<{ pattern: RegExp; tip: string }> = [
  { pattern: /\btree\b/i, tip: "Final 'ee' sounds — try 'three' with a soft 'th'" },
  { pattern: /\bdis\b/i, tip: "Initial 'd' vs 'th' — 'this' uses tongue between teeth" },
  { pattern: /\bved\b/i, tip: "Final consonant clusters — 'went' not 'wen'" },
  { pattern: /\bhe\b/i, tip: "Short 'i' vs long 'ee' — 'he' vs 'hi'" },
];

const GRAMMAR_PATTERNS: Array<{
  pattern: RegExp;
  corrected: string;
  reason: string;
}> = [
  {
    pattern: /\bi go to\b/i,
    corrected: "I went to",
    reason: "Use past tense for finished actions",
  },
  {
    pattern: /\bhe don't\b/i,
    corrected: "he doesn't",
    reason: "Third person singular uses 'doesn't'",
  },
  {
    pattern: /\bshe don't\b/i,
    corrected: "she doesn't",
    reason: "Third person singular uses 'doesn't'",
  },
  {
    pattern: /\bi am agree\b/i,
    corrected: "I agree",
    reason: "'Agree' is a verb — no 'am' needed",
  },
  {
    pattern: /\bmore better\b/i,
    corrected: "better",
    reason: "'Better' is already comparative — drop 'more'",
  },
];

const LEVEL_GUIDE: Record<string, { maxWords: number; vocabComplexity: number }> = {
  A1: { maxWords: 8, vocabComplexity: 0.3 },
  A2: { maxWords: 12, vocabComplexity: 0.4 },
  B1: { maxWords: 18, vocabComplexity: 0.55 },
  B2: { maxWords: 25, vocabComplexity: 0.7 },
  C1: { maxWords: 35, vocabComplexity: 0.85 },
};

/** P1-T039: pronunciation scoring from speech provider */
export function scorePronunciation(pronunciation: PronunciationScores, transcript: string): number {
  const base = (pronunciation.accuracy + pronunciation.fluency + pronunciation.completeness) / 3;
  const vnPenalty = detectVnAccentIssues(transcript).length * 2;
  return clampScore(base - vnPenalty);
}

/** P1-T040: fluency scoring from pace and fillers */
export function scoreFluency(transcript: string, wordCount: number): number {
  const fillers = (transcript.match(FILLER_PATTERN) ?? []).length;
  const fillerPenalty = Math.min(fillers * 5, 25);
  const lengthBonus = wordCount >= 8 ? 10 : wordCount >= 4 ? 5 : 0;
  const paceScore = wordCount >= 15 ? 85 : wordCount >= 8 ? 75 : wordCount >= 4 ? 65 : 50;
  return clampScore(paceScore + lengthBonus - fillerPenalty);
}

/** P1-T041: grammar scoring via pattern detection */
export function scoreGrammar(transcript: string): number {
  let score = 85;
  for (const rule of GRAMMAR_PATTERNS) {
    if (rule.pattern.test(transcript)) score -= 10;
  }
  const sentences = transcript.split(/[.!?]+/).filter(Boolean);
  if (sentences.length === 0) return 50;
  const avgLen = transcript.split(/\s+/).length / sentences.length;
  if (avgLen < 3) score -= 10;
  return clampScore(score);
}

/** P1-T042: vocabulary scoring by word variety */
export function scoreVocabulary(transcript: string, level: string): number {
  const words = transcript.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 50;
  const unique = new Set(words);
  const varietyRatio = unique.size / words.length;
  const guide = LEVEL_GUIDE[level] ?? LEVEL_GUIDE.B1;
  const avgWordLen = words.reduce((s, w) => s + w.length, 0) / words.length;
  const complexityBonus = avgWordLen > 5 ? 10 : 0;
  const base = 60 + varietyRatio * 30 + complexityBonus * guide.vocabComplexity;
  return clampScore(base);
}

/** P1-T043: confidence score aggregation */
export function scoreConfidence(
  transcript: string,
  turnScores: Omit<TurnScores, "confidence">,
): number {
  const words = transcript.split(/\s+/).filter(Boolean);
  const lengthScore = Math.min(words.length * 4, 40);
  const avgOther =
    ((turnScores.pronunciation ?? 70) +
      (turnScores.fluency ?? 70) +
      (turnScores.grammar ?? 70) +
      (turnScores.vocabulary ?? 70)) /
    4;
  const hesitationPenalty = (transcript.match(/\.\.\.|—/g) ?? []).length * 5;
  return clampScore(lengthScore + avgOther * 0.6 - hesitationPenalty);
}

export function aggregateTurnScores(scores: TurnScores[]): Required<TurnScores> {
  if (scores.length === 0) {
    return {
      pronunciation: 70,
      fluency: 70,
      grammar: 70,
      vocabulary: 70,
      confidence: 70,
    };
  }
  type Totals = {
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
    confidence: number;
  };
  const sum = scores.reduce<Totals>(
    (acc, s) => ({
      pronunciation: acc.pronunciation + (s.pronunciation ?? 70),
      fluency: acc.fluency + (s.fluency ?? 70),
      grammar: acc.grammar + (s.grammar ?? 70),
      vocabulary: acc.vocabulary + (s.vocabulary ?? 70),
      confidence: acc.confidence + (s.confidence ?? 70),
    }),
    { pronunciation: 0, fluency: 0, grammar: 0, vocabulary: 0, confidence: 0 },
  );
  const n = scores.length;
  return {
    pronunciation: Math.round(sum.pronunciation / n),
    fluency: Math.round(sum.fluency / n),
    grammar: Math.round(sum.grammar / n),
    vocabulary: Math.round(sum.vocabulary / n),
    confidence: Math.round(sum.confidence / n),
  };
}

/** P1-T044: top 3 improvement areas */
export function getTopFocusAreas(dimensions: Required<TurnScores>): string[] {
  const areas: Array<{ name: string; score: number }> = [
    { name: "Phát âm", score: dimensions.pronunciation },
    { name: "Trôi chảy", score: dimensions.fluency },
    { name: "Ngữ pháp", score: dimensions.grammar },
    { name: "Từ vựng", score: dimensions.vocabulary },
    { name: "Tự tin", score: dimensions.confidence },
  ];
  return areas
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((a) => a.name);
}

/** P1-T045: VN accent tuning validation */
export function detectVnAccentIssues(transcript: string): string[] {
  return VN_ACCENT_PATTERNS.filter((p) => p.pattern.test(transcript)).map((p) => p.tip);
}

export function validateVnAccentTuning(transcript: string): {
  passed: boolean;
  tips: string[];
} {
  const tips = detectVnAccentIssues(transcript);
  return { passed: tips.length === 0, tips };
}

/** P1-T046: pick follow-up question */
export function pickFollowUp(followUps: string[], turnNumber: number): string | undefined {
  if (followUps.length === 0) return undefined;
  return followUps[(turnNumber - 1) % followUps.length];
}

/** P1-T047: dynamic level adaptation */
export function adaptLevel(currentLevel: string, avgScore: number): string {
  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const idx = levels.indexOf(currentLevel);
  if (idx === -1) return "B1";
  if (avgScore >= 85 && idx < levels.length - 1) return levels[idx + 1];
  if (avgScore < 55 && idx > 0) return levels[idx - 1];
  return currentLevel;
}

export function getLevelPromptHint(level: string): string {
  const guide = LEVEL_GUIDE[level] ?? LEVEL_GUIDE.B1;
  return `Use sentences of max ${guide.maxWords} words. CEFR level: ${level}.`;
}

/** P1-T048: exam answer guardrail */
export function applyExamGuardrail(
  aiResponse: string,
  sessionType: string,
  userAttempted: boolean,
): string {
  if (sessionType !== "toeic") return aiResponse;
  if (userAttempted) return aiResponse;
  return (
    "That's a great topic! Before I share ideas, try giving your own answer first — " +
    "even a short attempt helps you learn. What would you say?"
  );
}

/** P1-T055: inline gentle corrections */
export function detectGrammarImprovements(transcript: string): ImprovementItem[] {
  const items: ImprovementItem[] = [];
  for (const rule of GRAMMAR_PATTERNS) {
    const match = transcript.match(rule.pattern);
    if (match) {
      items.push({
        original: match[0],
        corrected: rule.corrected,
        reason: rule.reason,
      });
    }
  }
  return items.slice(0, 2);
}

export function buildInlineCorrection(transcript: string): InlineCorrection | null {
  const items = detectGrammarImprovements(transcript);
  return items[0] ?? null;
}

export function weaveInlineCorrection(
  aiResponse: string,
  correction: InlineCorrection | null,
): string {
  if (!correction) return aiResponse;
  return (
    `${aiResponse}\n\n` +
    `💡 Good try! Instead of "${correction.original}", try "${correction.corrected}" — ${correction.reason}.`
  );
}

/** P1-T052: session end encouragement */
export function generateEncouragement(overallScore: number): string {
  if (overallScore >= 85) {
    return "Xuất sắc! Bạn nói rất tự tin hôm nay. Hãy tiếp tục duy trì nhé! 🎉";
  }
  if (overallScore >= 70) {
    return "Làm tốt lắm! Bạn đã tiến bộ rõ rệt. Buổi luyện tiếp theo sẽ còn hay hơn! 💪";
  }
  return "Cố gắng tuyệt vời! Mỗi buổi luyện đều giúp bạn tự tin hơn. Hãy thử lại nhé! 🌟";
}

/** P1-T049: explain-why summary (stub/LLM-ready) */
export function generateExplainWhySummary(
  dimensions: Required<TurnScores>,
  improvements: ImprovementItem[],
  topFocus: string[],
): string {
  const weakest = topFocus[0] ?? "speaking";
  const topIssue = improvements[0];
  let summary = `Buổi luyện của bạn đạt ${dimensions.confidence}/100 điểm tự tin. `;
  summary += `Điểm mạnh nhất là ${getStrongestArea(dimensions)}. `;
  summary += `Cần tập trung cải thiện: ${weakest}. `;
  if (topIssue) {
    summary += `Ví dụ: "${topIssue.original}" → "${topIssue.corrected}" (${topIssue.reason}).`;
  }
  return summary;
}

function getStrongestArea(dimensions: Required<TurnScores>): string {
  const areas: Array<{ name: string; score: number }> = [
    { name: "phát âm", score: dimensions.pronunciation },
    { name: "trôi chảy", score: dimensions.fluency },
    { name: "ngữ pháp", score: dimensions.grammar },
    { name: "từ vựng", score: dimensions.vocabulary },
  ];
  return areas.sort((a, b) => b.score - a.score)[0]?.name ?? "giao tiếp";
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function scoreTurn(
  transcript: string,
  pronunciation: PronunciationScores,
  level: string,
): TurnScores {
  const words = transcript.split(/\s+/).filter(Boolean);
  const pronunciationScore = scorePronunciation(pronunciation, transcript);
  const fluencyScore = scoreFluency(transcript, words.length);
  const grammarScore = scoreGrammar(transcript);
  const vocabularyScore = scoreVocabulary(transcript, level);
  const partial = {
    pronunciation: pronunciationScore,
    fluency: fluencyScore,
    grammar: grammarScore,
    vocabulary: vocabularyScore,
  };
  const confidenceScore = scoreConfidence(transcript, partial);
  return {
    ...partial,
    confidence: confidenceScore,
  };
}
