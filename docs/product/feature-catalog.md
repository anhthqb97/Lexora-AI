# Lexora AI — Feature Catalog

**Version:** 1.0  
**Status:** Active  
**Last Updated:** 2026-07-19  
**Scope:** Full product vision, scoped to current **web MVP** (Phase 1) and later phases

> **Learn Smarter. Speak Better.**

This catalog maps the **complete feature reference list** to Lexora's phased roadmap. Use it for client proposals, backlog grooming, and scope control.

**Legend**

| Tag | Phase | Meaning |
|---|---|---|
| **Ph1** | Phase 1 | Platform — auth, billing, dashboard, AI infra |
| **Ph2** | Phase 2 | Speaking MVP |
| **Ph3** | Phase 3 | TOEIC + beta + public launch |
| **Ph1–3** | Phases 1–3 | Ships at web MVP launch (M5) |
| **Ph4** | Phase 4 | Native mobile (Expo) — was "Ph4" |
| **Ph5** | Phase 5 | Growth — Writing, IELTS, gamification, B2B lite |
| **Ph6** | Phase 6 | Scale — Schools, Enterprise, SEA |
| **Ph3+** | Phase 3+ | Launch polish on web |
| **—** | Backlog | Not scheduled |

**Phase plans:** [`phases/README.md`](phases/README.md)

**Current app/web (Phase 1) ships:** Platform auth & billing · Lexora Speaking · Lexora TOEIC (L/R) · basic dashboard & analytics · AI tutor via Speaking + explain-why on TOEIC.

---

## Summary by Phase

| Phase | Modules in scope | Approx. feature items |
|---|---|---|
| **Ph1** | Auth, Profile, Payments sandbox, Dashboard shell | ~25 |
| **Ph2** | Speaking (full), AI tutor (speaking) | ~20 |
| **Ph3** | TOEIC, Placement, Beta, Launch | ~40 |
| **Ph1–3** | **Web MVP at launch** | ~85 |
| **Ph4** | Native app, push, offline basics, Apple/Google Pay | ~15 |
| **Ph5** | Writing, Vocab depth, IELTS, Gamification, B2B lite | ~120 |
| **Ph6** | Social, Community, School/Enterprise, CMS admin | ~80 |

---

## 1. Authentication & User

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Register | **Ph1** | Email + password — [`prd-platform.md`](platform/prd-platform.md) PL-01 |
| Login | **Ph1** | PL-01, PL-02 |
| Google Login | **Ph1** | PL-03 |
| Apple Login | **Ph4** | Sign in with Apple on native; web optional Ph3+ |
| Facebook Login | **Ph1** | PL-04 |
| OTP Login | **Ph1** | Phone OTP +84 — PL-02 |
| Forgot Password | **Ph1** | Email/OTP reset — PL-05 |
| User Profile | **Ph1** | PL-25 |
| Avatar | **Ph1** | PL-25 |
| Learning Goal | **Ph1** | Onboarding — PL-08 (TOEIC / Speaking / Business / General) |
| Target Score | **Ph1** | TOEIC target + optional exam date — PL-09, TR-02 |
| Daily Goal | **Ph5** | Gamification — streak & daily targets |
| Notification Settings | **Ph3+** | PL-26 (P1 at launch) |

---

## 2. AI Placement Test

| Feature | Phase | Lexora module / notes |
|---|---|---|
| English Level Test | **Ph1** | Onboarding self-assessment A1–C1 — PL-09 |
| CEFR Test | **Ph2** | Formal CEFR-aligned diagnostic |
| TOEIC Prediction | **Ph1** | TOEIC diagnostic — TR-01, TR-02 |
| IELTS Prediction | **Ph2** | P2-T17 IELTS diagnostic |
| Skill Analysis | **Ph1** | TOEIC skill breakdown — TR-03, TR-04 |
| Weakness Detection | **Ph1** | Diagnostic weak areas → adaptive lessons |
| Personalized Roadmap | **Ph1** | TOEIC improvement plan — TC-06 |

