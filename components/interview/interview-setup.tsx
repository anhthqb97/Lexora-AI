"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  industries: { id: string; label: string }[];
};

export function InterviewSetup({ industries }: Props) {
  const router = useRouter();
  const [industry, setIndustry] = useState(industries[0]?.id ?? "it");
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    const res = await fetch("/api/v1/interview/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.session?.id) router.push(`/interview/session/${data.session.id}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn ngành phỏng vấn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          className="w-full rounded-md border px-3 py-2"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          {industries.map((i) => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
        <Button onClick={handleStart} disabled={loading}>
          {loading ? "Đang tạo..." : "Bắt đầu phỏng vấn (20 phút)"}
        </Button>
      </CardContent>
    </Card>
  );
}
