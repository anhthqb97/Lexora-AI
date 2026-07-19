import { redisGet, redisSet } from "@/lib/redis";
import type { ChatMessage } from "./client";

const CONTEXT_TTL_SECONDS = 3600;
const MAX_TURNS = 20;

function contextKey(sessionId: string): string {
  return `context:${sessionId}`;
}

export type ConversationContext = {
  sessionId: string;
  messages: ChatMessage[];
};

export async function getContext(sessionId: string): Promise<ConversationContext> {
  const raw = await redisGet(contextKey(sessionId));
  if (!raw) {
    return { sessionId, messages: [] };
  }
  return JSON.parse(raw) as ConversationContext;
}

export async function appendMessage(
  sessionId: string,
  message: ChatMessage,
): Promise<ConversationContext> {
  const ctx = await getContext(sessionId);
  ctx.messages.push(message);

  if (ctx.messages.length > MAX_TURNS * 2) {
    ctx.messages = ctx.messages.slice(-MAX_TURNS * 2);
  }

  await redisSet(contextKey(sessionId), JSON.stringify(ctx), CONTEXT_TTL_SECONDS);
  return ctx;
}

export async function setSystemPrompt(
  sessionId: string,
  systemPrompt: string,
): Promise<ConversationContext> {
  const ctx = await getContext(sessionId);
  const withoutSystem = ctx.messages.filter((m) => m.role !== "system");
  ctx.messages = [{ role: "system", content: systemPrompt }, ...withoutSystem];
  await redisSet(contextKey(sessionId), JSON.stringify(ctx), CONTEXT_TTL_SECONDS);
  return ctx;
}

export async function clearContext(sessionId: string): Promise<void> {
  await redisSet(contextKey(sessionId), "{}", 1);
}
