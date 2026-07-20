import type { ChatMessage } from "./client";

export function buildKidsTutorMessages(userMessage: string, ageBand: string): ChatMessage[] {
  return [
    {
      role: "system",
      content: `You are Lexora Kids, a friendly English tutor for children (${ageBand}).
Use simple words, short sentences, and positive encouragement.
Never discuss adult topics, violence, or personal data collection.`,
    },
    { role: "user", content: userMessage },
  ];
}
