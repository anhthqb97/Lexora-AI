import type { ChatCompletionOptions, ChatCompletionResult, ChatMessage } from "./types";

export type { ChatMessage, ChatCompletionOptions, ChatCompletionResult };

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return { apiKey };
}

async function chatCompletionDirect(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {},
): Promise<ChatCompletionResult> {
  const { apiKey } = getOpenAIClient();
  const model = options.model ?? process.env.OPENAI_MODEL ?? "gpt-4o";

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${err}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
    model: string;
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  return {
    content: data.choices[0]?.message?.content ?? "",
    model: data.model,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
        }
      : undefined,
  };
}

async function chatCompletionViaGateway(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {},
): Promise<ChatCompletionResult> {
  const baseUrl = process.env.AI_GATEWAY_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("AI_GATEWAY_URL not set");

  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      model: options.model,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI gateway error: ${res.status} ${err}`);
  }

  const data = (await res.json()) as {
    model: string;
    choices: { message: { content: string } }[];
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  return {
    content: data.choices[0]?.message?.content ?? "",
    model: data.model,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
        }
      : undefined,
  };
}

export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {},
): Promise<ChatCompletionResult> {
  if (process.env.AI_GATEWAY_URL) {
    return chatCompletionViaGateway(messages, options);
  }
  return chatCompletionDirect(messages, options);
}

/** Stub for local dev when OPENAI_API_KEY is missing. */
export async function chatCompletionOrStub(
  messages: ChatMessage[],
  options?: ChatCompletionOptions,
): Promise<ChatCompletionResult> {
  if (process.env.AI_GATEWAY_URL) {
    try {
      return await chatCompletionViaGateway(messages, options);
    } catch {
      // fall through to stub/direct
    }
  }

  if (!process.env.OPENAI_API_KEY) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    return {
      content: `[stub] I heard you say: "${lastUser?.content ?? ""}". Keep practicing!`,
      model: "stub",
    };
  }
  return chatCompletionDirect(messages, options ?? {});
}
