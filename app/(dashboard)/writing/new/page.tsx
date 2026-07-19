"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Prompt = { id: string; title: string; titleVi: string; level: string; minWords: number };

export default function NewWritingPage() {
  const router = useRouter();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/writing/submissions")
      .then((r) => r.json())
      .then((res) => {
        if (res.data?.prompts) {
          setPrompts(res.data.prompts);
          setSelected(res.data.prompts[0]?.id ?? "");
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/v1/writing/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ promptId: selected, content }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error?.message ?? "Submit failed");
      return;
    }
    router.push(`/writing/${data.data.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-lexora-blue">Viết bài mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Chọn đề bài</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {prompts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titleVi} ({p.level})
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
        <textarea
          className="min-h-[240px] w-full rounded-md border p-3 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your essay in English..."
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Đang chấm..." : "Nộp bài"}
        </Button>
      </form>
    </div>
  );
}
