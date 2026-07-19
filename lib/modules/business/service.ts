import { connectDatabase } from "@/lib/db/mongoose";
import { createSession, listSessions } from "@/lib/modules/speaking";
import { getBusinessScenario, listBusinessScenarios } from "./content";
import type { BusinessSessionSummary } from "./types";

export class BusinessError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function startBusinessScenario(userId: string, scenarioId: string) {
  const scenario = getBusinessScenario(scenarioId);
  if (!scenario) throw new BusinessError("NOT_FOUND", "Scenario not found");

  return createSession(userId, {
    type: "scenario",
    scenarioId: scenario.id,
  });
}

export async function listBusinessProgress(userId: string): Promise<BusinessSessionSummary[]> {
  await connectDatabase();
  const sessions = await listSessions(userId);
  return sessions
    .filter((s) => s.type === "scenario" && s.status === "completed")
    .slice(0, 10)
    .map((s) => {
      const scenario = getBusinessScenario(s.scenarioId ?? "");
      return {
        scenarioId: s.scenarioId ?? "",
        scenarioTitle: scenario?.titleVi ?? s.scenarioId ?? "",
        formalToneScore: 75,
        completedAt: s.endedAt ?? s.createdAt,
      };
    });
}

export { listBusinessScenarios, getBusinessScenario };
