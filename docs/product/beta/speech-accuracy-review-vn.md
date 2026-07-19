# Speech Accuracy Review — Vietnamese Accent Samples

**Task:** P1-T065  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** AI Dev

---

## 1. Objective

Manually review **100 Vietnamese-accent speech samples** against Azure STT transcripts and Lexora pronunciation scores to validate WER ≤ **15%** gate (beta checklist).

---

## 2. Sample Selection

| Bucket | Count | Source |
|---|---|---|
| A1–A2 learners | 25 | Closed beta recordings |
| B1 learners | 40 | Closed beta recordings |
| B2 learners | 25 | Closed beta + internal testers |
| TOEIC goal | 10 | Stratified from beta cohort |

**Selection rules:**

- Random within bucket; exclude sessions <2 turns
- Include 20% with background noise (café, street)
- Include 10% iOS Safari (known mic variance)

---

## 3. Review Protocol

For each sample:

1. Listen to learner audio (stored blob / session turn)
2. Record **reference transcript** (human listener)
3. Compare Azure STT output vs reference → compute **WER**
4. Compare Lexora pronunciation dimension vs human judgment (1–5)
5. Flag systematic errors (final consonants, /θ/ /ð/, word stress)

### WER formula

`WER = (substitutions + insertions + deletions) / reference_word_count`

---

## 4. Scoring Sheet Columns

| Column | Description |
|---|---|
| sample_id | Session + turn number |
| cefr_level | A1–B2 |
| reference_text | Human transcript |
| stt_text | Azure output |
| wer_pct | Calculated |
| pronunciation_score | Lexora 0–100 |
| human_pron_score | 1–5 |
| notes | e.g. "dropped final -s" |

---

## 5. Acceptance Criteria

| Metric | Threshold |
|---|---|
| Mean WER (VN accent) | ≤15% |
| p95 WER | ≤25% |
| Pronunciation score correlation (human vs AI) | ≥0.6 Spearman |
| Critical misrecognitions (meaning change) | ≤5% of samples |

---

## 6. Remediation Actions

| Finding | Action |
|---|---|
| WER >15% on specific phoneme | Tune prompt + document in ADR |
| Low correlation on short utterances | Minimum audio length guardrail |
| Safari mic quality | UI warning + retry UX (P1-T075) |

---

## 7. Deliverables

- Completed scoring sheet (100 rows)
- Summary report: mean WER, top 5 error patterns
- Go/no-go input for M3 (attach to beta report)

---

## References

| Document | Link |
|---|---|
| Speech providers | [`../../engineering/speech-providers.md`](../../engineering/speech-providers.md) |
| Feasibility spike | [`../../engineering/feasibility-speech.md`](../../engineering/feasibility-speech.md) |
| Go/no-go template | [`beta-go-no-go-template.md`](beta-go-no-go-template.md) |
