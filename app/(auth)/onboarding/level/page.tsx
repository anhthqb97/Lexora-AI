"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserLevel } from "@/lib/modules/user/types";

const LEVELS: { id: UserLevel; label: string; description: string }[] = [
  { id: "A1", label: "A1 — Beginner", description: "Mới bắt đầu, biết vài từ cơ bản" },
  { id: "A2", label: "A2 — Elementary", description: "Giao tiếp đơn giản hàng ngày" },
  { id: "B1", label: "B1 — Intermediate", description: "Trò chuyện các chủ đề quen thuộc" },
  { id: "B2", label: "B2 — Upper Intermediate", description: "Thảo luận phức tạp, tự tin hơn" },
  { id: "C1", label: "C1 — Advanced", description: "Sử dụng tiếng Anh linh hoạt, tự nhiên" },
];

export default function OnboardingLevelPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<UserLevel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFinish() {
    if (!selected) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/users/me/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: selected }),
    });

    if (!res.ok) {
      setError("Không thể lưu trình độ. Vui lòng thử lại.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Trình độ hiện tại</h1>
        <p className="mt-2 text-gray-600">Chọn mức CEFR phù hợp với bạn</p>
      </div>

      <div className="grid gap-3">
        {LEVELS.map((level) => (
          <Card
            key={level.id}
            className={`cursor-pointer transition-colors ${
              selected === level.id ? "border-lexora-teal ring-2 ring-lexora-teal" : ""
            }`}
            onClick={() => setSelected(level.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{level.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{level.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" disabled={!selected || loading} onClick={handleFinish}>
        {loading ? "Đang lưu..." : "Bắt đầu học"}
      </Button>
    </div>
  );
}
