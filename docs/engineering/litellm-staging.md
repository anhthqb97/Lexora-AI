# LiteLLM Proxy — Staging Setup

**Task:** P1C-T14  
**Updated:** 2026-07-20

## Purpose

LiteLLM provides a unified OpenAI-compatible proxy for routing to OpenAI, Azure, or self-hosted vLLM backends. Used in staging before production LLM migration decisions.

## Docker Compose

See `docker-compose.yml` service `litellm` (port 4000).

```yaml
litellm:
  image: ghcr.io/berriai/litellm:main-latest
  ports:
    - "4000:4000"
  volumes:
    - ./services/litellm/config.yaml:/app/config.yaml
  command: ["--config", "/app/config.yaml", "--port", "4000"]
```

## Config (`services/litellm/config.yaml`)

Routes `gpt-4o` to OpenAI and `qwen2.5` to local vLLM when available.

## Staging env

```bash
LITELLM_URL=http://localhost:4000
AI_GATEWAY_URL=http://localhost:8081  # ai-gateway can point base URL to LiteLLM
OPENAI_API_KEY=sk-...
```

Point `ai-gateway-service` `OPENAI_API_URL` to `http://litellm:4000/v1/chat/completions` in staging.

## Verify

```bash
curl http://localhost:4000/health
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"ping"}]}'
```

## References

- [LiteLLM docs](https://docs.litellm.ai/)
- [`docs/engineering/vllm-qwen-evaluation.md`](vllm-qwen-evaluation.md)