---

## 3. Vocabulary

Standalone vocabulary product is **Ph2+**. Phase 1 embeds vocab in TOEIC lessons and Speaking feedback.

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Topic Vocabulary | **Ph1** | Embedded in TOEIC/Speaking topics |
| Daily Vocabulary | **Ph2** | Daily word push + plan |
| TOEIC Vocabulary | **Ph1** | TR-08 drills in adaptive lessons |
| IELTS Vocabulary | **Ph2** | With IELTS module |
| Business Vocabulary | **Ph2** | Lexora Business |
| Academic Vocabulary | **Ph2** | Reading module expansion |
| Flashcards | **Ph2** | SRS companion |
| Images | **Ph2** | Visual flashcards |
| Native Pronunciation | **Ph1** | Azure Speech in Speaking |
| IPA | **Ph2** | Pronunciation detail view |
| Word Family | **Ph2** | Vocab depth |
| Synonyms | **Ph2** | |
| Antonyms | **Ph2** | |
| Collocations | **Ph2** | |
| Phrasal Verbs | **Ph2** | |
| Idioms | **Ph2** | |
| AI Example Sentences | **Ph1** | Tutor + lesson explain-why |
| Vocabulary Quiz | **Ph1** | TOEIC lesson quizzes |
| Spaced Repetition (SRS) | **Ph2** | Retention engine |
| Favorite Words | **Ph2** | |
| Difficult Words | **Ph2** | Auto-flag from quiz errors |
| Vocabulary Notebook | **Ph2** | Personal word list |

---

## 4. Grammar

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Grammar Lessons | **Ph1** | TOEIC adaptive — TR-08 |
| Interactive Exercises | **Ph1** | Lesson drills |
| AI Grammar Explanation | **Ph1** | Speaking scores + TOEIC explain-why |
| Grammar Quiz | **Ph1** | In TOEIC lessons |
| Grammar Checker | **Ph2** | Lexora Writing |
| Sentence Correction | **Ph2** | Lexora Writing |
| Translation Practice | **Ph3** | Not MVP — evaluate post-SEA |
| Common Mistakes | **Ph2** | VN-learner mistake bank |
| Grammar Review | **Ph2** | Smart review in learning plan |

---

## 5. Listening

| Feature | Phase | Lexora module / notes |
|---|---|---|
| TOEIC Listening | **Ph1** | Parts 1–4 — TR-06 |
| IELTS Listening | **Ph2** | P2-T17 |
| Daily Conversation | **Ph2** | Short clips + quiz |
| Podcasts | **Ph3** | Content partnership |
| News Listening | **Ph2** | Curated news clips |
| Business Listening | **Ph2** | Lexora Business |
| Movie Clips | **Ph3** | Licensing required |
| Music Lyrics | **Ph3** | Licensing required |
| Dictation | **Ph2** | Listen-and-type |
| Subtitle | **Ph1** | Optional transcript display on audio |
| Transcript | **Ph1** | TOEIC listening review |
| Speed Control | **Ph3+** | 0.75×–1.25× playback |
| AI Explanation | **Ph1** | Explain-why on wrong answers |

---

## 6. Reading

| Feature | Phase | Lexora module / notes |
|---|---|---|
| TOEIC Reading | **Ph1** | Parts 5–7 — TR-07 |
| IELTS Reading | **Ph2** | |
| News | **Ph2** | Graded articles |
| Articles | **Ph2** | |
| Short Stories | **Ph3** | |
| Business Documents | **Ph2** | Lexora Business |
| Reading Quiz | **Ph1** | TOEIC passages |
| AI Reading Assistant | **Ph2** | Highlight + ask tutor |
| Vocabulary Highlight | **Ph2** | Tap-to-define |
| Translation | **Ph2** | VI ↔ EN assist (not exam mode) |

---

## 7. Speaking

