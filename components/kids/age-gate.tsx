"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ParentalConsentGate({ onVerified }: { onVerified: () => void }) {
  const [birthYear, setBirthYear] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const year = Number(birthYear);
    const age = new Date().getFullYear() - year;
    if (age >= 13) {
      onVerified();
      return;
    }
    if (!parentEmail.includes("@")) {
      setError("Cần email phụ huynh để đồng ý (dưới 13 tuổi)");
      return;
    }
    onVerified();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Xác minh độ tuổi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            placeholder="Năm sinh"
            className="w-full rounded border px-3 py-2 text-sm"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email phụ huynh (nếu dưới 13 tuổi)"
            className="w-full rounded border px-3 py-2 text-sm"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" size="sm">
            Tiếp tục
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
