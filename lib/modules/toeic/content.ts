import { connectDatabase } from "@/lib/db/mongoose";
import {
  DIAGNOSTIC_QUESTION_COUNT,
  MOCK_FORM_ID,
  MOCK_QUESTION_COUNT,
  type SkillTag,
  type ToeicSection,
} from "./constants";
import { ToeicQuestionModel, toQuestionDTO } from "./models";
import type { ToeicQuestion } from "./types";

const LISTENING_SKILLS: SkillTag[] = ["listening-detail", "listening-inference"];
const READING_SKILLS: SkillTag[] = ["grammar", "vocabulary", "reading-detail", "reading-inference"];

function buildSampleQuestion(index: number, section: ToeicSection, part: number): ToeicQuestion {
  const skill =
    section === "listening"
      ? LISTENING_SKILLS[index % LISTENING_SKILLS.length]
      : READING_SKILLS[index % READING_SKILLS.length];

  const prefix = section === "listening" ? "L" : "R";
  const id = `${prefix}-S${String(index + 1).padStart(3, "0")}`;

  if (section === "reading" && part >= 5) {
    return {
      id,
      section,
      part,
      skill,
      questionText: `Choose the best answer: "The manager asked the team to submit the report ___ Friday."`,
      choices: [
        { id: "A", text: "on" },
        { id: "B", text: "at" },
        { id: "C", text: "in" },
        { id: "D", text: "by" },
      ],
      correctChoiceId: "D",
      stimulus:
        index % 3 === 0 ? "Office memo: All staff must complete safety training." : undefined,
      explanation: "Use 'by' for deadlines meaning no later than.",
      difficulty: (index % 5) + 1,
    };
  }

  return {
    id,
    section,
    part,
    skill,
    questionText:
      section === "listening"
        ? `Listen and choose the best response to: "Question ${index + 1}"`
        : `Read and choose the best answer for question ${index + 1}.`,
    choices: [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
      { id: "C", text: "Option C" },
    ],
    correctChoiceId: ["A", "B", "C"][index % 3],
    stimulus:
      section === "listening"
        ? `Transcript: Speaker discusses topic ${index + 1} in a business context.`
        : undefined,
    audioUrl: section === "listening" ? `/audio/toeic/${id}.mp3` : undefined,
    explanation: `The correct answer follows standard TOEIC ${section} pattern for part ${part}.`,
    difficulty: (index % 5) + 1,
  };
}

/** 55+ handcrafted-style samples for local dev without DB seed */
export function getSampleQuestions(): ToeicQuestion[] {
  const questions: ToeicQuestion[] = [];

  for (let i = 0; i < 25; i++) {
    const part = i < 6 ? 1 : i < 11 ? 2 : i < 19 ? 3 : 4;
    questions.push(buildSampleQuestion(i, "listening", part));
  }

  for (let i = 0; i < 30; i++) {
    const part = i < 10 ? 5 : i < 14 ? 6 : 7;
    questions.push(buildSampleQuestion(i + 25, "reading", part));
  }

  return questions;
}

export function expandQuestionsToCount(base: ToeicQuestion[], target: number): ToeicQuestion[] {
  if (base.length >= target) return base.slice(0, target);
  const expanded = [...base];
  let n = 0;
  while (expanded.length < target) {
    const src = base[n % base.length];
    expanded.push({
      ...src,
      id: `${src.id}-V${Math.floor(expanded.length / base.length)}`,
      questionText: `${src.questionText} (variant ${expanded.length})`,
    });
    n += 1;
  }
  return expanded;
}

export async function loadQuestionsFromDb(ids?: string[]): Promise<ToeicQuestion[]> {
  await connectDatabase();
  const filter = ids?.length ? { questionId: { $in: ids } } : {};
  const docs = await ToeicQuestionModel.find(filter).sort({ questionId: 1 });
  if (docs.length === 0) return [];
  return docs.map(toQuestionDTO);
}

export async function getQuestionsForAttempt(questionIds: string[]): Promise<ToeicQuestion[]> {
  const fromDb = await loadQuestionsFromDb(questionIds);
  if (fromDb.length === questionIds.length) return fromDb;

  const samples = expandQuestionsToCount(getSampleQuestions(), MOCK_QUESTION_COUNT);
  const sampleMap = new Map(samples.map((q) => [q.id, q]));
  return questionIds.map(
    (id) => sampleMap.get(id) ?? buildSampleQuestion(parseInt(id, 10) || 0, "reading", 5),
  );
}

export async function selectDiagnosticQuestionIds(): Promise<string[]> {
  const fromDb = await loadQuestionsFromDb();
  if (fromDb.length >= DIAGNOSTIC_QUESTION_COUNT) {
    const listening = fromDb.filter((q) => q.section === "listening").slice(0, 20);
    const reading = fromDb.filter((q) => q.section === "reading").slice(0, 20);
    return [...listening, ...reading].map((q) => q.id);
  }

  const samples = getSampleQuestions();
  const listening = samples.filter((q) => q.section === "listening").slice(0, 20);
  const reading = samples.filter((q) => q.section === "reading").slice(0, 20);
  return [...listening, ...reading].map((q) => q.id);
}

export async function selectMockQuestionIds(): Promise<string[]> {
  await connectDatabase();
  const mockQuestions = await ToeicQuestionModel.find({ formIds: MOCK_FORM_ID }).sort({
    questionId: 1,
  });

  if (mockQuestions.length >= MOCK_QUESTION_COUNT) {
    return mockQuestions.slice(0, MOCK_QUESTION_COUNT).map((d) => d.questionId);
  }

  return expandQuestionsToCount(getSampleQuestions(), MOCK_QUESTION_COUNT).map((q) => q.id);
}

export async function countQuestionsInDb(): Promise<number> {
  await connectDatabase();
  return ToeicQuestionModel.countDocuments();
}
