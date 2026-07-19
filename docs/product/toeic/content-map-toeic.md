# Content Map — Lexora TOEIC

**Feature:** Lexora TOEIC (Listening + Reading)  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Task:** P1-T067

Content inventory for diagnostic, mock exam, and adaptive lessons (MVP).

---

## 1. Test Structure Overview

| Section | Parts | Questions (full mock) | Time |
|---|---|---|---|
| Listening | 1–4 | 100 | 45 min |
| Reading | 5–7 | 100 | 75 min |
| **Total** | | **200** | **120 min** |

**Diagnostic subset:** 40 questions (20 L + 20 R), ~30 minutes.

---

## 2. Listening Parts

| Part | Name | Format | Mock count | Diagnostic count |
|---|---|---|---|---|
| L1 | Photographs | 4 choices, describe photo | 6 | 2 |
| L2 | Question-Response | 3 choices | 25 | 5 |
| L3 | Conversations | 3 choices, short dialogues | 39 | 8 |
| L4 | Talks | 3 choices, monologues | 30 | 5 |

### L1 — Photograph prompts (samples)

| ID | Scene | Correct concept |
|---|---|---|
| L1-01 | People boarding a bus | Transportation |
| L1-02 | Chef plating food | Restaurant/kitchen |
| L1-03 | Office meeting room | Business meeting |

### L2 — Q&R samples

| ID | Prompt audio (transcript) | Correct response |
|---|---|---|
| L2-01 | "Where is the nearest ATM?" | "It's next to the bank." |
| L2-02 | "Would you like coffee or tea?" | "Coffee, please." |

---

## 3. Reading Parts

| Part | Name | Format | Mock count | Diagnostic count |
|---|---|---|---|---|
| R5 | Incomplete sentences | Grammar/vocab fill-in | 30 | 6 |
| R6 | Text completion | Passage with blanks | 16 | 4 |
| R7 | Reading comprehension | Multi-passage, detail/inference | 54 | 10 |

### R5 — Grammar focus areas

| Skill tag | Example |
|---|---|
| grammar-verb-tense | "She ___ to Hanoi last week." (went) |
| grammar-preposition | "Interested ___ learning English" (in) |
| vocab-collocation | "Make a ___" (decision) |

### R7 — Passage themes (MVP)

| ID | Theme | Word count |
|---|---|---|
| R7-P01 | Company memo | 150 |
| R7-P02 | Product advertisement | 120 |
| R7-P03 | Travel announcement | 180 |

---

## 4. Skill Tags (weak area mapping)

| Tag | Section | Used in |
|---|---|---|
| listening-detail | L | Parts 3–4 |
| listening-inference | L | Parts 3–4 |
| grammar | R | Part 5 |
| vocabulary | R | Parts 5–6 |
| reading-detail | R | Part 7 |
| reading-inference | R | Part 7 |

---

## 5. Question Bank Inventory (MVP)

| Bucket | Target | Status |
|---|---|---|
| Listening samples (real) | 25+ | Seed JSON |
| Reading samples (real) | 25+ | Seed JSON |
| Generated variants | 450 | `seed-toeic-questions.ts` |
| **Total bank** | **500** | P1-T070 |

---

## 6. Mock Exam Form (1 full test)

| Form ID | Name | Question IDs | Notes |
|---|---|---|---|
| MOCK-001 | Lexora Full Mock #1 | 200 fixed | Default free-tier mock |

Question selection: fixed form for reproducible scoring calibration.

---

## 7. Adaptive Lessons (post-diagnostic, MVP 20)

| ID | Section | Skill | Title (VI) |
|---|---|---|---|
| LS-01 | Listening | detail | Nghe chi tiết hội thoại ngắn |
| LS-02 | Listening | inference | Suy luận từ ngữ cảnh |
| RS-01 | Reading | grammar | Ôn thì quá khứ đơn |
| RS-02 | Reading | vocabulary | Collocations thường gặp |
| … | … | … | 16 more in backlog |

**MVP ships:** lesson list API stub; content expands post-launch.

---

## 8. Audio Assets

| Type | MVP approach |
|---|---|
| Listening stimuli | Text transcript + placeholder audio URL (`/audio/toeic/{id}.mp3`) |
| CDN | Vercel static / future CloudFront |

---

## 9. Scoring Calibration

| Input | Output |
|---|---|
| Diagnostic 40 Q | Estimated total 425–990 |
| Mock 200 Q | Section L/R 5–495 each; total 10–990 |
| Accuracy band | ±30 points vs calibrated set (NFR-T04) |

---

## 10. Free Tier Mapping

| Feature | Limit | Reference |
|---|---|---|
| Diagnostic | 1 lifetime | `pricing-spec.md` |
| Full mock | 1/month | `FREE_TOEIC_MOCKS_PER_MONTH` |

---

## References

| Document | Link |
|---|---|
| PRD | [`prd-toeic.md`](prd-toeic.md) |
| Plan | [`plan-toeic.md`](plan-toeic.md) |
| Pricing | [`../pricing-spec.md`](../pricing-spec.md) |
| Speaking content map (pattern) | [`../speaking/content-map-speaking.md`](../speaking/content-map-speaking.md) |