Core product **Lexora Speaking** — Phase 1 launch.

| Feature | Phase | Lexora module / notes |
|---|---|---|
| AI Conversation | **Ph1** | Primary Speaking flow |
| AI Interview | **Ph2** | Lexora Interview (reuse speech infra) |
| Pronunciation Score | **Ph1** | Azure + rubric |
| Fluency Score | **Ph1** | |
| Grammar Score | **Ph1** | |
| Vocabulary Score | **Ph1** | |
| Shadowing | **Ph2** | Repeat-after-native |
| Daily Speaking | **Ph1** | Free tier: 3 sessions/week |
| Business Speaking | **Ph2** | Lexora Business scenarios |
| TOEIC Speaking | **Ph2** | Not in TOEIC MVP (L/R only) |
| IELTS Speaking | **Ph2** | |
| Accent Detection | **Ph3+** | VN-accent tuning — feasibility spike |
| Speaking History | **Ph1** | Session list + summaries |

---

## 8. Writing

**Lexora Writing** — Phase 2 launch.

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Essay | **Ph2** | |
| Email | **Ph2** | |
| Business Email | **Ph2** | Lexora Business |
| Report | **Ph2** | |
| Paragraph | **Ph2** | |
| Daily Journal | **Ph2** | |
| Grammar Correction | **Ph2** | P2-T03 |
| Vocabulary Improvement | **Ph2** | |
| AI Rewrite | **Ph2** | |
| AI Scoring | **Ph2** | P2-T04 |
| TOEIC Writing | **Ph2** | |
| IELTS Writing | **Ph2** | Task 1 + Task 2 |

---

## 9. AI Tutor

Phase 1 delivers tutor experience through **Speaking** + **TOEIC explain-why**. Dedicated coach modes expand in Ph2.

| Feature | Phase | Lexora module / notes |
|---|---|---|
| AI Chat | **Ph1** | Speaking conversation |
| AI Teacher | **Ph1** | Session intro + guidance |
| AI Grammar Coach | **Ph3+** | Feedback in Speaking; full coach Ph2 |
| AI Vocabulary Coach | **Ph2** | |
| AI Speaking Coach | **Ph1** | [`tutor-speaking-prompt.md`](../AI/tutor-speaking-prompt.md) |
| AI Writing Coach | **Ph2** | |
| AI Interview Coach | **Ph2** | Lexora Interview |
| AI Translator | **Ph2** | Contextual, not exam cheat |
| AI Explain Mistakes | **Ph1** | TOEIC + Speaking summary |
| AI Generate Quiz | **Ph2** | |
| AI Learning Advisor | **Ph1** | Roadmap + next lesson |

---

## 10. TOEIC

**Lexora TOEIC** — Phase 1 launch (Listening + Reading only).

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Part 1 | **Ph1** | Photographs |
| Part 2 | **Ph1** | Question–response |
| Part 3 | **Ph1** | Conversations |
| Part 4 | **Ph1** | Talks |
| Part 5 | **Ph1** | Incomplete sentences |
| Part 6 | **Ph1** | Text completion |
| Part 7 | **Ph1** | Reading comprehension |
| Mini Test | **Ph1** | Shorter diagnostic-style test |
| Full Test | **Ph1** | 1 mock at launch; 3+ Ph2 |
| Timed Test | **Ph1** | ETS-aligned timing |
| Review Mode | **Ph1** | Post-exam answer review |
| AI Explanation | **Ph1** | TR-09 explain-why |

---

## 11. IELTS

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Listening | **Ph2** | P2-T17 |
| Reading | **Ph2** | |
| Writing Task 1 | **Ph2** | With Lexora Writing |
| Writing Task 2 | **Ph2** | |
| Speaking Part 1 | **Ph2** | Reuse speech infra |
| Speaking Part 2 | **Ph2** | Cue card flow |
| Speaking Part 3 | **Ph2** | |
| Mock Test | **Ph2** | Full IELTS mock |

---

