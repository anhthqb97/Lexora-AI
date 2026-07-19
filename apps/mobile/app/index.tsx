import { Redirect } from "expo-router";
import { getStoredToken } from "@/lib/api-client";

export default function Index() {
  return <Redirect href="/(tabs)/dashboard" />;
}

// Token check handled in root layout; this screen routes authenticated users to dashboard.
export async function checkAuth() {
  return getStoredToken();
}
