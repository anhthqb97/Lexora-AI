# PRD — Lexora Speaking

**Product:** Lexora Speaking
**Version:** 1.0
**Status:** Signed off (P0-T01, P0-T12 — 2026-07-19)
**Owner:** Product Team
**Last Updated:** 2026-07-19

> **Learn Smarter. Speak Better.**

---

## 1. Overview

### 1.1 Summary

Lexora Speaking is an AI conversation coach that helps Vietnamese learners improve spoken English through interactive dialogue, real-time speech evaluation, and personalized feedback. It is a P0 product in Phase 1 and serves as a core differentiator for Lexora AI.

### 1.2 Problem Statement

Vietnamese learners struggle to practice speaking English due to:

* Limited access to native speakers or qualified tutors
* Fear of making mistakes in front of others
* Lack of immediate, actionable feedback on pronunciation and fluency
* Expensive English center fees for speaking practice
* No structured way to track speaking improvement over time

### 1.3 Solution

An AI-powered speaking coach available 24/7 that:

* Engages learners in realistic conversations tailored to their level and goals
* Evaluates pronunciation, fluency, grammar, vocabulary, and confidence
* Provides explain-why feedback — not just scores
* Adapts difficulty based on learner performance
* Tracks progress with measurable improvement metrics

### 1.4 Goals

| Goal | Metric | Target |
|---|---|---|
| Increase speaking practice frequency | Avg. sessions/week per active learner | ≥3 sessions |
| Improve speaking confidence | Confidence score improvement (90 days) | +20% |
| Deliver useful feedback | Feedback usefulness rating | ≥4.2/5 |
| Drive retention | 30-day retention for Speaking users | ≥40% |
| Support conversion | Free-to-paid via Speaking feature | ≥10% of conversions |

### 1.5 Non-Goals (This Release)

* Live video calls with human tutors
* Group speaking sessions with multiple learners
* Dialect-specific training (British vs. American accent selection)
* Offline speech evaluation
* Integration with third-party speech engines exposed to learners

---

## 2. Target Users

### 2.1 Primary Personas

**Lan — University Student (B1)**
- Needs TOEIC Speaking section practice
- Shy about speaking in class
- Practices alone at night on her phone
- Wants clear feedback on pronunciation mistakes

**Minh — Junior Professional (B2)**
- Preparing for workplace presentations and meetings
- Has basic English but lacks fluency under pressure
- Wants business scenario practice
- Values efficiency — 15-minute daily sessions

**Hoa — Job Seeker (A2–B1)**
- Preparing for English job interviews
- Needs confidence building and structured practice
- Budget-conscious; compares free vs. paid options
- Motivated by visible progress

### 2.2 Secondary Personas

- **English center students** using Lexora Speaking for homework practice
- **TOEIC prep learners** focusing on speaking confidence alongside Lexora TOEIC

---

## 3. User Stories

### 3.1 Core Stories (P0)

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| SP-01 | Learner | Start a speaking session with one tap | I can practice anytime without setup friction |
| SP-02 | Learner | Choose a conversation topic or scenario | Practice is relevant to my goals |
| SP-03 | Learner | Speak naturally and be understood by the AI | I get realistic conversation practice |
| SP-04 | Learner | Receive feedback on pronunciation, fluency, grammar, and vocabulary | I know exactly what to improve |
| SP-05 | Learner | See explain-why corrections, not just errors | I learn from mistakes, not just fail |
| SP-06 | Learner | View a session summary with scores and highlights | I can track my progress over time |
| SP-07 | Learner | Have the AI adjust difficulty to my level | Sessions are challenging but not overwhelming |
| SP-08 | Learner | Retry specific phrases the AI flagged | I can fix mistakes immediately |

### 3.2 Enhanced Stories (P1)

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| SP-09 | Learner | Practice TOEIC-style speaking prompts | I am prepared for the exam format |
| SP-10 | Learner | Practice business scenarios (meetings, presentations) | I improve workplace communication |
| SP-11 | Learner | See my speaking history and trend charts | I stay motivated by visible improvement |
| SP-12 | Learner | Get daily speaking challenges | I build a consistent practice habit |

### 3.3 Future Stories (P2+)

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| SP-13 | Teacher | Assign speaking homework to students | Students practice outside class |
| SP-14 | Learner | Compare my pronunciation to a model audio | I know the target sound to aim for |
| SP-15 | Learner | Practice with timed interview simulations | I am ready for real job interviews |

---

## 4. Functional Requirements

