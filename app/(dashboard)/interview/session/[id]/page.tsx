"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Question = { id: string; question: string; questionVi: string; timeLimitSeconds: number };

type PageProps = { params: Promise<{ id: string }> };

export default function InterviewSessionPage({ params }: PageProps) {
  const [sessionId, setSessionId] = useState("");
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      setSessionId(id);
      fetch(`/api/v1/interview/sessions/${id}`)
        .then((r) => r.json())
        .then((res) => {
          if (res.data?.question) setQuestion(res.data.question);
        });
    });
  }, [params]);

  async function handleSubmit() {
    if (!sessionId || !answer.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/v1/interview/sessions/${sessionId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: answer }),
    });
    const data = await res.json();
    setLoading(false);
    setFeedback(data.data?.feedback ?? null);
    if (data.data?.nextQuestion) {
      setQuestion(data.data.nextQuestion);
      setAnswer("");
      setFeedback(null);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hoàn thành phỏng vấn!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Bạn đã trả lời tất cả câu hỏi. Xem lại phản hồi ở trên.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {question && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{question.questionVi}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm font-medium">{question.question}</p>
            <p className="text-xs text-gray-500">Thời gian: {question.timeLimitSeconds}s</p>
          </CardContent>
        </Card>
      )}
      <textarea
        className="min-h-[120px] w-full rounded-md border p-3 text-sm"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer in English..."
      />
      {feedback && <p className="rounded border bg-gray-50 p-3 text-sm">{feedback}</p>}
      <Button onClick={handleSubmit} disabled={loading || !answer.trim()}>
        {loading ? "Đang chấm..." : "Nộp câu trả lời"}
      </Button>
    </div>
  );
}
