# Data Model — Lexora AI (MongoDB)

**Version:** 1.0
**Status:** Approved baseline
**Database:** MongoDB Atlas — **one cluster** (MVP)
**ODM:** Mongoose
**Last Updated:** 2026-07-19

Document schemas organized by **module** (`lib/modules/*`). One cluster with collection prefixes for MVP; collections move with service when extracted.

**Architecture:** [`architecture-decision-record.md`](architecture-decision-record.md)

---

## 1. Collection Map

```
lib/modules (MVP) → future microservice
─────────────────────────────────────
auth/             → auth-service
user/             → user-service
speaking/         → speaking-service
toeic/            → toeic-service
billing/          → billing-service
```

---

## 2. users (auth-service)

```javascript
{
  _id: ObjectId,
  email: String,              // unique, sparse
  phone: String,              // +84, unique, sparse
  passwordHash: String,       // null for OAuth
  oauthProvider: String,      // google | facebook | null
  oauthId: String,
  tier: String,               // free | paid
  status: String,             // active | deleted
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date             // soft delete
}
// Indexes: { email: 1 }, { phone: 1 }, unique sparse
```

---

## 3. user_profiles (user-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // ref users._id
  name: String,
  avatarUrl: String,
  goal: String,               // toeic | speaking | business | general
  level: String,              // A1 | A2 | B1 | B2 | C1
  locale: String,             // vi | en
  onboardingCompleted: Boolean,
  updatedAt: Date
}
// Index: { userId: 1 }, unique
```

---

## 4. user_consents (user-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,               // voice_recording | terms | privacy
  granted: Boolean,
  grantedAt: Date,
  ipAddress: String
}
```

---

## 5. speaking_sessions (speaking-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,               // free_talk | topic | scenario | toeic
  topicId: String,            // e.g. T-01
  scenarioId: String,
  durationMinutes: Number,    // 5 | 10 | 15 | 20
  status: String,             // created | active | evaluating | completed | abandoned
  vietnameseHelp: Boolean,
  startedAt: Date,
  endedAt: Date,
  expiresAt: Date             // resume window
}
// Index: { userId: 1, startedAt: -1 }
```

---

## 6. speaking_turns (speaking-service)

```javascript
{
  _id: ObjectId,
  sessionId: ObjectId,
  turnNumber: Number,
  role: String,               // user | assistant
  transcript: String,
  aiResponse: String,
  scores: {
    pronunciation: Number,
    fluency: Number
  },
  createdAt: Date
}
// Index: { sessionId: 1, turnNumber: 1 }
```

---

## 7. speaking_summaries (speaking-service)

```javascript
{
  _id: ObjectId,
  sessionId: ObjectId,        // unique
  userId: ObjectId,
  overallConfidence: Number,
  dimensions: {
    pronunciation: Number,
    fluency: Number,
    grammar: Number,
    vocabulary: Number,
    confidence: Number
  },
  improvements: [{
    original: String,
    corrected: String,
    reason: String
  }],
  topFocusAreas: [String],
  encouragement: String,
  createdAt: Date
}
```

---

## 8. subscriptions (billing-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  plan: String,               // monthly | annual
  status: String,             // active | cancelled | expired
  paymentProvider: String,    // momo | vnpay | card
  externalId: String,
  startsAt: Date,
  endsAt: Date,
  cancelledAt: Date
}
```

---

## 9. usage_tracking (speaking-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  feature: String,            // speaking | toeic_mock
  periodStart: Date,          // week start
  count: Number
}
// Index: { userId: 1, feature: 1, periodStart: 1 }, unique
```

---

## 10. toeic_attempts (toeic-service)

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,               // diagnostic | mock | lesson
  score: Number,
  sectionScores: {
    listening: Number,
    reading: Number
  },
  answers: [{
    questionId: String,
    selected: String,
    correct: Boolean
  }],
  completedAt: Date
}
```

---

## References

| Document | Link |
|---|---|
| Tech Stack | [`tech-stack.md`](tech-stack.md) |
| API Contracts | [`api-contracts.md`](api-contracts.md) |
