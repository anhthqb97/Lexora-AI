import { describe, expect, it } from "vitest";
import {
  scorePronunciation,
  scoreFluency,
  scoreGrammar,
  scoreVocabulary,
  scoreConfidence,
  aggregateTurnScores,
  getTopFocusAreas,
  detectVnAccentIssues,
  adaptLevel,
  applyExamGuardrail,
  detectGrammarImprovements,
  generateEncouragement,
  generateExplainWhySummary,
  scoreTurn,
} from "@/lib/modules/speaking/evaluation";

describe("speaking evaluation", () => {
  const pronunciation = { accuracy: 85, fluency: 80, completeness: 90 };

  it("scores pronunciation from speech provider", () => {
    const score = scorePronunciation(pronunciation, "Hello world");
    expect(score).toBeGreaterThan(70);
  });

  it("penalizes fillers in fluency", () => {
    const clean = scoreFluency("I like reading books every day.", 7);
    const fillers = scoreFluency("I um like uh reading you know books.", 7);
    expect(clean).toBeGreaterThan(fillers);
  });

  it("detects grammar patterns", () => {
    expect(scoreGrammar("I go to school yesterday")).toBeLessThan(85);
  });

  it("scores vocabulary by variety", () => {
    const score = scoreVocabulary("reading books learning english daily practice", "B1");
    expect(score).toBeGreaterThan(60);
  });

  it("aggregates confidence from dimensions", () => {
    const score = scoreConfidence("I enjoy reading books every day.", {
      pronunciation: 80,
      fluency: 75,
      grammar: 70,
      vocabulary: 72,
    });
    expect(score).toBeGreaterThan(50);
  });

  it("aggregates turn scores", () => {
    const result = aggregateTurnScores([
      { pronunciation: 80, fluency: 70, grammar: 75, vocabulary: 72, confidence: 78 },
      { pronunciation: 90, fluency: 85, grammar: 80, vocabulary: 82, confidence: 88 },
    ]);
    expect(result.pronunciation).toBe(85);
  });

  it("returns top 3 focus areas", () => {
    const areas = getTopFocusAreas({
      pronunciation: 90,
      fluency: 85,
      grammar: 60,
      vocabulary: 70,
      confidence: 75,
    });
    expect(areas).toHaveLength(3);
    expect(areas[0]).toBe("Ngữ pháp");
  });

  it("detects VN accent patterns", () => {
    const tips = detectVnAccentIssues("I have tree books");
    expect(tips.length).toBeGreaterThan(0);
  });

  it("adapts level up on high scores", () => {
    expect(adaptLevel("B1", 90)).toBe("B2");
    expect(adaptLevel("B1", 50)).toBe("A2");
  });

  it("applies exam guardrail without attempt", () => {
    const result = applyExamGuardrail("Here is the answer...", "toeic", false);
    expect(result).toContain("try giving your own answer");
  });

  it("detects grammar improvements", () => {
    const items = detectGrammarImprovements("I go to school yesterday");
    expect(items.length).toBeGreaterThan(0);
  });

  it("generates encouragement by score", () => {
    expect(generateEncouragement(90)).toContain("Xuất sắc");
    expect(generateEncouragement(60)).toContain("Cố gắng");
  });

  it("generates explain-why summary", () => {
    const summary = generateExplainWhySummary(
      { pronunciation: 80, fluency: 75, grammar: 60, vocabulary: 70, confidence: 72 },
      [{ original: "I go", corrected: "I went", reason: "past tense" }],
      ["Ngữ pháp"],
    );
    expect(summary).toContain("Ngữ pháp");
  });

  it("scores full turn", () => {
    const scores = scoreTurn("I like reading books.", pronunciation, "B1");
    expect(scores.confidence).toBeDefined();
    expect(scores.pronunciation).toBeDefined();
  });
});
