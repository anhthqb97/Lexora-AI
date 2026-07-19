"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Waveform } from "./waveform";

type LiveSessionProps = {
  sessionId: string;
  durationMinutes: number;
  greeting: string;
  vietnameseHelp: boolean;
  canResume?: boolean;
};

type SessionState = "idle" | "listening" | "processing" | "ai_speaking";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function LiveSession({
  sessionId,
  durationMinutes,
  greeting,
  vietnameseHelp: initialVnHelp,
  canResume,
}: LiveSessionProps) {
  const router = useRouter();
  const totalSeconds = durationMinutes * 60;
  const [elapsed, setElapsed] = useState(0);
  const [state, setState] = useState<SessionState>("ai_speaking");
  const [aiMessage, setAiMessage] = useState(greeting);
  const [transcript, setTranscript] = useState("");
  const [vietnameseHelp, setVietnameseHelp] = useState(initialVnHelp);
  const [vnHint, setVnHint] = useState<string | null>(null);
  const [inlineCorrection, setInlineCorrection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (canResume) {
      fetch(`/api/v1/speaking/sessions/${sessionId}/resume`, { method: "POST" }).catch(() => {});
    }
  }, [canResume, sessionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((e) => {
        if (e >= totalSeconds) {
          clearInterval(timer);
          endSession();
          return e;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds]);

  const endSession = useCallback(async () => {
    try {
      await fetch(`/api/v1/speaking/sessions/${sessionId}/end`, { method: "POST" });
      router.push(`/speaking/session/${sessionId}/summary`);
    } catch {
      setError("Không thể kết thúc buổi luyện");
    }
  }, [sessionId, router]);

  async function processTurn(text: string, audioBase64?: string) {
    setState("processing");
    setError(null);
    try {
      const res = await fetch(`/api/v1/speaking/sessions/${sessionId}/turns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, audioBase64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message ?? "Turn failed");
      setTranscript(data.data.transcript);
      setAiMessage(data.data.aiResponse);
      if (data.data.inlineCorrection) {
        setInlineCorrection(
          `"${data.data.inlineCorrection.original}" → "${data.data.inlineCorrection.corrected}"`,
        );
      }
      if (data.data.vietnameseHelp) setVnHint(data.data.vietnameseHelp);
      setState("ai_speaking");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi xử lý");
      setState("idle");
    }
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const buffer = await blob.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]!);
        }
        const base64 = btoa(binary);
        await processTurn("I like reading books and learning English.", base64);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setState("listening");
    } catch {
      setError("Cần quyền micro để luyện nói. Hướng dẫn cài đặt?");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  async function sendMockTurn() {
    await processTurn("I like reading books and learning English every day.");
  }

  const remaining = totalSeconds - elapsed;
  const warning = remaining <= 60 && remaining > 0;

  return (
    <div className="flex min-h-[70vh] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-sm font-medium ${warning ? "text-lexora-orange" : "text-gray-600"}`}>
          ● {formatTime(elapsed)} / {formatTime(totalSeconds)}
        </span>
        <button
          type="button"
          onClick={endSession}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Kết thúc
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center">
        <p className="text-lg font-semibold text-lexora-blue">🤖 Lexora</p>
        <p className="max-w-md text-gray-800">{aiMessage}</p>
      </div>

      <div className="space-y-3 rounded-lg border bg-white p-4">
        <Waveform active={state === "listening"} />
        <p className="min-h-[1.5rem] text-center text-sm text-gray-600">
          {state === "listening" && "Đang nghe..."}
          {state === "processing" && "Đang xử lý..."}
          {state === "ai_speaking" && transcript && `"${transcript}"`}
          {state === "idle" && "Nhấn giữ để nói"}
        </p>
        {inlineCorrection && (
          <p className="text-center text-xs text-lexora-teal">💡 {inlineCorrection}</p>
        )}
        {vnHint && vietnameseHelp && <p className="text-center text-xs text-gray-500">{vnHint}</p>}
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          className="flex-shrink-0"
          onClick={() => setVietnameseHelp((v) => !v)}
        >
          🇻🇳 Trợ giúp
        </Button>
        <Button
          className="flex-1 bg-lexora-teal hover:opacity-90"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={state === "processing"}
        >
          {isRecording ? "🎤 Đang ghi..." : "🎤 Giữ để nói"}
        </Button>
        <Button variant="outline" onClick={sendMockTurn} disabled={state === "processing"}>
          Mock
        </Button>
      </div>
    </div>
  );
}
