"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RecentSession = {
  id: string;
  type: string;
  score?: number;
  date: string;
};

type SpeakingHomeProps = {
  weeklyUsed: number;
  weeklyLimit: number;
  isPaid: boolean;
  totalMinutes: number;
  recentSessions: RecentSession[];
};

const TYPE_LABELS: Record<string, string> = {
  free_talk: "Free Talk",
  topic: "Chủ đề",
  scenario: "Tình huống",
  toeic: "TOEIC",
};

export function SpeakingHome({
  weeklyUsed,
  weeklyLimit,
  isPaid,
  totalMinutes,
  recentSessions,
}: SpeakingHomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue sm:text-3xl">Lexora Speaking</h1>
        <p className="mt-1 text-gray-600">Luyện nói với AI coach</p>
      </div>

      <Card>
        <CardContent className="space-y-2 pt-6">
          <p className="text-sm text-gray-700">
            Buổi tuần này:{" "}
            <span className="font-semibold">
              {isPaid ? `${weeklyUsed} (Pro)` : `${weeklyUsed}/${weeklyLimit} (Free)`}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Tổng thời gian: <span className="font-semibold">{totalMinutes} phút</span>
          </p>
        </CardContent>
      </Card>

      <Link href="/speaking/new">
        <Button className="w-full bg-lexora-orange py-6 text-base hover:opacity-90">
          🎤 Bắt đầu luyện nói
        </Button>
      </Link>

      <Link href="/speaking/progress" className="block text-center text-sm text-lexora-teal">
        Xem tiến độ luyện nói →
      </Link>

      {recentSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buổi gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentSessions.map((s) => (
                <li key={s.id} className="flex justify-between text-sm">
                  <Link
                    href={`/speaking/session/${s.id}/summary`}
                    className="text-gray-700 hover:text-lexora-teal"
                  >
                    {TYPE_LABELS[s.type] ?? s.type}
                    {s.score != null && ` — ${s.score.toFixed(1)}/10`}
                  </Link>
                  <span className="text-gray-500">{s.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
