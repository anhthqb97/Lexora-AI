"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Question = { id: string; question: string; followUp: string };

export default function InterviewSessionPage() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`interview-${id}`);
    if (stored) setQuestions(JSON.parse(stored));
  }, [id]);

  async function submit() {
    const q = questions[index];
    if (!q) return;
    const res = await fetch("/api/v1/interview/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "answer",
        sessionId: id,
        questionId: q.id,
        answer,
      }),
    });
    const data = await res.json();
    setFeedback(data.data?.feedback ?? null);
    if (data.data?.completed) {
      setDone(true);
    } else if (index + 1 < questions.length) {
      setIndex(index + 1);
      setAnswer("");
      setFeedback(null);
    }
  }

  if (!questions.length) {
    return <p className="p-6">Loading session...</p>;
  }

  const q = questions[index];

  return (
    <div className="mx-auto max-w-lg space-y-4 p-2">
      <h1 className="text-xl font-bold">
        Câu {index + 1}/{questions.length}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{q?.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!done && (
            <>
              <textarea
                className="min-h-[120px] w-full rounded border p-2 text-sm"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer (90 seconds recommended)..."
              />
              <Button onClick={submit} disabled={!answer.trim()}>
                Nộp câu trả lời
              </Button>
            </>
          )}
          {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
          {done && <p className="font-medium text-lexora-teal">Interview complete!</p>}
        </CardContent>
      </Card>
    </div>
  );
}
