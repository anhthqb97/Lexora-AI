# Azure Speech — Provisioning & Validation

**Version:** 1.0  
**Status:** Runbook — execute before Sprint 3 staging  
**Task:** P0-T16  
**Last Updated:** 2026-07-19

---

## 1. Create resource

1. [portal.azure.com](https://portal.azure.com) → Create resource → **Speech**  
2. Region: **`Southeast Asia`** (`southeastasia`) — lowest latency for Vietnam  
3. Resource name: **`lexora-speech-staging`**  
4. Pricing tier: **Standard S0** (STT + Pronunciation Assessment)  
5. Copy **Key 1** and **Region**

### Vercel env vars (Preview + Development)

```
AZURE_SPEECH_KEY=<key-1>
AZURE_SPEECH_REGION=southeastasia
SPEECH_PROVIDER=azure
```

---

## 2. Validation test

Save a 3-second WAV sample as `sample.wav`, then:

```bash
export AZURE_SPEECH_KEY="your-key"
export AZURE_SPEECH_REGION="southeastasia"

curl -s -X POST \
  "https://${AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US" \
  -H "Ocp-Apim-Subscription-Key: ${AZURE_SPEECH_KEY}" \
  -H "Content-Type: audio/wav" \
  --data-binary @sample.wav
```

**Pass:** JSON response with `DisplayText` or `NBest` transcript.

Pronunciation Assessment: validated in P1-T022 spike using SDK (not raw REST).

---

## 3. Vietnam accent spike (pre-beta)

| Item | Detail |
|---|---|
| **When** | After P1-T021, before closed beta (Sprint 7) |
| **Samples** | 100 clips — see [`feasibility-speech.md`](feasibility-speech.md) §3.1 |
| **Pass metrics** | WER ≤15%, correlation ≥0.75, latency from HCMC ≤2s p95 |
| **Owner** | AI Engineer |
| **Output** | Update [`latency-report.md`](latency-report.md) §4 |

---

## 4. References

| Document | Link |
|---|---|
| Speech providers | [`speech-providers.md`](speech-providers.md) |
| Feasibility memo | [`feasibility-speech.md`](feasibility-speech.md) |
| Staging env | [`staging-environment.md`](staging-environment.md) |
