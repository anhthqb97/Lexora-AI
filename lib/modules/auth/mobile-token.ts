import { connectDatabase } from "@/lib/db/mongoose";
import { AuthError, verifyPassword } from "./service";
import { signMobileToken } from "./jwt";

export async function issueMobileToken(email: string, password: string) {
  const user = await verifyPassword(email, password);
  if (!user) {
    throw new AuthError("INVALID_CREDENTIALS", "Invalid email or password");
  }

  await connectDatabase();
  const tokens = await signMobileToken({
    sub: user._id.toString(),
    email: user.email,
  });

  return {
    accessToken: tokens.accessToken,
    tokenType: "Bearer" as const,
    expiresIn: tokens.expiresIn,
  };
}
