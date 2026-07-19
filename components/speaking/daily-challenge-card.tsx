"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type ChallengeStatus = {
  dayKey: string;
  prompt: string;
  completedToday: boolean;
  streak: number;
};

export function DailyChallengeCard() {
  const [challenge, setChallenge] = useState<ChallengeStatus | null>(null);

  useEffect(() => {
    fetch("/api/v1/speaking/challenge")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setChallenge(res.data);
      })
      .catch(() => {});
  }, []);

  if (!challenge) return null;

  return (
    <Card className="border-lexora-teal/30 bg-gradient-to-br from-white to-teal-50/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">🔥 Thử thách nói hàng ngày</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">{challenge.prompt}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span>Streak: {challenge.streak} ngày</span>
          {challenge.completedToday && (
            <span className="font-medium text-lexora-teal">Hoàn thành hôm nay ✓</span>
          )}
        </div>
        {!challenge.completedToday && (
          <Button asChild size="sm">
            <Link href="/speaking/new?challenge=1">Bắt đầu thử thách</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
