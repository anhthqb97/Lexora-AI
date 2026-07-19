# Acceptance Checklist — Lexora Speaking

**Feature:** Lexora Speaking
**Version:** 1.0
**Gate:** Stage 2 exit — before closed beta

---

## Session Management (P0)

- [ ] **SP-01** Learner starts session with one tap from dashboard (≤2s load)
- [ ] **SP-02** Learner selects session type: Free Talk, Topic, Scenario
- [ ] **FR-03** Duration picker: 5, 10, 15, 20 minutes
- [ ] **FR-05** Free tier: blocked after 3 sessions/week with paywall
- [ ] **NFR-08** Voice consent modal on first session; consent logged
- [ ] **FR-04** Session resumes within 30 min if interrupted (P1)

## Conversation Loop (P0)

- [ ] **SP-03** Learner speaks; AI understands and responds naturally
- [ ] **FR-06** AI opens with context-appropriate greeting
- [ ] **FR-08** AI asks follow-up questions to extend dialogue
- [ ] **SP-07** AI adapts difficulty to A1–C1 level
- [ ] **FR-11** AI never gives exam answers without learner attempt + explanation
- [ ] **NFR-02** AI response ≤3s p95 after speech ends
- [ ] **NFR-01** Speech-to-text ≤2s after speech ends

## Speech Evaluation (P0)

- [ ] **SP-04** Scores for: pronunciation, fluency, grammar, vocabulary, confidence
- [ ] **FR-19** Top 3 improvement areas highlighted per session
- [ ] **FR-20** Acceptable accuracy on Vietnamese-accent English (≥85% STT)
- [ ] **NFR-03** Evaluation completes ≤5s p95 after session end

## Feedback & Summary (P0)

- [ ] **SP-05** Each correction: original, improved version, reason why
- [ ] **SP-06** Summary shows scores, highlights, session examples
- [ ] **SP-08** Learner can retry flagged phrases
- [ ] Summary displays within 10 seconds of session end
- [ ] **FR-24** Audio replay alongside correction (P1)

## Progress (P0/P1)

- [ ] **FR-26** Dashboard shows session count + total practice time
- [ ] **SP-11** Score trends 7/30/90 days (P1)
- [ ] **FR-28** Recurring error patterns identified (P1)
- [ ] **FR-29** Next topic recommendations (P1)

## Content (P0)

- [ ] 10 topics available in Topic mode
- [ ] 5 scenarios available in Scenario mode
- [ ] TOEIC picture + Q&A prompts (P1)

## Non-Functional

- [ ] **NFR-06** Works on iOS Safari + Android Chrome
- [ ] **NFR-07** Voice data encrypted in transit and at rest
- [ ] **NFR-10** Inappropriate content moderated
- [ ] **NFR-05** Supports 2,000 concurrent sessions (load test)

## AI Quality

- [ ] Tutor follows [`tutor-speaking-prompt.md`](../../AI/tutor-speaking-prompt.md)
- [ ] Brand voice: encouraging, simple, not academic
- [ ] Feedback usefulness ≥4.0/5 in internal test (n≥10)

## Launch MVP (all required)

- [ ] Full 5-minute session end-to-end on mobile browser
- [ ] All 5 evaluation dimensions scored
- [ ] Free-tier limits enforced
- [ ] Session data on dashboard
- [ ] QA sign-off on P0 test cases

---

## Post-Launch (30 days)

- [ ] Session completion rate ≥70%
- [ ] Feedback usefulness ≥4.0/5
- [ ] No open P0 bugs on speech accuracy
- [ ] 30-day retention ≥30% for Speaking users

---

## Sign-off

| Role | Name | Date | Approved |
|---|---|---|---|
| Product Manager | | | [ ] |
| AI Engineer | | | [ ] |
| QA Lead | | | [ ] |
