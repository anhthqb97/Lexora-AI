import * as SecureStore from "expo-secure-store";
import type { ApiResponse } from "@lexora/shared";

const TOKEN_KEY = "lexora_access_token";

function getApiBaseUrl(): string {
  return process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";
}

export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function storeToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function loginWithCredentials(email: string, password: string): Promise<string> {
  const res = await fetch(`${getApiBaseUrl()}/api/v1/auth/mobile/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = (await res.json()) as ApiResponse<{ accessToken: string }>;
  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error.message : "Login failed";
    throw new Error(message);
  }

  await storeToken(json.data.accessToken);
  return json.data.accessToken;
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getStoredToken();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, { ...init, headers });
  const json = (await res.json()) as ApiResponse<T>;

  if (!res.ok || "error" in json) {
    const message = "error" in json ? json.error.message : `Request failed (${res.status})`;
    throw new Error(message);
  }

  return json.data;
}

export async function logout(): Promise<void> {
  await clearToken();
}
