# PRD — Lexora TOEIC

**Product:** Lexora TOEIC
**Version:** 1.0
**Status:** Approved baseline — expand content map + TDD before Sprint 8 (Week 14)
**Owner:** Product Team
**Last Updated:** 2026-07-19

> **Learn Smarter. Speak Better.**

---

## 1. Overview

### 1.1 Summary

Lexora TOEIC is an AI-powered TOEIC preparation platform for Vietnamese learners — adaptive lessons, realistic mock exams, score tracking, and personalized improvement plans.

### 1.2 Problem Statement

Vietnamese learners need TOEIC scores for graduation, jobs, and scholarships but face:

* Expensive prep courses and materials
* Generic apps not aligned to TOEIC format
* No adaptive path based on weak areas
* Limited mock exams with realistic scoring
* No explain-why feedback on wrong answers

### 1.3 Solution

AI-powered TOEIC prep that:

* Diagnoses current level across Listening and Reading
* Delivers adaptive lessons targeting weak skills
* Provides full mock exams with score estimates
* Explains why answers are wrong — not just correct/incorrect
* Tracks progress toward target score

### 1.4 Goals

| Goal | Metric | Target |
|---|---|---|
| Score improvement | Avg. point gain (90 days) | +50 points |
| Mock exam completion | Completion rate | ≥75% |
| Lesson engagement | Lessons/week per active user | ≥5 |
| Conversion | Free-to-paid via TOEIC | ≥15% of conversions |
| Retention | 30-day retention | ≥35% |

### 1.5 Non-Goals (MVP)

* Official ETS TOEIC certification
* Speaking/Writing sections (use Lexora Speaking/Writing)
* Live human tutoring
* Paper-based test simulation

---

## 2. Target Users

**Primary:** University students needing 450–650 for graduation
**Secondary:** Job seekers targeting 600–750 for employers
**Tertiary:** Professionals pushing 750+ for career advancement

---

## 3. User Stories (MVP)

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| TC-01 | Learner | Take a diagnostic test | I know my current TOEIC level |
| TC-02 | Learner | Get adaptive lessons for weak areas | I improve efficiently |
| TC-03 | Learner | Take a full mock TOEIC exam | I simulate real test conditions |
| TC-04 | Learner | See explain-why on wrong answers | I learn from mistakes |
| TC-05 | Learner | Track my score over time | I see progress toward my goal |
| TC-06 | Learner | Get a personalized improvement plan | I know what to study next |
| TC-07 | Learner | Practice listening with audio | I improve listening skills |
| TC-08 | Learner | Practice reading comprehension | I improve reading speed and accuracy |

---

## 4. Functional Requirements

### 4.1 Diagnostic

| ID | Requirement | Priority |
|---|---|---|
| TR-01 | 30-min diagnostic (Listening + Reading subset) | P0 |
| TR-02 | Estimated TOEIC score (425–990 scale) | P0 |
| TR-03 | Skill breakdown: listening vs reading | P0 |
| TR-04 | Weak area identification (grammar, vocab, inference, etc.) | P0 |

### 4.2 Adaptive Lessons

| ID | Requirement | Priority |
|---|---|---|
| TR-05 | Lesson recommendations based on diagnostic | P0 |
| TR-06 | Listening lessons with audio playback | P0 |
| TR-07 | Reading lessons with timed passages | P0 |
| TR-08 | Grammar and vocabulary drills | P0 |
| TR-09 | AI explain-why on incorrect lesson answers | P0 |
| TR-10 | Lesson difficulty adapts after each completion | P1 |

### 4.3 Mock Exam

| ID | Requirement | Priority |
|---|---|---|
| TR-11 | Full 2-hour mock (200 questions, Listening + Reading) | P0 |
| TR-12 | Timed sections matching TOEIC format | P0 |
| TR-13 | Score report with section breakdown | P0 |
| TR-14 | Question review with explain-why | P0 |
| TR-15 | Free tier: 1 mock/month; paid: unlimited | P0 |

### 4.4 Progress & Planning

| ID | Requirement | Priority |
|---|---|---|
| TR-16 | Score history chart (7/30/90 days) | P0 |
| TR-17 | Target score setting with estimated date | P1 |
| TR-18 | Weekly improvement plan | P1 |
| TR-19 | Dashboard integration | P0 |

---

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-T01 | Audio streaming latency | ≤2s start |
| NFR-T02 | Mock exam save progress | Auto-save every question |
| NFR-T03 | Question bank size (MVP) | ≥500 questions |
| NFR-T04 | Score calculation accuracy | ±30 points vs calibrated set |

---

## 6. MVP Scope

**In MVP (Sprint 8):**
- Diagnostic test
- 20 adaptive lessons (10 listening, 10 reading)
- 1 full mock exam
- Score tracking dashboard
- Explain-why feedback

**Post-MVP:**
- Full lesson library (100+)
- Multiple mock exams
- Improvement plan AI generator
- Integration with Lexora Speaking for speaking prep

---

## 7. Dependencies

| Dependency | Owner |
|---|---|
| Platform auth + billing | Platform team |
| Question content bank | Content team |
| AI tutor for explain-why | AI Engineer |
| Audio hosting CDN | DevOps |

---

## 8. References

| Document | Link |
|---|---|
| Brand | [`../brand.md`](../brand.md) |
| Plan TOEIC | [`plan-toeic.md`](plan-toeic.md) |
| Lexora Speaking | [`../speaking/prd-speaking.md`](../speaking/prd-speaking.md) |
