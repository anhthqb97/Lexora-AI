# LLM Cost Comparison — OpenAI vs Self-Hosted

**Task:** P1C-T16  
**Owner:** PM + AI  
**Updated:** 2026-07-20

## Executive summary

_Template — update with actual usage after 30-day baseline._

| Option | Est. monthly cost (10k MAU) | Notes |
|---|---|---|
| OpenAI GPT-4o | $X,XXX | Current production default |
| OpenAI GPT-4o-mini (hybrid) | $XXX | Lighter turns + GPT-4o summaries |
| Self-hosted Qwen2.5-7B (vLLM) | $XXX infra | A10/L4 GPU ~$500–800/mo |
| LiteLLM routing (mixed) | $XXX | Route by task type |

## Assumptions

- 10,000 MAU, 35% weekly active
- Avg 3 speaking sessions/user/month, 8 turns/session
- Avg 500 prompt + 200 completion tokens per turn
- TOEIC explain-why: 100 tokens × 20 questions/mock

## OpenAI pricing (reference)

| Model | Input / 1M tokens | Output / 1M tokens |
|---|---|---|
| gpt-4o | $2.50 | $10.00 |
| gpt-4o-mini | $0.15 | $0.60 |

## Self-hosted cost components

| Item | Monthly est. |
|---|---|
| GPU instance (1× L4) | $400–600 |
| Egress / storage | $50 |
| Engineering maintenance | 0.25 FTE (amortized) |

## Break-even analysis

Self-hosted breaks even vs GPT-4o when monthly token spend exceeds ~$800–1,200 (depends on GPU utilization).

## Recommendation workflow

1. Export OpenAI usage dashboard (30 days post-launch)
2. Fill [`vllm-qwen-evaluation.md`](vllm-qwen-evaluation.md) quality scores
3. PM decision: stay / hybrid / migrate
4. Document in ADR if architecture changes

## Decision

- [ ] Stay on OpenAI
- [ ] Hybrid (mini + 4o)
- [ ] Migrate to self-hosted Qwen2.5

**Decision date:** _TBD_  
**Approved by:** _TBD_
