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
