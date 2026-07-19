"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function start(industry: string) {
    setLoading(industry);
    const res = await fetch("/api/v1/interview/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry }),
    });
    const data = await res.json();
    setLoading(null);
    if (res.ok) {
      sessionStorage.setItem(`interview-${data.data.id}`, JSON.stringify(data.data.questions));
      router.push(`/interview/${data.data.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-lexora-blue">Interview Prep</h1>
      <p className="text-gray-600">Luyện phỏng vấn có thời gian với AI phản hồi</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { id: "it", label: "IT & Tech" },
          { id: "hospitality", label: "Hospitality" },
        ].map((ind) => (
          <Card key={ind.id}>
            <CardHeader>
              <CardTitle>{ind.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => start(ind.id)} disabled={loading === ind.id}>
                {loading === ind.id ? "..." : "Bắt đầu mock interview"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