## 12. Mock Exams

| Feature | Phase | Lexora module / notes |
|---|---|---|
| TOEIC | **Ph1** | 1 full mock/month free tier |
| IELTS | **Ph2** | |
| TOEFL | **Ph2** | Stub P2-T18 |
| CEFR | **Ph2** | |
| Cambridge | **Ph3** | |
| Adaptive Test | **Ph1** | TOEIC diagnostic + adaptive path |
| AI Score Prediction | **Ph1** | TR-02 estimated score |

---

## 13. Learning Plan

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Daily Plan | **Ph2** | Ph1: TOEIC improvement plan only |
| Weekly Plan | **Ph2** | |
| Monthly Plan | **Ph2** | |
| Reminder | **Ph3+** | Email at launch; push Ph4 |
| Smart Review | **Ph2** | SRS + weak-skill queue |
| AI Recommendation | **Ph1** | Next TOEIC lesson / Speaking topic |
| Adaptive Learning | **Ph1** | TOEIC adaptive engine |

---

## 14. Dashboard

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Current Level | **Ph1** | PL-22 |
| Target Score | **Ph1** | TOEIC goal |
| Today's Tasks | **Ph3+** | Recommended lesson + speaking |
| Weekly Progress | **Ph1** | |
| Monthly Progress | **Ph1** | |
| Learning Time | **Ph1** | Session duration tracking |
| Vocabulary Learned | **Ph2** | Full vocab product |
| Grammar Accuracy | **Ph1** | From quizzes + Speaking |
| Listening Accuracy | **Ph1** | TOEIC listening stats |
| Reading Accuracy | **Ph1** | TOEIC reading stats |

---

## 15. Analytics

| Feature | Phase | Lexora module / notes |
|---|---|---|
| Learning Heatmap | **Ph2** | Calendar activity view |
| Weak Skills | **Ph1** | Diagnostic + dashboard |
| Strong Skills | **Ph1** | |
| Score Prediction | **Ph1** | TOEIC estimate trend |
| Study Trend | **Ph2** | Charts over time |
| Daily Streak | **Ph2** | P2-T27 gamification |
| Goal Achievement | **Ph2** | Target score milestones |

---

## 16. Gamification

All **Ph2** unless noted.

| Feature | Phase | Notes |
|---|---|---|
| XP | **Ph2** | |
| Coins | **Ph2** | Optional virtual currency |
| Levels | **Ph2** | |
| Badges | **Ph2** | |
| Daily Streak | **Ph2** | |
| Leaderboard | **Ph3** | Needs social graph |
| Weekly Challenge | **Ph2** | |
| Monthly Challenge | **Ph2** | |
| Achievement | **Ph2** | |

---

## 17. Social

| Feature | Phase | Notes |
|---|---|---|
| Friends | **Ph3** | |
| Study Group | **Ph3** | Overlaps Community |
| Discussion | **Ph3** | |
| Ranking | **Ph3** | Leaderboard dependency |
| Share Achievement | **Ph2** | Share card image — no friend graph |
| Challenge Friends | **Ph3** | |

---

## 18. Community

| Feature | Phase | Notes |
|---|---|---|
| Q&A | **Ph3** | |
| Forum | **Ph3** | |
| AI Moderation | **Ph3** | Reuse guardrails |
| Study Groups | **Ph3** | |
| Teacher Live | **Ph3** | Live sessions — separate ops |
| Events | **Ph3** | |

---

## 19. Teacher Portal

| Feature | Phase | Notes |
|---|---|---|
| Student Management | **Ph2** | B2B lite — P2-T20 |
| Homework | **Ph2** | Speaking assignments P2-T21 |
| Assignment | **Ph2** | |
| AI Reports | **Ph2** | Progress summaries |
| Attendance | **Ph3** | Full Schools product |
| Gradebook | **Ph3** | |
| Dashboard | **Ph2** | P2-T22 teacher view |

---

## 20. School Portal

