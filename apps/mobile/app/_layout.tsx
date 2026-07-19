import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getStoredToken } from "@/lib/api-client";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    getStoredToken().then((token) => {
      setHasToken(!!token);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="speaking/setup" options={{ headerShown: true, title: "New session" }} />
        <Stack.Screen
          name="speaking/session/[id]/live"
          options={{ headerShown: true, title: "Live session" }}
        />
        <Stack.Screen
          name="speaking/session/[id]/summary"
          options={{ headerShown: true, title: "Summary" }}
        />
        <Stack.Screen
          name="toeic/mock/[attemptId]"
          options={{ headerShown: true, title: "Mock exam" }}
        />
      </Stack>
      {!hasToken && <Redirect href="/login" />}
    </>
  );
}
