"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Phrase = {
  original: string;
  corrected: string;
  reason: string;
};

type RetryPhrasesProps = {
  sessionId: string;
  phrases: Phrase[];
};

export function RetryPhrases({ sessionId, phrases }: RetryPhrasesProps) {
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  const phrase = phrases[selected];
  if (!phrase) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Không có cụm từ cần luyện lại.</p>
        <Link href={`/speaking/session/${sessionId}/summary`}>
          <Button className="mt-4">Quay lại tóm tắt</Button>
        </Link>
      </div>
    );
  }

  async function handleRetry() {
    setRecording(true);
    setFeedback(null);
    await new Promise((r) => setTimeout(r, 1500));
    setRecording(false);
    setFeedback(`Tốt lắm! Hãy thử nói: "${phrase.corrected}" — ${phrase.reason}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Luyện lại cụm từ</h1>
        <p className="mt-1 text-gray-600">
          Cụm {selected + 1}/{Math.min(phrases.length, 5)}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <p className="text-lg">&quot;{phrase.original}&quot;</p>
          <p className="text-lexora-teal">→ &quot;{phrase.corrected}&quot;</p>
          <p className="text-sm text-gray-500">{phrase.reason}</p>
          <Button
            className="w-full bg-lexora-orange hover:opacity-90"
            onClick={handleRetry}
            disabled={recording}
          >
            {recording ? "Đang nghe..." : "🎤 Ghi âm thử lại"}
          </Button>
          {feedback && <p className="text-sm text-lexora-teal">{feedback}</p>}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={selected === 0}
          onClick={() => {
            setSelected((s) => s - 1);
            setFeedback(null);
          }}
        >
          Trước
        </Button>
        <Button
          variant="outline"
          disabled={selected >= Math.min(phrases.length, 5) - 1}
          onClick={() => {
            setSelected((s) => s + 1);
            setFeedback(null);
          }}
        >
          Tiếp
        </Button>
        <Link href={`/speaking/session/${sessionId}/summary`} className="ml-auto">
          <Button variant="outline">Xong</Button>
        </Link>
      </div>
    </div>
  );
}
