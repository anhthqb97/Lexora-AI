"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Form = { id: string; label: string };

type Props = { forms: Form[] };

export function MockFormSelector({ forms }: Props) {
  const router = useRouter();
  const [formId, setFormId] = useState(forms[0]?.id ?? "MOCK-A");
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    const res = await fetch("/api/v1/toeic/mock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.data?.attempt?.id) {
      router.push(`/toeic/mock/${data.data.attempt.id}`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chọn đề thi thử</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {forms.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormId(f.id)}
              className={`rounded-lg border px-4 py-2 text-sm ${
                formId === f.id ? "border-lexora-orange bg-orange-50" : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button onClick={handleStart} disabled={loading} className="bg-lexora-orange">
          {loading ? "Đang tạo đề..." : "Bắt đầu thi thử"}
        </Button>
      </CardContent>
    </Card>
  );
}