### 4.1 Session Management

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Learner can start a new speaking session from the dashboard | P0 |
| FR-02 | Learner can select session type: Free Talk, Topic, Scenario, TOEIC Practice | P0 |
| FR-03 | Learner can set session duration: 5, 10, 15, or 20 minutes | P0 |
| FR-04 | System saves session state if interrupted (resume within 30 min) | P1 |
| FR-05 | System enforces daily free-tier session limits (configurable) | P0 |

### 4.2 AI Conversation Engine

| ID | Requirement | Priority |
|---|---|---|
| FR-06 | AI initiates conversation with context-appropriate opener | P0 |
| FR-07 | AI responds naturally to learner speech input | P0 |
| FR-08 | AI asks follow-up questions to extend dialogue | P0 |
| FR-09 | AI adapts vocabulary and sentence complexity to learner level (A1–C1) | P0 |
| FR-10 | AI provides gentle corrections inline during conversation (not disruptive) | P1 |
| FR-11 | AI never gives exam answers without educational explanation | P0 |
| FR-12 | AI supports Vietnamese clarification when learner is stuck (optional toggle) | P1 |

### 4.3 Speech Evaluation

| ID | Requirement | Priority |
|---|---|---|
| FR-13 | System transcribes learner speech to text in real time | P0 |
| FR-14 | System scores pronunciation accuracy (word and phoneme level) | P0 |
| FR-15 | System scores fluency (pace, pauses, filler words) | P0 |
| FR-16 | System scores grammar correctness in spoken responses | P0 |
| FR-17 | System scores vocabulary range and appropriateness | P0 |
| FR-18 | System generates an overall session confidence score | P0 |
| FR-19 | System highlights top 3 improvement areas per session | P0 |
| FR-20 | System supports Vietnamese-accent English evaluation | P0 |

### 4.4 Feedback & Summary

| ID | Requirement | Priority |
|---|---|---|
| FR-21 | Post-session summary shows scores across all dimensions | P0 |
| FR-22 | Feedback includes specific examples from the session | P0 |
| FR-23 | Each correction includes: what was wrong, why, and a better alternative | P0 |
| FR-24 | Learner can replay their own audio alongside corrected version | P1 |
| FR-25 | Learner can share session summary (optional, privacy-controlled) | P2 |

### 4.5 Progress Tracking

| ID | Requirement | Priority |
|---|---|---|
| FR-26 | Dashboard shows speaking session count and total practice time | P0 |
| FR-27 | Dashboard shows score trends over 7/30/90 days | P1 |
| FR-28 | System identifies recurring error patterns across sessions | P1 |
| FR-29 | System recommends next practice topics based on weak areas | P1 |

---

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Speech-to-text latency | ≤2s after speech ends |
| NFR-02 | AI text response latency | ≤3s p95 |
| NFR-03 | Speech evaluation latency | ≤5s p95 |
| NFR-04 | Session availability uptime | ≥99.5% |
| NFR-05 | Concurrent speaking sessions | ≥2,000 (Phase 1) |
| NFR-06 | Mobile browser microphone support | iOS Safari, Android Chrome |
| NFR-07 | Voice data encryption | At rest and in transit |
| NFR-08 | Voice recording consent | Explicit opt-in before first session |
| NFR-09 | Session data retention | Configurable; default 12 months |
| NFR-10 | AI content moderation | Flag inappropriate input/output |

---

## 6. User Experience

### 6.1 Core Flow

```
Dashboard → Choose Session Type → Set Duration → Grant Mic Permission
→ AI Greeting → Conversation Loop (speak → evaluate → respond)
→ Session End → Summary & Scores → Recommended Next Steps
```

### 6.2 Session Types

| Type | Description | Example |
|---|---|---|
| Free Talk | Open conversation on any topic | "Tell me about your weekend" |
| Topic | Structured topic from library | "Travel", "Technology", "Health" |
| Scenario | Role-play situation | "Ordering at a restaurant", "Job interview" |
| TOEIC Practice | Exam-format prompts | "Describe the picture", "Respond to questions" |

### 6.3 UX Principles

* One-tap start — minimize friction to begin speaking
* Visual feedback during speech (waveform, listening indicator)
* Non-intimidating tone — celebrate effort, not just accuracy
* Scores presented as growth, not judgment
* Vietnamese helper text available but English-first experience

---

## 7. AI Tutor Behavior

Lexora Speaking uses a dedicated AI tutor persona. Full system prompt:

→ [`do../../AI/tutor-speaking-prompt.md`](../../AI/tutor-speaking-prompt.md)

### Key Behavior Rules

1. Always encourage — never shame or dismiss learner attempts
2. Correct with explanation — show the better phrase and why it works
3. Adapt level dynamically — simplify if struggling, challenge if fluent
4. Keep conversations practical — real-life and exam-relevant topics
5. End sessions positively — summarize wins and one focus area

