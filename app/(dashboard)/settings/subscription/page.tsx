"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRO_PRICE_VND_MONTHLY } from "@/lib/modules/billing/constants";

type Subscription = {
  plan: string;
  status: string;
  endsAt?: string;
};

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/billing/subscription")
      .then((r) => r.json())
      .then((data) => setSubscription(data.data))
      .catch(() => {});
  }, []);

  async function handleCheckout(provider: "momo" | "vnpay" | "card") {
    setLoading(provider);
    const res = await fetch("/api/v1/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    const data = await res.json();
    if (data.data?.paymentUrl) {
      window.location.href = data.data.paymentUrl;
    }
    setLoading(null);
  }

  const isPro = subscription?.plan === "pro";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings" className="text-sm text-lexora-teal hover:underline">
          ← Cài đặt
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-lexora-blue">Gói đăng ký</h1>

      <Card>
        <CardHeader>
          <CardTitle>Gói hiện tại</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-lg font-semibold">{isPro ? "Lexora Pro" : "Free"}</p>
          <p className="text-sm text-gray-600">Trạng thái: {subscription?.status ?? "active"}</p>
          {subscription?.endsAt && (
            <p className="text-sm text-gray-600">
              Hết hạn: {new Date(subscription.endsAt).toLocaleDateString("vi-VN")}
            </p>
          )}
        </CardContent>
      </Card>

      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Nâng cấp Pro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold text-lexora-teal">
              {PRO_PRICE_VND_MONTHLY.toLocaleString("vi-VN")} ₫ / tháng
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Speaking không giới hạn</li>
              <li>✓ TOEIC mock không giới hạn</li>
              <li>✓ Phản hồi AI chi tiết</li>
            </ul>
            <div className="grid gap-2">
              <Button disabled={!!loading} onClick={() => handleCheckout("momo")}>
                {loading === "momo" ? "Đang chuyển..." : "Thanh toán MoMo"}
              </Button>
              <Button variant="outline" disabled={!!loading} onClick={() => handleCheckout("vnpay")}>
                {loading === "vnpay" ? "Đang chuyển..." : "Thanh toán VNPay"}
              </Button>
              <Button variant="outline" disabled={!!loading} onClick={() => handleCheckout("card")}>
                {loading === "card" ? "Đang chuyển..." : "Thẻ tín dụng / ghi nợ"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
