"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Question = {
  id: string;
  section: string;
  part: number;
  questionText: string;
  stimulus?: string;
  choices: { id: string; text: string }[];
};

type ToeicExamProps = {
  attemptId: string;
  questions: Question[];
  title: string;
  finishUrl: string;
};

export function ToeicExamClient({ attemptId, questions, title, finishUrl }: ToeicExamProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = questions[index];
  const isLast = index >= questions.length - 1;

  async function submitChoice(choiceId: string) {
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/v1/toeic/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId, questionId: current.id, choiceId }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error?.message ?? "Không thể lưu câu trả lời");
      return;
    }
    if (isLast) {
      await finishExam();
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  async function finishExam() {
    setSubmitting(true);
    const res = await fetch(finishUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("Không thể nộp bài");
      return;
    }
    const data = await res.json();
    router.push(`/toeic/report/${data.data.report.attemptId}`);
  }

  if (!current) {
    return <p className="text-gray-600">Không có câu hỏi.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">{title}</h1>
        <p className="text-sm text-gray-600">
          Câu {index + 1}/{questions.length} · {current.section === "listening" ? "Nghe" : "Đọc"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{current.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {current.stimulus && (
            <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">{current.stimulus}</p>
          )}
          {current.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              disabled={submitting}
              onClick={() => {
                setSelected(choice.id);
                void submitChoice(choice.id);
              }}
              className={`w-full rounded-lg border p-3 text-left text-sm transition ${
                selected === choice.id
                  ? "border-lexora-orange bg-orange-50"
                  : "border-gray-200 hover:border-lexora-orange"
              }`}
            >
              <span className="font-semibold">{choice.id}.</span> {choice.text}
            </button>
          ))}
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Link href="/toeic" className="text-sm text-lexora-blue hover:underline">
        ← Quay lại TOEIC
      </Link>
    </div>
  );
}
