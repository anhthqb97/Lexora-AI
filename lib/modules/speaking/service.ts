import { connectDatabase } from "@/lib/db/mongoose";
import type {
  CreateSessionInput,
  ProcessTurnInput,
  SpeakingProgress,
  SpeakingSessionDTO,
  SpeakingSummaryDTO,
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

/** Create a new speaking session — implemented in P1-T031 */
export async function createSession(
  _userId: string,
  _input: CreateSessionInput,
): Promise<SpeakingSessionDTO> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "createSession — P1-T031");
}

/** Get session by id — implemented in P1-T031 */
export async function getSession(_userId: string, _sessionId: string): Promise<SpeakingSessionDTO> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "getSession — P1-T031");
}

/** List user sessions — implemented in P1-T053 */
export async function listSessions(_userId: string): Promise<SpeakingSessionDTO[]> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "listSessions — P1-T053");
}

/** Process learner audio turn — implemented in P1-T036 */
export async function processTurn(_input: ProcessTurnInput): Promise<TurnResult> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "processTurn — P1-T036");
}

/** End session and trigger evaluation — implemented in P1-T049 */
export async function endSession(_userId: string, _sessionId: string): Promise<void> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "endSession — P1-T049");
}

/** Get post-session summary — implemented in P1-T049 */
export async function getSummary(_userId: string, _sessionId: string): Promise<SpeakingSummaryDTO> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "getSummary — P1-T049");
}

/** Aggregate progress stats — implemented in P1-T054 */
export async function getProgress(_userId: string): Promise<SpeakingProgress> {
  await connectDatabase();
  throw new SpeakingError("NOT_IMPLEMENTED", "getProgress — P1-T054");
}
