export const ATTEMPT_TYPES = ["diagnostic", "mock"] as const;
export type AttemptType = (typeof ATTEMPT_TYPES)[number];

export const ATTEMPT_STATUSES = ["in_progress", "completed", "abandoned"] as const;
export type AttemptStatus = (typeof ATTEMPT_STATUSES)[number];

export const SECTIONS = ["listening", "reading"] as const;
export type ToeicSection = (typeof SECTIONS)[number];

export const SKILL_TAGS = [
  "listening-detail",
  "listening-inference",
  "grammar",
  "vocabulary",
  "reading-detail",
  "reading-inference",
] as const;
export type SkillTag = (typeof SKILL_TAGS)[number];

/** Diagnostic: 40 questions (~30 min) */
export const DIAGNOSTIC_QUESTION_COUNT = 40;
export const DIAGNOSTIC_DURATION_MINUTES = 30;

/** Full mock: 200 questions (100 L + 100 R) */
export const MOCK_QUESTION_COUNT = 200;
export const MOCK_LISTENING_COUNT = 100;
export const MOCK_READING_COUNT = 100;
export const MOCK_DURATION_MINUTES = 120;

export const MOCK_FORM_ID = "MOCK-001";

export const TOEIC_SCORE_MIN = 10;
export const TOEIC_SECTION_MAX = 495;
export const TOEIC_SECTION_MIN = 5;
