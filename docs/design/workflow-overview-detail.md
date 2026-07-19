# Workflow Design — Overview & Detail

**Product:** Lexora AI
**Version:** 1.0
**Last Updated:** 2026-07-19

Visual workflow reference with **overview** (big picture) and **detail** (step-by-step) flowcharts for design, dev, and QA.

**How to read this doc:**
- **Overview** — stakeholder view, cross-feature journeys
- **Detail** — screen-level steps, decisions, error paths
- Diagrams use [Mermaid](https://mermaid.js.org/) — render in GitHub, Cursor, or VS Code

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [User Journey Overview](#2-user-journey-overview)
3. [Platform Workflows](#3-platform-workflows)
4. [Lexora Speaking Workflows](#4-lexora-speaking-workflows)
5. [Lexora TOEIC Workflows](#5-lexora-toeic-workflows)
6. [Billing & Paywall Workflows](#6-billing--paywall-workflows)
7. [Screen Map (Sitemap)](#7-screen-map-sitemap)
8. [State Diagrams](#8-state-diagrams)

---

## 1. System Overview

High-level architecture of learner touchpoints across Lexora AI.

```mermaid
flowchart TB
    subgraph Entry["Entry"]
        L[Landing / Login]
    end

    subgraph Platform["Lexora Platform"]
        A[Auth]
        O[Onboarding]
        D[Dashboard]
        B[Billing]
        S[Settings]
    end

    subgraph Products["Lexora Products"]
        T[Lexora TOEIC]
        SP[Lexora Speaking]
        W[Lexora Writing]
        BU[Lexora Business]
        I[Lexora Interview]
    end

    subgraph AI["AI Layer"]
        LLM[LLM Tutor Gateway]
        SPE[Speech Engine]
        MOD[Content Moderation]
    end

    L --> A
    A --> O
    O --> D
    D --> T
    D --> SP
    D --> W
    D --> BU
    D --> I
    D --> S
    SP --> SPE
    SP --> LLM
    T --> LLM
    LLM --> MOD
    B -.->|paywall| SP
    B -.->|paywall| T
```

---

## 2. User Journey Overview

### 2.1 New Learner — First Session (Happy Path)

```mermaid
flowchart LR
    A[Discover Lexora] --> B[Register]
    B --> C[Onboarding]
    C --> D[Dashboard]
    D --> E[Start Speaking]
    E --> F[First Session]
    F --> G[Summary + Scores]
    G --> H[Return Next Day]
```

### 2.2 Returning Learner — Daily Practice

```mermaid
flowchart LR
    A[Login] --> B[Dashboard]
    B --> C{Choose Product}
    C -->|Speaking| D[Speaking Session]
    C -->|TOEIC| E[Lesson / Mock]
    D --> F[Progress Updated]
    E --> F
    F --> B
```

### 2.3 Free → Paid Conversion

```mermaid
flowchart LR
    A[Free User] --> B[Uses 3 Sessions]
    B --> C[Limit Hit]
    C --> D[Paywall]
    D --> E{Decision}
    E -->|Upgrade| F[Checkout]
    E -->|Later| G[Dashboard]
    F --> H[Paid User]
    H --> I[Unlimited Access]
```

---

## 3. Platform Workflows

### 3.1 Overview — Authentication

```mermaid
flowchart TD
    START([User opens app]) --> LAND[Landing / Login]
    LAND --> CHOICE{Has account?}
    CHOICE -->|No| REG[Register]
    CHOICE -->|Yes| LOGIN[Login]
    REG --> AUTH_OK{Auth success?}
    LOGIN --> AUTH_OK
    AUTH_OK -->|Yes| ONB{Onboarding done?}
    AUTH_OK -->|No| LAND
    ONB -->|No| ONBOARD[Onboarding]
    ONB -->|Yes| DASH[Dashboard]
    ONBOARD --> DASH
```

### 3.2 Detail — Registration Paths

```mermaid
flowchart TD
    REG[Register Screen] --> M{Method}
    M -->|Email| E1[Enter email + password]
    M -->|Phone| P1[Enter phone number]
    M -->|Google| G1[OAuth redirect]
    M -->|Facebook| F1[OAuth redirect]

    E1 --> V1{Valid?}
    V1 -->|No| E1
    V1 -->|Yes| ACC[Create account]

    P1 --> OTP[Send OTP]
    OTP --> P2[Enter 6-digit code]
    P2 --> V2{OTP valid?}
    V2 -->|No| P2
    V2 -->|Expired| OTP
    V2 -->|Yes| ACC

    G1 --> ACC
    F1 --> ACC

    ACC --> ONB1[Onboarding: Goal]
    ONB1 --> ONB2[Onboarding: Level]
    ONB2 --> DASH[Dashboard]
```

| Step | Screen | Route | Key action |
|---|---|---|---|
| 1 | Landing | `/` | Tap Register |
| 2a | Email register | `/register` | Submit form |
| 2b | Phone OTP | `/login/phone` | Verify OTP |
| 2c | OAuth | external | Callback |
| 3 | Goal | `/onboarding/goal` | Select 1 goal |
| 4 | Level | `/onboarding/level` | Select A1–C1 |
| 5 | Dashboard | `/dashboard` | Land |

### 3.3 Detail — Login (Returning User)

```mermaid
flowchart TD
    LAND[Landing] --> M{Method}
    M -->|Email| E[Email + password]
    M -->|Phone| P[OTP flow]
    M -->|Google/Facebook| O[OAuth]

    E --> OK{Valid?}
    P --> OK
    O --> OK

    OK -->|No| ERR[Show error]
    ERR --> LAND
    OK -->|Yes| DASH[Dashboard]
```

### 3.4 Overview — Onboarding

```mermaid
flowchart LR
    A[Auth complete] --> B[Select Goal]
    B --> C[Select Level]
    C --> D[Save profile]
    D --> E[Dashboard]
```

### 3.5 Detail — Onboarding

```mermaid
flowchart TD
    START([New user]) --> G[Goal Screen]

    G --> G1{Selection}
    G1 -->|TOEIC| L[Level Screen]
    G1 -->|Speaking| L
    G1 -->|Business| L
    G1 -->|General| L

    L --> L1{Level A1-C1}
    L1 --> SAVE[PATCH /users/me/onboarding]
    SAVE --> DASH[Dashboard]

    L --> UNSURE[Tôi không chắc]
    UNSURE -->|Phase 2| PLACE[Placement test stub]
    PLACE --> L
```

**Goal options:**

| ID | Label (VI) | Product emphasis |
|---|---|---|
| toeic | Luyện thi TOEIC | Lexora TOEIC card highlighted |
| speaking | Luyện nói | Lexora Speaking highlighted |
| business | Tiếng Anh công việc | Business + Speaking |
| general | Tiếng Anh tổng quát | All products equal |

---

## 4. Lexora Speaking Workflows

### 4.1 Overview — Speaking Journey

```mermaid
flowchart TD
    DASH[Dashboard] --> SH[Speaking Home]
    SH --> SETUP[Session Setup]
    SETUP --> CONSENT{Voice consent?}
    CONSENT -->|First time| VC[Consent modal]
    CONSENT -->|Granted| LIVE[Live Session]
    VC --> LIVE
    LIVE --> LOOP[Conversation loop]
    LOOP --> END[Session end]
    END --> SUM[Summary]
    SUM --> RETRY{Retry phrases?}
    RETRY -->|Yes| RP[Retry screen]
    RETRY -->|No| SH
    RP --> SH
```

### 4.2 Detail — Session Setup

```mermaid
flowchart TD
    START([Tap Bắt đầu luyện nói]) --> LIMIT{Free limit OK?}
    LIMIT -->|No| PAY[Paywall modal]
    LIMIT -->|Yes| TYPE[Step 1: Session type]

    TYPE --> T1{Type}
    T1 -->|Free Talk| DUR[Step 3: Duration]
    T1 -->|Topic| TOP[Step 2: Pick topic]
    T1 -->|Scenario| SCEN[Step 2: Pick scenario]
    T1 -->|TOEIC| TOE[Step 2: TOEIC prompt]

    TOP --> DUR
    SCEN --> DUR
    TOE --> DUR

    DUR --> D1{5/10/15/20 min}
    D1 --> CREATE[POST /speaking/sessions]
    CREATE --> LIVE[Live Session]
```

### 4.3 Detail — Live Session Loop

```mermaid
flowchart TD
    START([Session active]) --> AI[AI greeting + question]
    AI --> WAIT[Wait for learner]

    WAIT --> MIC{Mic action}
    MIC -->|Hold to speak| REC[Record audio]
    MIC -->|Help toggle| HELP[Vietnamese hint]
    HELP --> WAIT

    REC --> STT[Speech-to-text]
    STT --> EMPTY{Speech detected?}
    EMPTY -->|No| NODET[Prompt: try again]
    NODET --> WAIT

    EMPTY -->|Yes| EVAL[Score turn]
    EVAL --> LLM[AI response + optional correction]
    LLM --> DISPLAY[Show transcript + response]
    DISPLAY --> TIME{Time left?}

    TIME -->|Yes| WAIT
    TIME -->|1 min warning| WARN[Show gentle warning]
    WARN --> WAIT
    TIME -->|No| END[Auto end session]

    END --> EVALFULL[Full evaluation job]
    EVALFULL --> SUM[Summary screen]
```

### 4.4 Detail — Voice Consent (First Time)

```mermaid
flowchart TD
    START([First speaking session]) --> MODAL[Consent modal]
    MODAL --> READ[User reads privacy text]
    READ --> CHECK{Checkbox + Allow?}
    CHECK -->|Cancel| BACK[Return to setup]
    CHECK -->|Allow| PERM[Browser mic permission]
    PERM --> GRANT{Granted?}
    GRANT -->|Yes| LOG[Log consent + start session]
    GRANT -->|No| DENY[Show mic denied help]
    DENY --> FALLBACK[Offer text fallback mode]
```

### 4.5 Detail — Session Summary

```mermaid
flowchart TD
    END([Session ended]) --> LOAD[Loading evaluation]
    LOAD --> POLL{Summary ready?}
    POLL -->|No, wait| POLL
    POLL -->|Timeout 10s| ERR[Show retry]
    POLL -->|Yes| SHOW[Display scores + feedback]

    SHOW --> ACT{User action}
    ACT -->|Retry phrases| RETRY[Retry screen]
    ACT -->|New session| SETUP[Session setup]
    ACT -->|Home| DASH[Dashboard]

    RETRY --> PHRASE[Pick flagged phrase]
    PHRASE --> HEAR[Hear model pronunciation]
    HEAR --> RREC[Learner records retry]
    RREC --> MINI[Mini feedback]
    MINI --> MORE{More phrases?}
    MORE -->|Yes| PHRASE
    MORE -->|No| SHOW
```

### 4.6 Error Paths — Speaking

```mermaid
flowchart TD
    subgraph Errors
        E1[Mic denied] --> A1[Settings instructions]
        E2[No speech] --> A2[Retry speak]
        E3[AI timeout] --> A3[Retry / text mode]
        E4[Network drop] --> A4{Within 30 min?}
        E4 -->|Yes| A5[Resume session]
        E4 -->|No| A6[Session abandoned]
        E5[Limit reached] --> A7[Paywall]
    end
```

---

## 5. Lexora TOEIC Workflows

### 5.1 Overview — TOEIC Journey

```mermaid
flowchart TD
    DASH[Dashboard] --> TH[TOEIC Home]
    TH --> CHOICE{User path}
    CHOICE -->|New user| DIAG[Diagnostic test]
    CHOICE -->|Returning| LESS[Adaptive lesson]
    CHOICE -->|Ready| MOCK[Mock exam]

    DIAG --> PLAN[Improvement plan]
    PLAN --> LESS
    LESS --> PROGRESS[Score tracking]
    MOCK --> REVIEW[Review + explain-why]
    REVIEW --> PROGRESS
    PROGRESS --> TH
```

### 5.2 Detail — Diagnostic Test

```mermaid
flowchart TD
    START([Start diagnostic]) --> INTRO[Intro: 30 min, L+R]
    INTRO --> LIST[Listening section]
    LIST --> READ[Reading section]
    READ --> CALC[Calculate estimated score]
    CALC --> BREAK[Skill breakdown]
    BREAK --> WEAK[Identify weak areas]
    WEAK --> PLAN[Generate improvement plan]
    PLAN --> DASH[TOEIC Home with results]
```

### 5.3 Detail — Mock Exam

```mermaid
flowchart TD
    START([Start mock]) --> LIMIT{Free mock available?}
    LIMIT -->|No| PAY[Paywall]
    LIMIT -->|Yes| RULES[Exam rules + timer info]
    RULES --> LSEC[Listening 45 min]
    LSEC --> RSEC[Reading 75 min]
    RSEC --> SUBMIT[Submit exam]
    SUBMIT --> SCORE[Score report]
    SCORE --> REV[Question review]
    REV --> WHY[Explain-why per wrong answer]
    WHY --> SAVE[Save to progress]
```

---

## 6. Billing & Paywall Workflows

### 6.1 Overview

```mermaid
flowchart TD
    USE[User hits feature limit] --> PW[Paywall modal]
    PW --> UP{Upgrade?}
    UP -->|No| BACK[Return to app]
    UP -->|Yes| CK[Checkout]
    CK --> PAY{Payment method}
    PAY -->|MoMo| M[MoMo flow]
    PAY -->|VNPay| V[VNPay flow]
    PAY -->|Card| C[Card flow]
    M --> OK{Success?}
    V --> OK
    C --> OK
    OK -->|Yes| SUCCESS[Tier = paid]
    OK -->|No| FAIL[Error + retry]
    SUCCESS --> UNLOCK[Feature unlocked]
```

### 6.2 Detail — Paywall Trigger Points

```mermaid
flowchart LR
    subgraph Triggers
        T1[Speaking: 4th session/week]
        T2[TOEIC: 2nd mock/month]
        T3[Manual: Upgrade CTA]
    end

    T1 --> PW[Paywall Modal]
    T2 --> PW
    T3 --> CK[Checkout directly]
    PW --> CK
```

| Trigger | Free limit | Message (VI) |
|---|---|---|
| Speaking session | 3/week | "Bạn đã dùng hết 3 buổi luyện nói tuần này" |
| TOEIC mock | 1/month | "Nâng cấp để làm thi thử không giới hạn" |

---

## 7. Screen Map (Sitemap)

```mermaid
flowchart TD
    ROOT[/] --> REG[/register]
    ROOT --> LOGIN[/login]
    ROOT --> OTP[/login/phone]

    ROOT --> ONB1[/onboarding/goal]
    ONB1 --> ONB2[/onboarding/level]
    ONB2 --> DASH[/dashboard]

    DASH --> SP[/speaking]
    DASH --> TOEIC[/toeic]
    DASH --> SET[/settings]
    DASH --> CK[/checkout]

    SP --> SNEW[/speaking/new]
    SNEW --> SLIVE[/speaking/session/id]
    SLIVE --> SSUM[/speaking/session/id/summary]
    SSUM --> SRET[/speaking/session/id/retry]
    SP --> SPROG[/speaking/progress]

    TOEIC --> TDIAG[/toeic/diagnostic]
    TOEIC --> TLESS[/toeic/lesson/id]
    TOEIC --> TMOCK[/toeic/mock/id]
    TMOCK --> TRES[/toeic/mock/id/results]
```

---

## 8. State Diagrams

### 8.1 Speaking Session States

```mermaid
stateDiagram-v2
    [*] --> Created: POST /sessions
    Created --> Active: User enters live session
    Active --> Active: Conversation turns
    Active --> Ending: Timer ends / user ends
    Active --> Abandoned: 30 min inactive
    Ending --> Evaluating: POST /end
    Evaluating --> Completed: Summary ready
    Completed --> [*]
    Abandoned --> [*]
```

### 8.2 User Subscription States

```mermaid
stateDiagram-v2
    [*] --> Free: Registration
    Free --> Paid: Payment success
    Paid --> Paid: Renewal
    Paid --> Cancelled: User cancels
    Cancelled --> Free: Period ends
    Paid --> Free: Payment failed
```

### 8.3 Live Session UI States

```mermaid
stateDiagram-v2
    [*] --> Idle: AI finished speaking
    Idle --> Listening: User presses mic
    Listening --> Processing: User releases mic
    Processing --> Idle: AI response shown
    Listening --> Idle: No speech detected
    Processing --> Error: Timeout / network
    Error --> Idle: Retry
    Idle --> Ended: Timer zero
    Ended --> [*]
```

---

## 9. Flow Index (Quick Reference)

| Flow | Overview section | Detail section |
|---|---|---|
| System architecture | [§1](#1-system-overview) | — |
| New learner journey | [§2.1](#21-new-learner--first-session-happy-path) | [§3.2](#32-detail--registration-paths) |
| Login | [§3.1](#31-overview--authentication) | [§3.3](#33-detail--login-returning-user) |
| Onboarding | [§3.4](#34-overview--onboarding) | [§3.5](#35-detail--onboarding) |
| Speaking session | [§4.1](#41-overview--speaking-journey) | [§4.2–4.5](#42-detail--session-setup) |
| Speaking errors | — | [§4.6](#46-error-paths--speaking) |
| TOEIC | [§5.1](#51-overview--toeic-journey) | [§5.2–5.3](#52-detail--diagnostic-test) |
| Billing | [§6.1](#61-overview) | [§6.2](#62-detail--paywall-trigger-points) |
| All screens | [§7](#7-screen-map-sitemap) | — |
| Session/subscription states | [§8](#8-state-diagrams) | — |

---

## 10. Related Documents

| Document | Purpose |
|---|---|
| [`design-system.md`](design-system.md) | Colors, typography, components |
| [`ux-platform.md`](ux-platform.md) | Platform screen specs |
| [`ux-speaking.md`](ux-speaking.md) | Speaking screen specs |
| [`../product/speaking/prd-speaking.md`](../product/speaking/prd-speaking.md) | Speaking requirements |
| [`../product/platform/prd-platform.md`](../product/platform/prd-platform.md) | Platform requirements |
| [`../product/toeic/prd-toeic.md`](../product/toeic/prd-toeic.md) | TOEIC requirements |

---

## 11. Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-07-19 | Initial overview + detail workflows for Platform, Speaking, TOEIC, Billing |
