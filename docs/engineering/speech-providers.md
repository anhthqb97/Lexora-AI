# Speech Providers — Local Dev & Azure (Deferred)

**Version:** 1.0  
**Status:** Approved  
**Owner:** System Architect + AI Engineer  
**Last Updated:** 2026-07-19  
**Tasks:** P0-T02 (local) · P0-T16 (Azure staging) · P1-T021 (Azure integration)

---

## 1. Strategy

| Phase | Speech stack | Azure required? |
|---|---|---|
| **Local dev / CI** | `mock` or `whisper-local` | **No** |
| **Phase 0 spike (P0-T02)** | Validate `SpeechProvider` + local paths | **No** |
| **Staging / beta (Sprint 3+)** | `azure` | **Yes** — provision P0-T16 |
| **Production** | `azure` | **Yes** |

**Product decision:** Azure Speech remains the **production** engine (STT + pronunciation). **Do not block** local development or Phase 0 on Azure keys.

---

## 2. SpeechProvider interface

All speech I/O goes through one abstraction — implement in `lib/speech/` (P1-T021).

```typescript
// lib/speech/types.ts (planned P1-T021)
interface SpeechProvider {
  transcribe(audio: Buffer, locale: string): Promise<TranscriptResult>;
  assessPronunciation(audio: Buffer, referenceText?: string): Promise<PronunciationScores>;
}

interface TranscriptResult {
  text: string;
  confidence: number;
  durationMs: number;
}

interface PronunciationScores {
  pronunciation: number;  // 0–100
  fluency: number;
  completeness: number;
}
```

**Factory:** `getSpeechProvider()` reads `SPEECH_PROVIDER` env var.

---

## 3. Providers

### 3.1 `mock` (default local + CI)

| Use | Default for `npm run dev` without cloud keys |
|---|---|
| STT | Returns scripted transcript from fixture or hash of audio length |
| Pronunciation | Deterministic scores (e.g. 72/68/75) for UI + E2E |
| CI | `SPEECH_PROVIDER=mock` · `E2E_MOCK_AI=true` |

**DoD (P0-T02):** Document mock behaviour; E2E can run full speaking smoke without Azure.

### 3.2 `whisper-local` (optional local STT)

| Use | Real STT offline — no Azure |
|---|---|
| Engine | **faster-whisper** Docker container **or** OpenAI Whisper API via dev key (optional) |
| Pronunciation | **LLM-estimated** from transcript (Ollama) — not Azure PA |
| Limitation | No official pronunciation assessment; good for dev UX only |

**Docker (optional P1-T003 extension):**

```yaml
# Optional — add when team wants real local STT
services:
  whisper:
    image: fedirz/faster-whisper-server:latest  # or team-pinned image
    ports: ["8001:8000"]
```

```bash
SPEECH_PROVIDER=whisper-local
WHISPER_LOCAL_URL=http://localhost:8001
```

### 3.3 `azure` (staging + production)

| Use | Sprint 3+ after P0-T16 |
|---|---|
| STT + pronunciation | Azure Speech Services — Southeast Asia |
| Spike | 100 VN-accent samples — **before closed beta**, not Phase 0 blocker |
| Env | `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION=southeastasia` |

See [`feasibility-speech.md`](feasibility-speech.md) for Azure pass thresholds.

---

## 4. Environment matrix

| Variable | mock | whisper-local | azure |
|---|---|---|---|
| `SPEECH_PROVIDER` | `mock` | `whisper-local` | `azure` |
| `AZURE_SPEECH_KEY` | — | — | required |
| `AZURE_SPEECH_REGION` | — | — | required |
| `WHISPER_LOCAL_URL` | — | optional | — |
| `OLLAMA_BASE_URL` | optional (LLM scores) | used for score estimate | — |

**Default in `.env.example` (P0-T15):**

```bash
SPEECH_PROVIDER=mock
# AZURE_SPEECH_KEY=          # add in staging — P0-T16
# AZURE_SPEECH_REGION=southeastasia
```

---

## 5. P0-T02 — Local spike (no Azure)

| Step | Action |
|---|---|
| 1 | Approve `SpeechProvider` design (this doc) |
| 2 | Define mock fixtures for 10 sample utterances (VN-accent phrases) |
| 3 | Document whisper-local optional setup |
| 4 | Confirm speaking E2E strategy works with `SPEECH_PROVIDER=mock` |
| 5 | Schedule Azure VN validation for **before Sprint 3** (P0-T16) |

**Pass criteria (Phase 0):** Local dev + CI can run speaking flow **without Azure keys**.

**Azure pass criteria (pre-beta):** WER ≤15%; pronunciation correlation ≥0.75 — see feasibility memo.

---

## 6. Implementation timeline

| Task | When | Deliverable |
|---|---|---|
| **P0-T02** | Phase 0 | This spec + feasibility memo update |
| **P0-T15** | Phase 0 | `.env.example` with `SPEECH_PROVIDER=mock` |
| **P0-T16** | Phase 0 | Azure resource + keys for **staging only** |
| **P1-T021** | Sprint 3 | `lib/speech/*` — mock + azure providers |
| **P1-T022** | Sprint 3 | Azure pronunciation scoring |
| P1-T003 ext | Sprint 1 | Optional whisper Docker service |

---

## 7. References

| Document | Link |
|---|---|
| Feasibility memo | [`feasibility-speech.md`](feasibility-speech.md) |
| ADR-006 | [`architecture-decision-record.md`](architecture-decision-record.md) |
| Local development | [`local-development.md`](local-development.md) |
| TDD Speaking | [`tdd-speaking.md`](tdd-speaking.md) |
