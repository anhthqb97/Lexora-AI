import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthUserId } from "@/lib/api/auth";
import { listBusinessProgress, listBusinessScenarios } from "@/lib/modules/business";

export default async function BusinessPage() {
  const userId = await getAuthUserId();
  const scenarios = listBusinessScenarios();
  const progress = userId ? await listBusinessProgress(userId).catch(() => []) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Lexora Business</h1>
        <p className="text-gray-600">Luyện tiếng Anh công việc — họp, email, thuyết trình</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {scenarios.map((s) => (
          <Card key={s.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{s.titleVi}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">{s.description}</p>
              <Link
                href={`/business/${s.id}`}
                className="inline-flex h-9 items-center justify-center rounded-md bg-lexora-orange px-3 text-sm font-medium text-white hover:opacity-90"
              >
                Bắt đầu
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {progress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lịch sử gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {progress.map((p, i) => (
              <p key={i}>
                {p.scenarioTitle} · Điểm formal tone: {p.formalToneScore}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
