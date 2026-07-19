# TOEIC Lesson Library — Content Expansion

**Task:** P2-T15  
**Version:** 1.0  
**Last Updated:** 2026-07-19

---

## Overview

Full TOEIC lesson library with 100+ adaptive lessons covering Listening (Parts 1–4) and Reading (Parts 5–7).

---

## Lesson Structure

| Section | Parts | Lessons | Skills |
|---|---|---|---|
| Listening | 1–4 | 40 | detail, inference, photo description |
| Reading | 5–7 | 60 | grammar, vocabulary, reading comprehension |

---

## Lesson Tags

- `listening-detail`, `listening-inference`
- `grammar`, `vocabulary`, `reading-detail`, `reading-inference`

---

## Content Pipeline

1. Author lesson in `docs/product/toeic/content-map-toeic.md`
2. Seed questions via `npm run db:seed-toeic`
3. Map lessons to diagnostic skill gaps in `lib/modules/toeic/evaluation.ts`

---

## Milestone

- **M8:** 100+ lessons live
- **Coverage:** All 7 TOEIC parts represented