**Lexora for Schools** — Phase 3 (pilot stubs in Ph2).

| Feature | Phase | Notes |
|---|---|---|
| Class Management | **Ph3** | |
| Teacher Management | **Ph3** | |
| Student Management | **Ph3** | Ph2: center admin lite |
| Timetable | **Ph3** | |
| Learning Analytics | **Ph2** | Center-level analytics |
| Parent Reports | **Ph3** | |

---

## 21. Enterprise

**Lexora Enterprise** — Phase 3.

| Feature | Phase | Notes |
|---|---|---|
| Employee Management | **Ph3** | |
| Learning Campaign | **Ph3** | |
| Business English | **Ph2** | Lexora Business — learner side |
| HR Dashboard | **Ph3** | |
| Certificates | **Ph2** | Digital completion; HR tracking Ph3 |
| Team Progress | **Ph3** | |

---

## 22. Payments

Vietnam-local gateways prioritized per [`prd-platform.md`](platform/prd-platform.md).

| Feature | Phase | Notes |
|---|---|---|
| VNPay | **Ph1** | PL-15 |
| MoMo | **Ph1** | PL-14 |
| ZaloPay | **Ph2** | |
| ShopeePay | **Ph2** | |
| VietQR | **Ph2** | |
| Internet Banking | **Ph2** | Often via VNPay |
| Visa / Mastercard | **Ph1** | PL-16 |
| Apple Pay | **Ph4** | In-app purchase |
| Google Pay | **Ph4** | Play billing |

---

## 23. Notification

| Feature | Phase | Notes |
|---|---|---|
| Push Notification | **Ph4** | Native app |
| Email | **Ph1** | Receipt, reset, reminders |
| SMS | **Ph2** | OTP already Ph1; marketing SMS Ph2 |
| Learning Reminder | **Ph3+** | Email; push Ph4 |
| Challenge Reminder | **Ph2** | With gamification |
| Payment Reminder | **Ph3+** | Renewal / failed payment |

---

## 24. Certificates

| Feature | Phase | Notes |
|---|---|---|
| TOEIC Certificate Tracking | **Ph3** | User-upload official cert |
| IELTS Tracking | **Ph3** | |
| Course Certificate | **Ph2** | Lexora completion PDF |
| Digital Badge | **Ph2** | With gamification |
| Completion Certificate | **Ph2** | Course / plan complete |

---

## 25. AI Features (Platform)

| Feature | Phase | Notes |
|---|---|---|
| RAG Knowledge Base | **Ph4** | TOEIC content + tutor context |
| Multi-Agent Tutor | **Ph2** | Grammar + vocab + speaking agents |
| Voice Conversation | **Ph1** | Speaking MVP |
| Image-to-English | **Ph3** | Describe / label |
| OCR Homework | **Ph3** | Scan worksheet |
| AI Explain Anything | **Ph1** | Explain-why pattern |
| AI Flashcard Generator | **Ph2** | |
| AI Quiz Generator | **Ph2** | |
| AI Lesson Generator | **Ph2** | Internal content tool first |
| AI Personalized Coach | **Ph1** | Speaking + roadmap |
| AI Daily Report | **Ph2** | |
| AI Weekly Summary | **Ph2** | Email digest |
| AI Motivation Coach | **Ph2** | Streak / nudge copy |

---

## 26. Content Management

Internal admin — not learner-facing.

| Feature | Phase | Notes |
|---|---|---|
| Course Management | **Ph2** | Admin CMS lite |
| Lesson Management | **Ph2** | |
| Question Bank | **Ph1** | TOEIC bank — seed at launch |
| Vocabulary Bank | **Ph2** | |
| Grammar Library | **Ph2** | |
| AI Prompt Management | **Ph1** | Versioned prompts in repo → admin UI Ph2 |
| Media Library | **Ph2** | Audio/images |

---

## 27. Administration

