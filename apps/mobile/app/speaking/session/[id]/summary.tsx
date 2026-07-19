import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SpeakingSummary } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

export default function SessionSummaryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [summary, setSummary] = useState<SpeakingSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch<SpeakingSummary>(`/api/v1/speaking/sessions/${id}/summary`)
      .then(setSummary)
      .catch((e) => setError(e instanceof Error ? e.message : "Load failed"));
  }, [id]);

  if (!summary && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  if (error || !summary) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error ?? "Summary not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Session Summary</Text>
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Overall confidence</Text>
        <Text style={styles.scoreValue}>{summary.overallConfidence}%</Text>
      </View>

      <Text style={styles.section}>Dimensions</Text>
      {Object.entries(summary.dimensions).map(([key, value]) => (
        <Text key={key} style={styles.dimRow}>
          {key}: {value}%
        </Text>
      ))}

      {summary.topFocusAreas.length > 0 && (
        <>
          <Text style={styles.section}>Focus areas</Text>
          {summary.topFocusAreas.map((area) => (
            <Text key={area} style={styles.bullet}>
              • {area}
            </Text>
          ))}
        </>
      )}

      <Text style={styles.encouragement}>{summary.encouragement}</Text>

      {summary.improvements.length > 0 && (
        <>
          <Text style={styles.section}>Improvements</Text>
          {summary.improvements.slice(0, 5).map((imp, i) => (
            <View key={i} style={styles.improvement}>
              <Text style={styles.impOriginal}>{imp.original}</Text>
              <Text style={styles.impCorrected}>→ {imp.corrected}</Text>
              <Text style={styles.impReason}>{imp.reason}</Text>
            </View>
          ))}
        </>
      )}

      <Pressable style={styles.button} onPress={() => router.replace("/(tabs)/speaking")}>
        <Text style={styles.buttonText}>Back to Speaking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", color: "#1e3a5f", marginBottom: 16 },
  scoreCard: { backgroundColor: "#1e3a5f", borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 20 },
  scoreLabel: { color: "#94a3b8", fontSize: 14 },
  scoreValue: { color: "#fff", fontSize: 36, fontWeight: "700" },
  section: { fontSize: 16, fontWeight: "600", color: "#1e3a5f", marginTop: 16, marginBottom: 8 },
  dimRow: { fontSize: 14, color: "#475569", marginBottom: 4 },
  bullet: { fontSize: 14, color: "#475569", marginBottom: 4 },
  encouragement: { fontSize: 15, color: "#0d9488", fontStyle: "italic", marginTop: 16, lineHeight: 22 },
  improvement: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: "#e2e8f0" },
  impOriginal: { color: "#dc2626", fontSize: 14 },
  impCorrected: { color: "#16a34a", fontSize: 14, marginTop: 2 },
  impReason: { color: "#64748b", fontSize: 12, marginTop: 4 },
  button: { backgroundColor: "#f97316", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "600" },
  error: { color: "#dc2626" },
});
