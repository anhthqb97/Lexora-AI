/** Daily speaking challenge prompts — one per calendar day (UTC). */
export const DAILY_CHALLENGE_PROMPTS = [
  "Describe your morning routine in 60 seconds.",
  "Talk about a place you want to visit and why.",
  "Explain your favorite hobby to a friend.",
  "Describe a memorable meal you had recently.",
  "What would you do if you had an extra hour each day?",
  "Talk about a skill you want to learn this year.",
  "Describe your ideal weekend.",
  "Explain how you handle stress at work or school.",
  "Talk about a book, movie, or show you enjoyed.",
  "Describe a person who inspires you.",
  "What is one goal you are working toward?",
  "Describe your hometown to a tourist.",
  "Talk about a challenge you overcame.",
  "Explain your favorite season and why.",
  "Describe a typical day at work or school.",
];

export function getDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function getDailyPrompt(date = new Date()): { dayKey: string; prompt: string } {
  const dayKey = getDayKey(date);
  const dayNum = Number(dayKey.replace(/-/g, "")) % DAILY_CHALLENGE_PROMPTS.length;
  return { dayKey, prompt: DAILY_CHALLENGE_PROMPTS[dayNum]! };
}
