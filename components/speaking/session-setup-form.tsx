"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VoiceConsentModal } from "./voice-consent-modal";
import { Paywall } from "@/components/billing/paywall";

type Topic = { id: string; title: string; titleVi: string; level: string };
type Scenario = { id: string; title: string; titleVi: string; level: string };

type SessionSetupFormProps = {
  topics: Topic[];
  scenarios: Scenario[];
  hasVoiceConsent: boolean;
};

const SESSION_TYPES = [
  { id: "free_talk", label: "Free Talk" },
  { id: "topic", label: "Chủ đề" },
  { id: "scenario", label: "Tình huống" },
  { id: "toeic", label: "TOEIC" },
] as const;

const DURATIONS = [5, 10, 15, 20] as const;

export function SessionSetupForm({
  topics,
  scenarios,
  hasVoiceConsent: initialConsent,
}: SessionSetupFormProps) {
  const router = useRouter();
  const [type, setType] = useState<string>("free_talk");
  const [topicId, setTopicId] = useState<string>("");
  const [scenarioId, setScenarioId] = useState<string>("");
  const [duration, setDuration] = useState<number>(5);
  const [vietnameseHelp, setVietnameseHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConsent, setShowConsent] = useState(!initialConsent);
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasConsent, setHasConsent] = useState(initialConsent);
  const [error, setError] = useState<string | null>(null);

  async function startSession() {
    if (!hasConsent) {
      setShowConsent(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/speaking/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          topicId: type === "topic" ? topicId : undefined,
          scenarioId: type === "scenario" ? scenarioId : undefined,
          durationMinutes: duration,
          vietnameseHelp,
        }),
      });
      const data = await res.json();
      if (res.status === 402 || data.error?.code === "LIMIT_REACHED") {
        setShowPaywall(true);
        return;
      }
      if (!res.ok) throw new Error(data.error?.message ?? "Failed to create session");
      router.push(`/speaking/session/${data.data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Thiết lập buổi luyện</h1>
        <p className="mt-1 text-gray-600">Chọn loại, chủ đề và thời lượng</p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Loại buổi luyện</p>
        <div className="grid grid-cols-2 gap-2">
          {SESSION_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                type === t.id
                  ? "border-lexora-teal bg-lexora-teal/10 text-lexora-teal"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {type === "topic" && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Chọn chủ đề</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {topics.map((t) => (
              <Card
                key={t.id}
                className={`cursor-pointer ${topicId === t.id ? "ring-2 ring-lexora-teal" : ""}`}
                onClick={() => setTopicId(t.id)}
              >
                <CardContent className="p-3">
                  <p className="font-medium">{t.titleVi}</p>
                  <p className="text-xs text-gray-500">
                    {t.title} · {t.level}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {type === "scenario" && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Chọn tình huống</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {scenarios.map((s) => (
              <Card
                key={s.id}
                className={`cursor-pointer ${scenarioId === s.id ? "ring-2 ring-lexora-teal" : ""}`}
                onClick={() => setScenarioId(s.id)}
              >
                <CardContent className="p-3">
                  <p className="font-medium">{s.titleVi}</p>
                  <p className="text-xs text-gray-500">
                    {s.title} · {s.level}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Thời lượng</p>
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                duration === d ? "bg-lexora-teal text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {d} phút
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={vietnameseHelp}
          onChange={(e) => setVietnameseHelp(e.target.checked)}
        />
        🇻🇳 Bật trợ giúp tiếng Việt
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        className="w-full bg-lexora-orange hover:opacity-90"
        disabled={loading || (type === "topic" && !topicId) || (type === "scenario" && !scenarioId)}
        onClick={startSession}
      >
        {loading ? "Đang tạo..." : "Bắt đầu"}
      </Button>

      {showConsent && (
        <VoiceConsentModal
          onGranted={() => {
            setHasConsent(true);
            setShowConsent(false);
          }}
          onClose={() => setShowConsent(false)}
        />
      )}

      {showPaywall && <Paywall feature="Speaking" onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
