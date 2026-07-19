import { randomInt } from "crypto";
import { connectDatabase } from "@/lib/db/mongoose";
import { redisGet, redisSet } from "@/lib/redis";
import { User } from "./models";

const OTP_TTL_SECONDS = 300;
const OTP_RATE_LIMIT = 3;
const OTP_RATE_WINDOW_SECONDS = 900;

export class OtpError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

/** Normalize and validate Vietnamese phone numbers (+84). */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, "");
  if (!trimmed.startsWith("+84")) {
    throw new OtpError("VALIDATION_ERROR", "Phone must be a valid +84 number");
  }

  const digits = trimmed.slice(3);
  if (!/^\d{9,10}$/.test(digits)) {
    throw new OtpError("VALIDATION_ERROR", "Phone must be a valid +84 number");
  }

  return `+84${digits}`;
}

function otpKey(phone: string): string {
  return `otp:${phone}`;
}

function otpRateKey(phone: string): string {
  return `otp:rate:${phone}`;
}

function generateOtp(): string {
  return randomInt(100000, 999999).toString();
}

async function checkRateLimit(phone: string): Promise<void> {
  const key = otpRateKey(phone);
  const current = await redisGet(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= OTP_RATE_LIMIT) {
    throw new OtpError("RATE_LIMITED", "Too many OTP requests. Try again later.");
  }

  const next = count + 1;
  if (count === 0) {
    await redisSet(key, String(next), OTP_RATE_WINDOW_SECONDS);
  } else {
    await redisSet(key, String(next));
  }
}

/** Stub: store OTP in Redis. SMS delivery wired when ESMS credentials are set. */
export async function sendOtp(rawPhone: string): Promise<{ expiresIn: number }> {
  const phone = normalizePhone(rawPhone);
  await checkRateLimit(phone);

  const otp = generateOtp();
  await redisSet(otpKey(phone), otp, OTP_TTL_SECONDS);

  if (process.env.NODE_ENV !== "production") {
    console.info(`[otp-stub] ${phone} → ${otp}`);
  }

  return { expiresIn: OTP_TTL_SECONDS };
}

export async function verifyOtp(
  rawPhone: string,
  code: string,
): Promise<{ userId: string; isNewUser: boolean }> {
  const phone = normalizePhone(rawPhone);

  if (!/^\d{6}$/.test(code.trim())) {
    throw new OtpError("VALIDATION_ERROR", "Invalid OTP code");
  }

  const stored = await redisGet(otpKey(phone));
  if (!stored || stored !== code.trim()) {
    throw new OtpError("AUTH_INVALID", "Invalid or expired OTP");
  }

  await connectDatabase();

  let user = await User.findOne({ phone, status: "active" });
  let isNewUser = false;

  if (!user) {
    user = await User.create({ phone, tier: "free", status: "active" });
    isNewUser = true;
  }

  await redisSet(otpKey(phone), "", 1);

  return { userId: user._id.toString(), isNewUser };
}
