"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PaywallProps = {
  feature?: string;
  onClose?: () => void;
};

export function Paywall({ feature = "tính năng này", onClose }: PaywallProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lexora-blue">Nâng cấp Lexora Pro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Bạn đã đạt giới hạn miễn phí cho {feature}. Nâng cấp Pro để tiếp tục luyện tập không
            giới hạn.
          </p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>✓ Speaking không giới hạn</li>
            <li>✓ TOEIC mock test không giới hạn</li>
            <li>✓ Phản hồi AI chi tiết hơn</li>
          </ul>
          <p className="text-lg font-semibold text-lexora-teal">299.000 ₫ / tháng</p>
          <div className="flex gap-2">
            <Link
              href="/settings/subscription"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-lexora-orange px-4 text-sm font-medium text-white hover:opacity-90"
            >
              Nâng cấp ngay
            </Link>
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
