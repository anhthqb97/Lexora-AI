import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import type { SessionDuration, SessionType, SpeakingScenario, SpeakingTopic } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

const DURATIONS: SessionDuration[] = [5, 10, 15, 20];
const TYPES: { value: SessionType; label: string }[] = [
  { value: "free_talk", label: "Free Talk" },
  { value: "topic", label: "Chủ đề" },
  { value: "scenario", label: "Tình huống" },
];

export default function SessionSetupScreen() {
  const [type, setType] = useState<SessionType>("free_talk");
  const [duration, setDuration] = useState<SessionDuration>(10);
  const [vietnameseHelp, setVietnameseHelp] = useState(true);
  const [topics, setTopics] = useState<SpeakingTopic[]>([]);
  const [scenarios, setScenarios] = useState<SpeakingScenario[]>([]);
  const [topicId, setTopicId] = useState<string | undefined>();
  const [scenarioId, setScenarioId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<SpeakingTopic[]>("/api/v1/speaking/topics").then(setTopics).catch(() => {});
    apiFetch<SpeakingScenario[]>("/api/v1/speaking/scenarios")
      .then(setScenarios)
      .catch(() => {});
  }, []);

  async function startSession() {
    setLoading(true);
    setError(null);
    try {
      const session = await apiFetch<{ id: string; greeting?: string }>("/api/v1/speaking/sessions", {
        method: "POST",
        body: JSON.stringify({
          type,
          durationMinutes: duration,
          vietnameseHelp,
          topicId: type === "topic" ? topicId : undefined,
          scenarioId: type === "scenario" ? scenarioId : undefined,
        }),
      });
      router.push(`/speaking/session/${session.id}/live`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to start session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Session type</Text>
      <View style={styles.row}>
        {TYPES.map((t) => (
          <Pressable
            key={t.value}
            style={[styles.chip, type === t.value && styles.chipActive]}
            onPress={() => setType(t.value)}
          >
            <Text style={[styles.chipText, type === t.value && styles.chipTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {type === "topic" && (
        <>
          <Text style={styles.label}>Topic</Text>
          {topics.map((t) => (
            <Pressable
              key={t.id}
              style={[styles.option, topicId === t.id && styles.optionActive]}
              onPress={() => setTopicId(t.id)}
            >
              <Text>{t.titleVi ?? t.title}</Text>
            </Pressable>
          ))}
        </>
      )}

      {type === "scenario" && (
        <>
          <Text style={styles.label}>Scenario</Text>
          {scenarios.map((s) => (
            <Pressable
              key={s.id}
              style={[styles.option, scenarioId === s.id && styles.optionActive]}
              onPress={() => setScenarioId(s.id)}
            >
              <Text>{s.titleVi ?? s.title}</Text>
            </Pressable>
          ))}
        </>
      )}

      <Text style={styles.label}>Duration (minutes)</Text>
      <View style={styles.row}>
        {DURATIONS.map((d) => (
          <Pressable
            key={d}
            style={[styles.chip, duration === d && styles.chipActive]}
            onPress={() => setDuration(d)}
          >
            <Text style={[styles.chipText, duration === d && styles.chipTextActive]}>{d}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Vietnamese help</Text>
        <Switch value={vietnameseHelp} onValueChange={setVietnameseHelp} />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={startSession} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Start session</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#1e3a5f", marginBottom: 8, marginTop: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
  },
  chipActive: { backgroundColor: "#1e3a5f" },
  chipText: { color: "#475569" },
  chipTextActive: { color: "#fff" },
  option: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  optionActive: { borderColor: "#0d9488", backgroundColor: "#f0fdfa" },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "#dc2626", marginTop: 12 },
});
