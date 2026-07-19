# vLLM + Qwen2.5 Evaluation — Quality vs GPT-4o

**Task:** P1C-T15  
**Updated:** 2026-07-20  
**Status:** Template — fill after benchmark run

## Objective

Compare Qwen2.5-7B-Instruct (self-hosted via vLLM) against GPT-4o on Lexora speaking and TOEIC evaluation tasks.

## Test matrix

| Scenario | GPT-4o score (1–5) | Qwen2.5 score (1–5) | Notes |
|---|---|---|---|
| Speaking turn response (naturalness) | | | |
| Inline grammar correction | | | |
| Session summary encouragement | | | |
| TOEIC explain-why generation | | | |
| Vietnamese help translation | | | |
| Guardrail refusal (off-topic) | | | |

## Methodology

1. Sample 50 anonymized speaking transcripts from staging
2. Run same prompts through GPT-4o (baseline) and Qwen2.5 via LiteLLM
3. Blind review by 2 reviewers (PM + AI dev) using rubric in `docs/AI/`
4. Record latency p50/p95 and token cost

## Latency targets

| Metric | GPT-4o | Qwen2.5 target |
|---|---|---|
| p50 | ~800ms | <600ms |
| p95 | ~2s | <1.5s |

## Quality gate

- Average rubric score ≥4.0/5 on speaking tasks
- No regression on guardrail tests
- If below gate → stay on OpenAI for MVP+1

## Infrastructure

```bash
docker compose up vllm litellm -d
# Pull model: see docker-compose vllm command
```

## Sign-off

| Reviewer | Date | Recommendation |
|---|---|---|
| AI Dev | | ⬜ Stay OpenAI / ⬜ Migrate |
| PM | | |
