import { connectDatabase } from "@/lib/db/mongoose";
import { UserProfile } from "@/lib/modules/user/models";
import { getProgress } from "@/lib/modules/speaking";

export type HrEmployeeRow = {
  userId: string;
  email?: string;
  level?: string;
  speakingSessions: number;
  practiceMinutes: number;
};

export async function buildHrReport(_companyId: string): Promise<HrEmployeeRow[]> {
  await connectDatabase();
  const profiles = await UserProfile.find().limit(200);
  const rows: HrEmployeeRow[] = [];
  for (const p of profiles) {
    const progress = await getProgress(p.userId.toString()).catch(() => null);
    rows.push({
      userId: p.userId.toString(),
      level: p.level,
      speakingSessions: progress?.sessionCount ?? 0,
      practiceMinutes: progress?.totalPracticeMinutes ?? 0,
    });
  }
  return rows;
}

export function hrReportToCsv(rows: HrEmployeeRow[]): string {
  const header = "userId,level,speakingSessions,practiceMinutes";
  const lines = rows.map(
    (r) => `${r.userId},${r.level ?? ""},${r.speakingSessions},${r.practiceMinutes}`,
  );
  return [header, ...lines].join("\n");
}
