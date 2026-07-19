#!/usr/bin/env npx tsx
/**
 * Seed TOEIC question bank (500 questions) into MongoDB.
 * Run: npm run db:seed-toeic
 */
import { connectDatabase } from "../lib/db/mongoose";
import { MOCK_FORM_ID } from "../lib/modules/toeic/constants";
import { expandQuestionsToCount, getSampleQuestions } from "../lib/modules/toeic/content";
import { ToeicQuestionModel } from "../lib/modules/toeic/models";

async function main() {
  await connectDatabase();

  const samples = getSampleQuestions();
  const questions = expandQuestionsToCount(samples, 500);

  let upserted = 0;
  for (const q of questions) {
    await ToeicQuestionModel.findOneAndUpdate(
      { questionId: q.id },
      {
        questionId: q.id,
        section: q.section,
        part: q.part,
        skill: q.skill,
        questionText: q.questionText,
        choices: q.choices,
        correctChoiceId: q.correctChoiceId,
        stimulus: q.stimulus,
        audioUrl: q.audioUrl,
        explanation: q.explanation,
        difficulty: q.difficulty,
        formIds: [MOCK_FORM_ID],
      },
      { upsert: true },
    );
    upserted += 1;
  }

  const count = await ToeicQuestionModel.countDocuments();
  console.log(`Seeded ${upserted} questions. Total in DB: ${count}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
