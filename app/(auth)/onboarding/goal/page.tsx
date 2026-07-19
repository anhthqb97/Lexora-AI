"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserGoal } from "@/lib/modules/user/types";

const GOALS: { id: UserGoal; label: string; description: string }[] = [
  { id: "toeic", label: "TOEIC", description: "Luyện thi TOEIC, nâng điểm nhanh" },
  { id: "speaking", label: "Speaking", description: "Luyện nói tự tin với AI coach" },
  { id: "business", label: "Business", description: "Tiếng Anh công việc, họp, email" },
  { id: "general", label: "Tổng quát", description: "Cải thiện tiếng Anh toàn diện" },
];

export default function OnboardingGoalPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<UserGoal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!selected) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/users/me/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal: selected }),
    });

    if (!res.ok) {
      setError("Không thể lưu mục tiêu. Vui lòng thử lại.");
      setLoading(false);
      return;
    }

    router.push("/onboarding/level");
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-lexora-blue">Mục tiêu học tập</h1>
        <p className="mt-2 text-gray-600">Bạn muốn tập trung vào điều gì?</p>
      </div>

      <div className="grid gap-3">
        {GOALS.map((goal) => (
          <Card
            key={goal.id}
            className={`cursor-pointer transition-colors ${
              selected === goal.id ? "border-lexora-teal ring-2 ring-lexora-teal" : ""
            }`}
            onClick={() => setSelected(goal.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{goal.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" disabled={!selected || loading} onClick={handleContinue}>
        {loading ? "Đang lưu..." : "Tiếp tục"}
      </Button>
    </div>
  );
}
