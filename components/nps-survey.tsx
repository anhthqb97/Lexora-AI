"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NpsSurvey() {
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (score === null) return;
    await fetch("/api/v1/nps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score }),
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-gray-600">Cảm ơn bạn đã phản hồi!</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Bạn có giới thiệu Lexora cho bạn bè không?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setScore(i)}
              className={`h-9 w-9 rounded-full border text-sm ${
                score === i ? "border-lexora-teal bg-teal-50" : ""
              }`}
            >
              {i}
            </button>
          ))}
        </div>
        <Button onClick={handleSubmit} disabled={score === null} size="sm">
          Gửi
        </Button>
      </CardContent>
    </Card>
  );
}
