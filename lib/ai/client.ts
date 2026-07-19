export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

export type ChatCompletionResult = {
  content: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number };
};

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return { apiKey };
}

export async function chatCompletion(
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

/** Stub for local dev when OPENAI_API_KEY is missing. */
export async function chatCompletionOrStub(
  messages: ChatMessage[],
  options?: ChatCompletionOptions,
): Promise<ChatCompletionResult> {
  if (!process.env.OPENAI_API_KEY) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    return {
      content: `[stub] I heard you say: "${lastUser?.content ?? ""}". Keep practicing!`,
      model: "stub",
    };
  }
  return chatCompletion(messages, options);
}
