"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type VoiceConsentModalProps = {
  onGranted: () => void;
  onClose?: () => void;
};

export function VoiceConsentModal({ onGranted, onClose }: VoiceConsentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGrant() {
    if (!agreed) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/speaking/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "voice_recording", granted: true }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message ?? "Consent failed");
      }
      onGranted();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lexora-blue">Quyền truy cập micro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Lexora cần quyền truy cập micro để đánh giá giọng nói của bạn.
          </p>
          <p className="text-sm text-gray-600">
            Giọng nói được xử lý an toàn và không chia sẻ với bên thứ ba.
          </p>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            Tôi đồng ý
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-lexora-teal hover:opacity-90"
              disabled={!agreed || loading}
              onClick={handleGrant}
            >
              {loading ? "Đang lưu..." : "Cho phép micro"}
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
