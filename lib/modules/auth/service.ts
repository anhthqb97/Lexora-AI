import type { AuthTokens, RegisterInput } from "./types";

export async function registerWithEmail(_input: RegisterInput): Promise<AuthTokens> {
  throw new Error("Not implemented — P1-T006");
}

export async function loginWithEmail(_email: string, _password: string): Promise<AuthTokens> {
  throw new Error("Not implemented — P1-T006");
}
