import { connectDatabase } from "@/lib/db/mongoose";
import { IeltsDiagnosticModel, toIeltsDiagnosticDTO } from "./models";
import type { IeltsDiagnosticResult, StartIeltsDiagnosticInput } from "./types";

export class IeltsError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

function stubSkillScores() {
  return {
    listening: 5.5,
    reading: 6.0,
    writing: 5.0,
    speaking: 5.5,
  };
}

export async function startDiagnostic(
  userId: string,
  _input?: StartIeltsDiagnosticInput,
): Promise<IeltsDiagnosticResult> {
  await connectDatabase();
  const skills = stubSkillScores();
  const overallBand =
    Math.round(((skills.listening + skills.reading + skills.writing + skills.speaking) / 4) * 2) /
    2;

  const doc = await IeltsDiagnosticModel.create({
    userId,
    overallBand,
    skills,
    weakAreas: ["writing-task-response", "speaking-fluency"],
  });

  return toIeltsDiagnosticDTO(doc);
}

export async function getLatestDiagnostic(userId: string): Promise<IeltsDiagnosticResult | null> {
  await connectDatabase();
  const doc = await IeltsDiagnosticModel.findOne({ userId }).sort({ completedAt: -1 });
  return doc ? toIeltsDiagnosticDTO(doc) : null;
}