---

## 8. Success Criteria & Acceptance

### 8.1 Launch Criteria (MVP)

- [ ] Learner can complete a full 5-minute speaking session end-to-end
- [ ] Speech evaluation returns scores for all 5 dimensions
- [ ] Post-session summary displays within 10 seconds of session end
- [ ] AI tutor follows brand voice and explain-why feedback rules
- [ ] Microphone permission and consent flow works on mobile browsers
- [ ] Free-tier session limits enforced correctly
- [ ] Session data persists and appears on learner dashboard
- [ ] AI response latency meets NFR targets in staging load test

### 8.2 Post-Launch Review (30 days)

- Session completion rate ≥70%
- Feedback usefulness rating ≥4.0/5
- No P0 bugs open related to speech evaluation accuracy
- 30-day retention ≥30% for Speaking-active users

---

## 9. Dependencies & Risks

### 9.1 Dependencies

| Dependency | Owner | Status |
|---|---|---|
| Speech-to-text engine | AI Engineer | Required |
| Pronunciation scoring model | AI Engineer | Required |
| LLM tutoring backend with guardrails | AI Engineer | Required |
| User authentication and subscription | Platform Team | Required |
| Microphone access (web API) | Frontend | Required |

### 9.2 Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Poor accuracy on Vietnamese-accent English | High | Validate pronunciation for VN accent; beta test with 100 learners (P1-T045) |
| High AI latency on mobile networks | High | Edge caching, streaming responses, fallback to text mode |
| Learners uncomfortable speaking to AI | Medium | Onboarding tutorial, privacy reassurance, encouraging persona |
| Mic permission denied on mobile browsers | Medium | Clear instructions, fallback text-input mode |
| AI generates inappropriate content | High | Content moderation layer, prompt guardrails, human review queue |

---

## 10. Product Decisions (Approved Baseline)

Decisions below are approved by PO/PM/TL for MVP. Formal sign-off at M0 (P0-T12).

| # | Topic | Decision | ADR / Ref |
|---|---|---|---|
| 1 | Free tier limits | 3 speaking sessions/week; 1 TOEIC mock/month | brand.md, platform PRD |
| 2 | Vietnamese help default | ON for A1–A2, OFF for B1+ | tutor-speaking-prompt.md |
| 3 | Speech engine | Local mock (dev) · Azure STT + pronunciation (staging/prod) | ADR-006; [`speech-providers.md`](../../engineering/speech-providers.md) |
| 4 | Audio storage | Transcripts + scores only; delete raw audio after 24h | ADR-002; PDPD |
| 5 | TOEIC speaking in Speaking app | P1 only: picture description + respond to questions | content-map-speaking.md |

## 10.1 Resolved Questions (P0-T01)

All five MVP decisions are locked in §10 above. No open product questions remain for Speaking MVP.

| # | Question | Resolution |
|---|---|---|
| 1 | Free tier limits | 3 sessions/week; 1 TOEIC mock/month (platform-wide) |
| 2 | Vietnamese help default | ON A1–A2, OFF B1+ |
| 3 | Speech engine | Local mock for dev; Azure for staging/prod (P0-T16) |
| 4 | Audio retention | Transcripts + scores only; raw audio deleted after 24h |
| 5 | TOEIC speaking scope | P1: picture description + Q&A only (not full TOEIC speaking exam) |

Spike results (P0-T02) may adjust Azure tuning parameters only — not product scope.

---

## 11. References

| Document | Link |
|---|---|
| Brand Identity | [`../brand.md`](../brand.md) |
| Master Plan | [`../master-plan.md`](../master-plan.md) |
| Phase 1 Plan | [`../phases/phase-1-mvp-launch.md`](../phases/phase-1-mvp-launch.md) |
| System Prompts | [`../../AI/system-prompts.md`](../../AI/system-prompts.md) |
| AI Tutor Prompt | [`../../AI/tutor-speaking-prompt.md`](../../AI/tutor-speaking-prompt.md) |
| TDD Speaking | [`../../engineering/tdd-speaking.md`](../../engineering/tdd-speaking.md) |
| Acceptance | [`acceptance-speaking.md`](acceptance-speaking.md) |

---

## 12. Team Sign-off (P0-T12)

| Role | Date | Status |
|---|---|---|
| PM | 2026-07-19 | ✅ Signed |
| Technical Lead | 2026-07-19 | ✅ Signed |
| AI Engineer | 2026-07-19 | ✅ Signed |
| QA Lead | 2026-07-19 | ✅ Signed |

**Walkthrough:** Speaking PRD v1.0 approved. Open questions closed (§10). Ready for Sprint 4 implementation.
