const BLOCKED_PATTERNS = [
  /\bignore\s+(all\s+)?previous\s+instructions\b/i,
  /\b(kill|murder|suicide)\b/i,
  /\b(credit\s+card|ssn|social\s+security)\s*[:=]\s*\d/i,
];

const PROFANITY = /\b(fuck|shit|damn)\b/i;

export class ModerationError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export function filterInput(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new ModerationError("VALIDATION_ERROR");
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      throw new ModerationError("CONTENT_BLOCKED");
    }
  }

  if (PROFANITY.test(trimmed)) {
    throw new ModerationError("CONTENT_BLOCKED");
  }

  return trimmed;
}

export function filterOutput(text: string): string {
  if (!text.trim()) {
    return "I'm here to help you practice English. Could you try again?";
  }

  if (text.length > 2500) {
    return text.slice(0, 2500) + "…";
  }

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return "Let's focus on English practice. What would you like to talk about?";
    }
  }

  if (/\bI am a native speaker from\b/i.test(text)) {
    return "I'm Lexora, your AI English coach. How can I help you practice today?";
  }

  return text;
}
