# Load Test Spec — Speaking (500 Concurrent Sessions)

**Task:** P1-T060  
**Last Updated:** 2026-07-19

## Objective

Validate Lexora Speaking can sustain **500 concurrent active sessions** with acceptable latency under MVP architecture.

## Scope

| Operation | Target p95 | Target error rate |
|---|---|---|
| Create session | ≤200ms | <0.1% |
| Process turn (mock STT + stub LLM) | ≤3s | <1% |
| End session + evaluation | ≤5s | <1% |
| Get summary | ≤100ms | <0.1% |

## Test Environment

- Staging cluster mirroring production sizing
- `SPEECH_PROVIDER=mock`
- `OPENAI_API_KEY` unset (stub LLM)
- MongoDB Atlas M10+ (or equivalent)
- 500 virtual users (k6 or Artillery)

## Scenario Script

```
1. POST /api/v1/speaking/sessions (auth cookie per VU)
2. Loop 3×:
   POST /api/v1/speaking/sessions/{id}/turns { transcript: "..." }
   think 5s
3. POST /api/v1/speaking/sessions/{id}/end
4. GET /api/v1/speaking/sessions/{id}/summary
```

## Ramp Profile

| Phase | Duration | VUs |
|---|---|---|
| Ramp up | 5 min | 0 → 500 |
| Steady | 10 min | 500 |
| Ramp down | 2 min | 500 → 0 |

## Pass Criteria

- [ ] p95 turn latency ≤3s during steady state
- [ ] p95 end+summary ≤5s
- [ ] Error rate <1% (excluding auth failures)
- [ ] No MongoDB connection pool exhaustion
- [ ] No memory leak on app instances over 15 min

## Monitoring

- App CPU/memory per instance
- MongoDB ops/sec and connection count
- API 5xx rate by endpoint
- P95 latency by route (`/turns`, `/end`, `/summary`)

## Out of Scope (MVP)

- Real Azure STT under load (separate spike)
- TTS playback
- WebSocket streaming

## References

- [`tdd-speaking.md`](tdd-speaking.md) §5 Performance Targets
- [`phase-2-speaking.md`](../product/phases/phase-2-speaking.md) P1-T060
