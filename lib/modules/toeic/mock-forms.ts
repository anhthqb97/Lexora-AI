import type { MockFormId } from "./constants";
import { MOCK_FORM_IDS } from "./constants";
import { expandQuestionsToCount, getSampleQuestions, selectMockQuestionIds } from "./content";
import { MOCK_QUESTION_COUNT } from "./constants";

export function getMockFormLabel(formId: MockFormId): string {
  const labels: Record<MockFormId, string> = {
    "MOCK-A": "Đề A",
    "MOCK-B": "Đề B",
    "MOCK-C": "Đề C",
  };
  return labels[formId] ?? formId;
}

export function listMockForms(): { id: MockFormId; label: string }[] {
  return MOCK_FORM_IDS.map((id) => ({ id, label: getMockFormLabel(id) }));
}

export async function selectMockQuestionIdsForForm(formId: MockFormId): Promise<string[]> {
  const base = await selectMockQuestionIds();
  if (base.length >= MOCK_QUESTION_COUNT) {
    const offset = MOCK_FORM_IDS.indexOf(formId);
    return base.map((id, i) => `${id}-${formId}-${(i + offset) % 3}`);
  }
  const samples = expandQuestionsToCount(getSampleQuestions(), MOCK_QUESTION_COUNT);
  const offset = MOCK_FORM_IDS.indexOf(formId);
  return samples.map((q, i) => `${q.id}-${formId}-${(i + offset) % 3}`);
}
