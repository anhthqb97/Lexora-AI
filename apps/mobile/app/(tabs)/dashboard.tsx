import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { SpeakingProgressSummary, ToeicLimitStatus, UserProfile } from "@lexora/shared";
import { apiFetch, getStoredToken } from "@/lib/api-client";

type DashboardData = {
  profile: UserProfile;
  speaking: SpeakingProgressSummary;
  toeic: ToeicLimitStatus & { latestScore?: number };
};

export default function DashboardScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token = await getStoredToken();
    if (!token) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [profile, speaking, toeic] = await Promise.all([
        apiFetch<UserProfile>("/api/v1/users/me"),
        apiFetch<SpeakingProgressSummary>("/api/v1/speaking/progress"),
        apiFetch<ToeicLimitStatus>("/api/v1/toeic/limits"),
      ]);
      setData({ profile, speaking, toeic });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error ?? "No data"}</Text>
        <Pressable style={styles.button} onPress={load}>
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Xin chào, {data.profile.name ?? data.profile.email ?? "bạn"}!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎤 Speaking</Text>
        <Text style={styles.cardText}>Sessions: {data.speaking.sessionCount}</Text>
        <Text style={styles.cardText}>Practice: {data.speaking.totalPracticeMinutes} min</Text>
        {data.speaking.averageConfidence != null && (
          <Text style={styles.cardText}>Avg confidence: {data.speaking.averageConfidence}%</Text>
        )}
        <Pressable style={styles.link} onPress={() => router.push("/(tabs)/speaking")}>
          <Text style={styles.linkText}>Go to Speaking →</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📝 TOEIC</Text>
        <Text style={styles.cardText}>
          Mocks remaining: {data.toeic.mocksRemaining}/{data.toeic.mockLimit}
        </Text>
        <Text style={styles.cardText}>
          Diagnostic: {data.toeic.diagnosticCompleted ? "Done ✓" : "Not started"}
        </Text>
        <Pressable style={styles.link} onPress={() => router.push("/(tabs)/toeic")}>
          <Text style={styles.linkText}>Go to TOEIC →</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  greeting: { fontSize: 22, fontWeight: "700", color: "#1e3a5f", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8, color: "#1e3a5f" },
  cardText: { fontSize: 14, color: "#475569", marginBottom: 4 },
  link: { marginTop: 8 },
  linkText: { color: "#0d9488", fontWeight: "600" },
  button: { backgroundColor: "#f97316", padding: 12, borderRadius: 8, marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "600" },
  error: { color: "#dc2626", marginBottom: 8, textAlign: "center" },
});
