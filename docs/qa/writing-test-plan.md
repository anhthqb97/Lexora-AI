# QA Test Plan — Lexora Writing

**Task:** P2-T07  
**Version:** 1.0  
**Last Updated:** 2026-07-19  
**Owner:** QA

---

## Scope

Writing module: editor, submission, grammar correction, scores, history.

---

## Test Cases

| ID | Case | Steps | Expected |
|---|---|---|---|
| W-QA-01 | List prompts | GET /api/v1/writing/submissions | 5+ prompts returned |
| W-QA-02 | Submit valid essay | POST with 100+ words | 201 + scores |
| W-QA-03 | Too short | POST below minWords | 400 TOO_SHORT |
| W-QA-04 | Free limit | 4 submissions in 7 days | 429 LIMIT_REACHED |
| W-QA-05 | History | GET after submit | Submission in list |
| W-QA-06 | Detail page | Open /writing/[id] | Scores + corrections visible |
| W-QA-07 | Stub LLM | No OPENAI_API_KEY | Stub evaluation returned |

---

## Automation

- Unit: `tests/lib/modules/writing/service.test.ts`
- E2E (future): `e2e/writing/submit.spec.ts`

---

## Sign-off

| Role | Name | Date |
|---|---|---|
| QA | | |
| PM | | |
