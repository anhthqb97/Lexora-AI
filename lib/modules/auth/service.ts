import bcrypt from "bcryptjs";
import { connectDatabase } from "@/lib/db/mongoose";
import { User } from "./models";
import type { AuthTokens, RegisterInput } from "./types";

const SALT_ROUNDS = 12;

export class AuthError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export async function registerWithEmail(input: RegisterInput): Promise<{ userId: string }> {
  await connectDatabase();

  const email = input.email.toLowerCase().trim();
  if (!email || input.password.length < 8) {
    throw new AuthError("VALIDATION_ERROR", "Invalid email or password");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new AuthError("EMAIL_EXISTS", "Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await User.create({ email, passwordHash, tier: "free", status: "active" });

  return { userId: user._id.toString() };
}

export async function loginWithEmail(email: string, password: string): Promise<AuthTokens> {
  await connectDatabase();

  const user = await User.findOne({ email: email.toLowerCase().trim(), status: "active" });
  if (!user?.passwordHash) {
    throw new AuthError("INVALID_CREDENTIALS", "Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AuthError("INVALID_CREDENTIALS", "Invalid email or password");
  }

  // JWT issued via NextAuth in P1-T007 — return user reference for now
  return {
    accessToken: user._id.toString(),
    refreshToken: user._id.toString(),
  };
}

export async function verifyPassword(email: string, password: string) {
  await connectDatabase();
  const user = await User.findOne({ email: email.toLowerCase().trim(), status: "active" });
  if (!user?.passwordHash) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}
