"use client";

import { useEffect, useState } from "react";
import { ScoreTrendChart } from "@/components/speaking/score-trend-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TrendPoint = {
  date: string;
  confidence: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
};

export default function SpeakingProgressPage() {
  const [days, setDays] = useState<7 | 30 | 90>(7);
  const [points, setPoints] = useState<TrendPoint[]>([]);
  const [progress, setProgress] = useState<{
    sessionCount: number;
    totalPracticeMinutes: number;
    averageConfidence?: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/v1/speaking/progress")
      .then((r) => r.json())
      .then((d) => setProgress(d.data));
  }, []);

  useEffect(() => {
    fetch(`/api/v1/speaking/trends?days=${days}`)
      .then((r) => r.json())
      .then((d) => setPoints(d.data?.points ?? []));
  }, [days]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Tiến độ Speaking</h1>
        <p className="mt-1 text-gray-600">Theo dõi điểm số và thời gian luyện tập</p>
      </div>

      {progress && (
        <Card>
          <CardContent className="grid grid-cols-3 gap-4 pt-6 text-center text-sm">
            <div>
              <p className="text-2xl font-bold text-lexora-teal">{progress.sessionCount}</p>
              <p className="text-gray-500">Buổi luyện</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-lexora-teal">{progress.totalPracticeMinutes}</p>
              <p className="text-gray-500">Phút</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-lexora-teal">
                {progress.averageConfidence ? (progress.averageConfidence / 10).toFixed(1) : "—"}
              </p>
              <p className="text-gray-500">Điểm TB</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Xu hướng điểm số</CardTitle>
          <div className="flex gap-2">
            {([7, 30, 90] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  days === d ? "bg-lexora-teal text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {d} ngày
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ScoreTrendChart points={points} />
        </CardContent>
      </Card>
    </div>
  );
}
