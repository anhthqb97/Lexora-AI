"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IeltsDiagnosticClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    await fetch("/api/v1/ielts/diagnostic", { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <Button onClick={start} disabled={loading}>
      {loading ? "Đang chấm..." : "Bắt đầu chẩn đoán"}
    </Button>
  );
}

export function IeltsResults({
  latest,
}: {
  latest: {
    overallBand: number;
    skills: { listening: number; reading: number; writing: number; speaking: number };
  } | null;
}) {
  if (!latest) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Band gần nhất: {latest.overallBand}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 text-sm">
        <div>Listening: {latest.skills.listening}</div>
        <div>Reading: {latest.skills.reading}</div>
        <div>Writing: {latest.skills.writing}</div>
        <div>Speaking: {latest.skills.speaking}</div>
      </CardContent>
    </Card>
  );
}