| Feature | Phase | Notes |
|---|---|---|
| User Management | **Ph2** | Internal admin |
| Role Management | **Ph3** | RBAC for schools/enterprise |
| Permission | **Ph3** | |
| Audit Log | **Ph3** | |
| Analytics | **Ph2** | Ops dashboard |
| Feature Flag | **Ph3+** | Env-based; admin UI Ph2 |
| Subscription | **Ph1** | PL-17 |
| Billing | **Ph1** | |
| Monitoring | **Ph1** | Health + error tracking — P1-T088+ |

---

## 28. Mobile

**Phase 1c** — Expo native app. Phase 1 is **responsive web** (mobile-first).

| Feature | Phase | Notes |
|---|---|---|
| Offline Learning | **Ph4** | Cached lessons |
| Offline Vocabulary | **Ph4** | Download word lists |
| Download Lessons | **Ph4** | |
| Widget | **Ph4** | Daily streak / word |
| Daily Notification | **Ph4** | Push |
| Voice Practice | **Ph1** | Web mic works; native UX Ph4 |

---

## Phases 1–3 Web MVP — Feature Checklist

What **ships at public launch (M5)** on web:

### In scope ✅

- Auth: Register, Login, Google, Facebook, OTP, Forgot Password
- Profile: Avatar, Learning Goal, Target Score
- Placement: TOEIC diagnostic, skill analysis, weakness detection, roadmap
- Speaking: AI conversation, 4 dimension scores, daily sessions, history
- TOEIC: Parts 1–7, mini + full mock, timed, review, AI explanation
- Dashboard: Level, target, progress, learning time, weak/strong skills
- Payments: MoMo, VNPay, Visa/Mastercard, subscription
- Notifications: Email (learning + payment)
- AI: Voice conversation, explain mistakes, personalized coach (Speaking + TOEIC)

### Out of scope at launch ❌ (later phases)

- Apple Login (web), full Vocabulary/Grammar standalone apps
- IELTS, TOEFL, Writing, Business, Interview products
- Gamification (XP, badges, leaderboard)
- Social, Community, Teacher/School/Enterprise portals
- ZaloPay, ShopeePay, VietQR, Apple/Google Pay
- Push notifications, offline mobile
- Full CMS admin, certificates, OCR, image-to-English

---

## Mapping to Product Modules

| Catalog sections | Lexora product module | Phase |
|---|---|---|
| 1, 14, 22, 23, 27 (partial) | **Platform** | Ph1 |
| 7, 9 (speaking) | **Lexora Speaking** | Ph2 |
| 2, 5 (TOEIC), 6 (TOEIC), 10, 12 (TOEIC) | **Lexora TOEIC** | Ph3 |
| 3, 4, 13, 15, 16 | **Learning engine** (shared) | Ph1–3 partial → Ph5 |
| 8, 9 (writing) | **Lexora Writing** | Ph5 |
| 7 (business), 21 (partial) | **Lexora Business** | Ph5 |
| 7 (interview), 9 (interview) | **Lexora Interview** | Ph5 |
| 11, 12 (IELTS) | **IELTS module** | Ph5 |
| 17, 18 | **Social / Community** | Ph6 |
| 19, 20 | **Schools** | Ph5 lite → Ph6 |
| 21 | **Enterprise** | Ph6 |
| 28 | **Mobile app** | Ph4 |

---

## References

| Document | Link |
|---|---|
| Master plan | [`master-plan.md`](master-plan.md) |
| Platform PRD | [`platform/prd-platform.md`](platform/prd-platform.md) |
| Speaking PRD | [`speaking/prd-speaking.md`](speaking/prd-speaking.md) |
| TOEIC PRD | [`toeic/prd-toeic.md`](toeic/prd-toeic.md) |
| Phase 5 plan | [`phases/phase-5-growth.md`](phases/phase-5-growth.md) |
| Phase index | [`phases/README.md`](phases/README.md) |
| Doc file plan | [`plan-by-feature.md`](plan-by-feature.md) |
