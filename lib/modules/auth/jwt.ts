import { SignJWT, jwtVerify } from "jose";

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type MobileJwtPayload = {
  sub: string;
  email?: string;
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET or AUTH_SECRET is required for mobile tokens");
  }
  return new TextEncoder().encode(secret);
}

export async function signMobileToken(payload: MobileJwtPayload): Promise<{
  accessToken: string;
  expiresIn: number;
}> {
  const expiresIn = TOKEN_TTL_SECONDS;
  const accessToken = await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${expiresIn}s`)
    .sign(getSecret());

  return { accessToken, expiresIn };
}

export async function verifyMobileToken(token: string): Promise<MobileJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub) return null;
    return {
      sub: payload.sub,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  } catch {
    return null;
  }
}

export { TOKEN_TTL_SECONDS };
