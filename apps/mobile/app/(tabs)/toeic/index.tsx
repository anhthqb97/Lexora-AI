import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import type { MockExamStart, ToeicAttempt, ToeicLimitStatus } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

export default function ToeicHomeScreen() {
  const [limits, setLimits] = useState<ToeicLimitStatus | null>(null);
  const [attempts, setAttempts] = useState<ToeicAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [lim, att] = await Promise.all([
        apiFetch<ToeicLimitStatus>("/api/v1/toeic/limits"),
        apiFetch<ToeicAttempt[]>("/api/v1/toeic/attempts?type=mock"),
      ]);
      setLimits(lim);
      setAttempts(att);
    } catch {
      setLimits(null);
      setAttempts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  async function startMock() {
    setStarting(true);
    try {
      const result = await apiFetch<MockExamStart>("/api/v1/toeic/mock", { method: "POST" });
      router.push(`/toeic/mock/${result.attempt.id}`);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Cannot start mock");
    } finally {
      setStarting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TOEIC Practice</Text>
      {limits && (
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Mocks remaining: {limits.mocksRemaining}/{limits.mockLimit}
          </Text>
          <Text style={styles.cardText}>
            Diagnostic: {limits.diagnosticCompleted ? "Completed ✓" : "Not started"}
          </Text>
        </View>
      )}

      <Pressable style={styles.primaryButton} onPress={startMock} disabled={starting}>
        {starting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryText}>Start mock exam</Text>
        )}
      </Pressable>

      <Text style={styles.sectionTitle}>Past attempts</Text>
      <FlatList
        data={attempts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No attempts yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.attemptRow}>
            <Text style={styles.attemptDate}>
              {item.completedAt ? new Date(item.completedAt).toLocaleDateString() : "In progress"}
            </Text>
            <Text style={styles.attemptScore}>
              {item.totalScore != null ? `Score: ${item.totalScore}` : item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#1e3a5f", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardText: { fontSize: 14, color: "#475569", marginBottom: 4 },
  primaryButton: {
    backgroundColor: "#1e3a5f",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  primaryText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#1e3a5f", marginBottom: 12 },
  attemptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  attemptDate: { color: "#475569" },
  attemptScore: { color: "#1e3a5f", fontWeight: "600" },
  empty: { color: "#94a3b8", textAlign: "center", marginTop: 20 },
});
