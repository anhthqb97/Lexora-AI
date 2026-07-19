"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Dimensions = {
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  confidence: number;
};

type Improvement = {
  original: string;
  corrected: string;
  reason: string;
};

type SessionSummaryViewProps = {
  sessionId: string;
  overallConfidence: number;
  dimensions: Dimensions;
  improvements: Improvement[];
  topFocusAreas: string[];
  encouragement: string;
  explainWhy?: string;
  hasFlaggedPhrases: boolean;
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = Math.min(100, score);
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{(score / 10).toFixed(1)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-lexora-teal transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SessionSummaryView({
  sessionId,
  overallConfidence,
  dimensions,
  improvements,
  topFocusAreas,
  encouragement,
  explainWhy,
  hasFlaggedPhrases,
}: SessionSummaryViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Buổi luyện hoàn thành! 🎉</h1>
        <p className="mt-2 text-gray-600">{encouragement}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Điểm số</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScoreBar label="Confidence" score={overallConfidence} />
          <ScoreBar label="Pronunciation" score={dimensions.pronunciation} />
          <ScoreBar label="Fluency" score={dimensions.fluency} />
          <ScoreBar label="Grammar" score={dimensions.grammar} />
          <ScoreBar label="Vocabulary" score={dimensions.vocabulary} />
        </CardContent>
      </Card>

      {explainWhy && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giải thích</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{explainWhy}</p>
          </CardContent>
        </Card>
      )}

      {topFocusAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cần tập trung</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-decimal text-sm text-gray-700">
              {topFocusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cần cải thiện</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {improvements.slice(0, 3).map((item, i) => (
              <div key={i} className="text-sm">
                <p>
                  {i + 1}. &quot;{item.original}&quot; → &quot;{item.corrected}&quot;
                </p>
                <p className="text-gray-500">({item.reason})</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        {hasFlaggedPhrases && (
          <Link href={`/speaking/session/${sessionId}/retry`} className="flex-1">
            <Button className="w-full bg-lexora-teal hover:opacity-90">Luyện lại cụm từ</Button>
          </Link>
        )}
        <Link href="/speaking/new" className="flex-1">
          <Button variant="outline" className="w-full">
            Buổi mới
          </Button>
        </Link>
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}
