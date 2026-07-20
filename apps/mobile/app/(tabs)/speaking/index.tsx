import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SpeakingProgressSummary } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

export default function SpeakingHomeScreen() {
  const [progress, setProgress] = useState<SpeakingProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      apiFetch<SpeakingProgressSummary>("/api/v1/speaking/progress")
        .then(setProgress)
        .catch(() => setProgress(null))
        .finally(() => setLoading(false));
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lexora Speaking</Text>
      <Text style={styles.subtitle}>Luyện nói với AI coach</Text>

      {progress && (
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Buổi tuần này: {progress.weeklyUsed ?? 0}
            {progress.weeklyLimit ? `/${progress.weeklyLimit}` : ""}
          </Text>
          <Text style={styles.cardText}>Tổng thời gian: {progress.totalPracticeMinutes} phút</Text>
        </View>
      )}

      <Pressable style={styles.primaryButton} onPress={() => router.push("/speaking/setup")}>
        <Text style={styles.primaryButtonText}>🎤 Bắt đầu luyện nói</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#1e3a5f" },
  subtitle: { fontSize: 14, color: "#64748b", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardText: { fontSize: 14, color: "#475569", marginBottom: 4 },
  primaryButton: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
