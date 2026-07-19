import mongoose from "mongoose";
import { chatCompletionOrStub, type ChatMessage } from "@/lib/ai/client";
import { loadSpeakingSystemPrompt } from "@/lib/ai/prompts";
import { connectDatabase } from "@/lib/db/mongoose";
import { getSpeechProvider } from "@/lib/speech";
import { UserProfile } from "@/lib/modules/user/models";
import {
  getFreeTalkOpener,
  getScenarioById,
  getTopicById,
  listScenarios,
  listTopics,
} from "./content";
import {
  adaptLevel,
  aggregateTurnScores,
  applyExamGuardrail,
  buildInlineCorrection,
  detectGrammarImprovements,
  generateEncouragement,
  generateExplainWhySummary,
  getLevelPromptHint,
  getTopFocusAreas,
  pickFollowUp,
  scoreTurn,
  weaveInlineCorrection,
} from "./evaluation";
import { assertCanStartSession, getWeeklyLimitStatus } from "./limits";
import {
  SpeakingSessionModel,
  SpeakingSummaryModel,
  SpeakingTurnModel,
  toSessionDTO,
} from "./models";
import type {
  CreateSessionInput,
  ProcessTurnInput,
  SessionWithTurns,
  SpeakingProgress,
  SpeakingSessionDTO,
  SpeakingSummaryDTO,
  SpeakingTrends,
  SpeakingTurn,
  TurnResult,
} from "./types";

export class SpeakingError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

const RESUME_WINDOW_MS = 30 * 60 * 1000;

async function getUserLevel(userId: string): Promise<string> {
  await connectDatabase();
  const profile = await UserProfile.findOne({ userId });
  return profile?.level ?? "B1";
}

async function getUserGoal(userId: string): Promise<string | undefined> {
  await connectDatabase();
  const profile = await UserProfile.findOne({ userId });
  return profile?.goal;
}

function toTurnDTO(doc: {
  _id: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
  turnNumber: number;
  role: "user" | "assistant";
  transcript?: string;
  aiResponse?: string;
  scores?: Record<string, number>;
  createdAt: Date;
}): SpeakingTurn {
  return {
    id: doc._id.toString(),
    sessionId: doc.sessionId.toString(),
    turnNumber: doc.turnNumber,
    role: doc.role,
    transcript: doc.transcript,
    aiResponse: doc.aiResponse,
    scores: doc.scores,
    createdAt: doc.createdAt,
  };
}

function buildGreeting(input: CreateSessionInput, level: string, goal?: string): string {
  if (input.type === "topic" && input.topicId) {
    const topic = getTopicById(input.topicId);
    if (topic) {
      return `Hi! Let's talk about ${topic.title}. ${topic.opener}`;
    }
  }
  if (input.type === "scenario" && input.scenarioId) {
    const scenario = getScenarioById(input.scenarioId);
    if (scenario) return scenario.opener;
  }
  if (input.type === "toeic") {
    return "Let's practice TOEIC-style speaking. Look at this question: What kind of movies do you like? Take your time and give me your answer.";
  }
  return getFreeTalkOpener(goal);
}

export async function createSession(
  userId: string,
  input: CreateSessionInput,
): Promise<SessionWithTurns> {
  await connectDatabase();
  await assertCanStartSession(userId);

  const level = await getUserLevel(userId);
  const goal = await getUserGoal(userId);
  const greeting = buildGreeting(input, level, goal);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + input.durationMinutes * 60 * 1000);

  const session = await SpeakingSessionModel.create({
    userId: new mongoose.Types.ObjectId(userId),
    type: input.type,
    topicId: input.topicId,
    scenarioId: input.scenarioId,
    durationMinutes: input.durationMinutes,
    status: "active",
    vietnameseHelp: input.vietnameseHelp ?? false,
    currentLevel: level,
    startedAt: now,
    expiresAt,
  });

  await SpeakingTurnModel.create({
    sessionId: session._id,
    turnNumber: 0,
    role: "assistant",
    aiResponse: greeting,
  });

  return {
    ...toSessionDTO(session),
    greeting,
    currentLevel: level,
    turns: [],
  };
}

