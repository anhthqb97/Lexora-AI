"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Profile = {
  name?: string;
  email?: string;
  locale: string;
  tier: string;
};

function ReferralSection() {
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [signupCount, setSignupCount] = useState(0);
  const [rewardsGranted, setRewardsGranted] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/v1/referrals")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) {
          setInviteUrl(res.data.inviteUrl);
          setSignupCount(res.data.signupCount ?? 0);
          setRewardsGranted(res.data.rewardsGranted ?? 0);
        }
      })
      .catch(() => {});
  }, []);

  if (!inviteUrl) return <p className="text-sm text-gray-500">Đang tải...</p>;

  return (
    <>
      <p className="text-sm text-gray-600">
        Đã mời: <strong>{signupCount}</strong> người · Phần thưởng:{" "}
        <strong>{rewardsGranted}</strong>
      </p>
      <Input value={inviteUrl} readOnly className="text-xs" />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          void navigator.clipboard.writeText(inviteUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? "Đã sao chép!" : "Sao chép link"}
      </Button>
    </>
  );
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("vi");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/v1/users/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setProfile(data.data);
          setName(data.data.name ?? "");
          setLocale(data.data.locale ?? "vi");
        }
      })
      .catch(() => {});
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, locale }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-lexora-blue">Cài đặt</h1>

      <Card>
        <CardHeader>
          <CardTitle>Hồ sơ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Tên hiển thị</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <Input value={profile?.email ?? ""} disabled />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ngôn ngữ giao diện</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
            <Button type="submit">Lưu thay đổi</Button>
            {saved && <p className="text-sm text-lexora-teal">Đã lưu!</p>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Giới thiệu bạn bè</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ReferralSection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            Gói hiện tại: <strong>{profile?.tier === "paid" ? "Pro" : "Free"}</strong>
          </p>
          <Link
            href="/settings/subscription"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-50"
          >
            Quản lý gói đăng ký
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
