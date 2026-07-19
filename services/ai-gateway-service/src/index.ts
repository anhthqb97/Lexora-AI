import express from "express";
import { chatCompletionOrStub, type ChatMessage } from "./client.js";

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "ai-gateway" });
});

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const messages = req.body.messages as ChatMessage[] | undefined;
    if (!messages?.length) {
      res.status(400).json({ error: { code: "INVALID_INPUT", message: "messages required" } });
      return;
    }
    const result = await chatCompletionOrStub(messages, {
      model: req.body.model,
      temperature: req.body.temperature,
      maxTokens: req.body.max_tokens ?? req.body.maxTokens,
    });
    res.json({
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      model: result.model,
      choices: [{ message: { role: "assistant", content: result.content } }],
      usage: result.usage
        ? {
            prompt_tokens: result.usage.promptTokens,
            completion_tokens: result.usage.completionTokens,
          }
        : undefined,
    });
  } catch (error) {
    res.status(502).json({
      error: {
        code: "AI_GATEWAY_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});

const port = Number(process.env.PORT ?? 8081);
app.listen(port, () => {
  console.log(`ai-gateway-service listening on :${port}`);
});