export async function getSession(userId: string, sessionId: string): Promise<SessionWithTurns> {
  await connectDatabase();
  const session = await SpeakingSessionModel.findOne({
    _id: sessionId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  if (!session) {
    throw new SpeakingError("NOT_FOUND", "Session not found");
  }

  const turns = await SpeakingTurnModel.find({ sessionId: session._id }).sort({
    turnNumber: 1,
  });

  const greetingTurn = turns.find((t) => t.turnNumber === 0);
  return {
    ...toSessionDTO(session),
    greeting: greetingTurn?.aiResponse,
    currentLevel: session.currentLevel ?? undefined,
    turns: turns.filter((t) => t.turnNumber > 0).map(toTurnDTO),
  };
}

export async function resumeSession(userId: string, sessionId: string): Promise<SessionWithTurns> {
  await connectDatabase();
  const session = await SpeakingSessionModel.findOne({
    _id: sessionId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  if (!session) {
    throw new SpeakingError("NOT_FOUND", "Session not found");
  }

  const inactive =
    session.status === "abandoned" ||
    (session.status === "active" &&
      session.updatedAt &&
      Date.now() - session.updatedAt.getTime() > RESUME_WINDOW_MS);

  if (session.status === "completed") {
    throw new SpeakingError("SESSION_ENDED", "Session already completed");
  }

  if (
    session.status === "abandoned" &&
    session.updatedAt &&
    Date.now() - session.updatedAt.getTime() > RESUME_WINDOW_MS
  ) {
    throw new SpeakingError("SESSION_EXPIRED", "Resume window expired (30 min)");
  }

  if (inactive || session.status === "abandoned") {
    session.status = "active";
    session.expiresAt = new Date(Date.now() + session.durationMinutes * 60 * 1000);
    await session.save();
  }

  return getSession(userId, sessionId);
}

export async function listSessions(userId: string): Promise<SpeakingSessionDTO[]> {
  await connectDatabase();
  const sessions = await SpeakingSessionModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    status: "completed",
  })
    .sort({ endedAt: -1 })
    .limit(10);
  return sessions.map(toSessionDTO);
}

export async function processTurn(input: ProcessTurnInput): Promise<TurnResult> {
  await connectDatabase();
  const session = await SpeakingSessionModel.findOne({
    _id: input.sessionId,
    userId: new mongoose.Types.ObjectId(input.userId),
    status: "active",
  });
  if (!session) {
    throw new SpeakingError("NOT_FOUND", "Active session not found");
  }

  const speech = getSpeechProvider();
  let transcript = input.transcript ?? "";

  if (!transcript && input.audioBase64) {
    const audio = Buffer.from(input.audioBase64, "base64");
    const result = await speech.transcribe(audio);
    transcript = result.text;
  }

  if (!transcript.trim()) {
    throw new SpeakingError("NO_SPEECH", "No speech detected");
  }

  const level = session.currentLevel ?? "B1";
  const audio = input.audioBase64 ? Buffer.from(input.audioBase64, "base64") : Buffer.alloc(0);
  const pronunciation = await speech.assessPronunciation(audio, transcript);
  const scores = scoreTurn(transcript, pronunciation, level);

  const lastTurn = await SpeakingTurnModel.findOne({ sessionId: session._id })
    .sort({ turnNumber: -1 })
    .lean();
  const turnNumber = (lastTurn?.turnNumber ?? 0) + 1;

  const previousTurns = await SpeakingTurnModel.find({
    sessionId: session._id,
  }).sort({ turnNumber: 1 });

  const messages: ChatMessage[] = [
    { role: "system", content: loadSpeakingSystemPrompt() },
    {
      role: "system",
      content: getLevelPromptHint(level),
    },
  ];

  for (const t of previousTurns) {
    if (t.aiResponse) {
      messages.push({ role: "assistant", content: t.aiResponse });
    }
    if (t.transcript) {
      messages.push({ role: "user", content: t.transcript });
    }
  }
  messages.push({ role: "user", content: transcript });

  const completion = await chatCompletionOrStub(messages);
  const inlineCorrection = buildInlineCorrection(transcript);
  let aiResponse = weaveInlineCorrection(completion.content, inlineCorrection);
  aiResponse = applyExamGuardrail(aiResponse, session.type, true);

  let followUp: string | undefined;
  if (session.type === "topic" && session.topicId) {
    const topic = getTopicById(session.topicId);
    followUp = topic ? pickFollowUp(topic.followUps, turnNumber) : undefined;
  } else if (session.type === "scenario" && session.scenarioId) {
    const scenario = getScenarioById(session.scenarioId);
    followUp = scenario?.questionBank ? pickFollowUp(scenario.questionBank, turnNumber) : undefined;
  }
  if (followUp) {
    aiResponse = `${aiResponse}\n\n${followUp}`;
  }

  let vietnameseHelp: string | undefined;
  if (session.vietnameseHelp) {
    vietnameseHelp =
      "💡 Gợi ý: Hãy trả lời bằng câu đơn giản, ví dụ: 'I think...' hoặc 'In my opinion...'";
  }

  await SpeakingTurnModel.create({
    sessionId: session._id,
    turnNumber,
    role: "user",
    transcript,
    scores,
  });

  await SpeakingTurnModel.create({
    sessionId: session._id,
    turnNumber: turnNumber + 1,
    role: "assistant",
    aiResponse,
  });

  const allUserTurns = await SpeakingTurnModel.find({
    sessionId: session._id,
    role: "user",
  });
  const avgScore =
    allUserTurns.reduce((s, t) => s + (t.scores?.confidence ?? 70), 0) /
    Math.max(allUserTurns.length, 1);
  session.currentLevel = adaptLevel(level, avgScore);
  await session.save();

  return {
    turnNumber,
    transcript,
    aiResponse,
    scores,
    inlineCorrection: inlineCorrection ?? undefined,
    vietnameseHelp,
  };
}

export async function endSession(userId: string, sessionId: string): Promise<void> {
  await connectDatabase();
  const session = await SpeakingSessionModel.findOne({
    _id: sessionId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  if (!session) {
    throw new SpeakingError("NOT_FOUND", "Session not found");
  }

  session.status = "evaluating";
  await session.save();

  const userTurns = await SpeakingTurnModel.find({
    sessionId: session._id,
    role: "user",
  });
  const turnScores = userTurns.map((t) => t.scores ?? {});
  const dimensions = aggregateTurnScores(turnScores);
  const allImprovements = userTurns.flatMap((t) => detectGrammarImprovements(t.transcript ?? ""));
  const topFocusAreas = getTopFocusAreas(dimensions);
  const encouragement = generateEncouragement(dimensions.confidence);
  const explainWhy = generateExplainWhySummary(dimensions, allImprovements, topFocusAreas);
  const flaggedPhrases = allImprovements.slice(0, 5);

  await SpeakingSummaryModel.findOneAndUpdate(
    { sessionId: session._id },
    {
      sessionId: session._id,
      userId: new mongoose.Types.ObjectId(userId),
      overallConfidence: dimensions.confidence,
      dimensions,
      improvements: allImprovements.slice(0, 5),
      topFocusAreas,
      encouragement,
      explainWhy,
      flaggedPhrases,
    },
    { upsert: true, new: true },
  );

  session.status = "completed";
  session.endedAt = new Date();
  await session.save();
}

export async function getSummary(userId: string, sessionId: string): Promise<SpeakingSummaryDTO> {
  await connectDatabase();
  const summary = await SpeakingSummaryModel.findOne({
    sessionId,
    userId: new mongoose.Types.ObjectId(userId),
  });
  if (!summary) {
    throw new SpeakingError("NOT_FOUND", "Summary not found");
  }
  return {
    id: summary._id.toString(),
    sessionId: summary.sessionId.toString(),
    userId: summary.userId.toString(),
    overallConfidence: summary.overallConfidence,
    dimensions: summary.dimensions as SpeakingSummaryDTO["dimensions"],
    improvements: summary.improvements ?? [],
    topFocusAreas: summary.topFocusAreas ?? [],
    encouragement: summary.encouragement,
    explainWhy: summary.explainWhy,
    flaggedPhrases: summary.flaggedPhrases ?? [],
    createdAt: summary.createdAt,
  };
}

export async function getProgress(userId: string): Promise<SpeakingProgress> {
  await connectDatabase();
  const userOid = new mongoose.Types.ObjectId(userId);
  const [sessionCount, sessions, weekly] = await Promise.all([
    SpeakingSessionModel.countDocuments({ userId: userOid, status: "completed" }),
    SpeakingSessionModel.find({ userId: userOid, status: "completed" }),
    getWeeklyLimitStatus(userId),
  ]);

  const totalPracticeMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes ?? 0), 0);

  const summaries = await SpeakingSummaryModel.find({ userId: userOid });
  const averageConfidence =
    summaries.length > 0
      ? summaries.reduce((s, sm) => s + sm.overallConfidence, 0) / summaries.length
      : undefined;

  return {
    sessionCount,
    totalPracticeMinutes,
    averageConfidence: averageConfidence ? Math.round(averageConfidence * 10) / 10 : undefined,
    weeklyUsed: weekly.used,
    weeklyLimit: weekly.isPaid ? undefined : weekly.limit,
  };
}

export async function getScoreTrends(userId: string, days: 7 | 30 | 90): Promise<SpeakingTrends> {
  await connectDatabase();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const summaries = await SpeakingSummaryModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    createdAt: { $gte: since },
  }).sort({ createdAt: 1 });

  return {
    days,
    points: summaries.map((s) => ({
      date: s.createdAt.toISOString().slice(0, 10),
      confidence: s.overallConfidence,
      pronunciation: s.dimensions.pronunciation,
      fluency: s.dimensions.fluency,
      grammar: s.dimensions.grammar,
      vocabulary: s.dimensions.vocabulary,
    })),
  };
}

export { listTopics, listScenarios };
