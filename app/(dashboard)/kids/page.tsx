"use client";

import { useState } from "react";
import { ParentalConsentGate } from "@/components/kids/age-gate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listKidsModules } from "@/lib/modules/kids";

export default function KidsPage() {
  const [verified, setVerified] = useState(false);
  const modules = listKidsModules();

  if (!verified) {
    return (
      <div className="mx-auto max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-lexora-blue">Lexora Kids</h1>
        <ParentalConsentGate onVerified={() => setVerified(true)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-2xl font-bold text-lexora-blue">Lexora Kids</h1>
      <div className="grid gap-3">
        {modules.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle className="text-base">{m.titleVi}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">{m.title} (stub)</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
