# Self-Hosted LLM Production

**Task:** P2-T26  
**Trigger:** ADR cost threshold or Azure quota limits  
**Last Updated:** 2026-07-19

---

## Decision Criteria

Deploy self-hosted vLLM when ANY of:

- Monthly OpenAI spend > $15K with MAL > 30K
- P95 tutor latency > 3s during peak hours
- Data residency requirement for enterprise pilots

---

## Recommended Stack

| Component | Choice |
|---|---|
| Inference | vLLM on A100/L40S |
| Routing | LiteLLM (`services/litellm/config.yaml`) |
| Fallback | Azure OpenAI gpt-4o-mini |

---

## Model Selection

- **Primary:** Llama 3.1 70B (quantized AWQ) for tutor chat
- **Fallback:** gpt-4o-mini for complex explain-why

---

## Monitoring

- Tokens/sec, queue depth, GPU utilization
- Quality sampling: human review 1% of sessions weekly

---

## Phase 6 Scale

See [`vllm-fleet-scale.md`](vllm-fleet-scale.md) for multi-region fleet.
