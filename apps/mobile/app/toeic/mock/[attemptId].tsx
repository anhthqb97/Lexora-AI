import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ToeicAttempt, ToeicQuestion } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

type PublicQuestion = Omit<ToeicQuestion, "correctChoiceId" | "explanation">;

export default function MockExamScreen() {
  const { attemptId } = useLocalSearchParams<{ attemptId: string }>();
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!attemptId) return;
    // Re-fetch attempt via mock start returns questions; load from stored session state
    // For MVP read-only: questions passed via re-start or we fetch attempt + content
    apiFetch<{ attempt: ToeicAttempt; questions: PublicQuestion[] }>("/api/v1/toeic/mock", {
      method: "POST",
    })
      .then((data) => {
        if (data.attempt.id === attemptId) {
          setQuestions(data.questions);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [attemptId]);

  const current = questions[currentIndex];

  const selectChoice = useCallback(
    async (choiceId: string) => {
      if (!attemptId || !current) return;
      setAnswers((prev) => ({ ...prev, [current.id]: choiceId }));
      await apiFetch<ToeicAttempt>("/api/v1/toeic/attempts", {
        method: "POST",
        body: JSON.stringify({
          attemptId,
          questionId: current.id,
          choiceId,
        }),
      });
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      }
    },
    [attemptId, current, currentIndex, questions.length],
  );

  async function finishExam() {
    if (!attemptId) return;
    setSubmitting(true);
    try {
      await apiFetch("/api/v1/toeic/mock", {
        method: "PATCH",
        body: JSON.stringify({ attemptId }),
      });
      router.replace("/(tabs)/toeic");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Finish failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  if (!current) {
    return (
      <View style={styles.center}>
        <Text>No questions loaded</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} / {questions.length}
      </Text>
      {current.stimulus ? <Text style={styles.stimulus}>{current.stimulus}</Text> : null}
      <Text style={styles.question}>{current.questionText}</Text>

      {current.choices.map((choice) => (
        <Pressable
          key={choice.id}
          style={[styles.choice, answers[current.id] === choice.id && styles.choiceSelected]}
          onPress={() => selectChoice(choice.id)}
        >
          <Text style={styles.choiceText}>{choice.text}</Text>
        </Pressable>
      ))}

      {currentIndex === questions.length - 1 && answers[current.id] && (
        <Pressable style={styles.finishButton} onPress={finishExam} disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.finishText}>Finish exam</Text>
          )}
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  progress: { color: "#64748b", marginBottom: 16 },
  stimulus: { fontSize: 14, color: "#475569", marginBottom: 12, fontStyle: "italic" },
  question: { fontSize: 18, fontWeight: "600", color: "#1e3a5f", marginBottom: 20 },
  choice: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  choiceSelected: { borderColor: "#0d9488", backgroundColor: "#f0fdfa" },
  choiceText: { fontSize: 15, color: "#334155" },
  finishButton: {
    backgroundColor: "#1e3a5f",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  finishText: { color: "#fff", fontWeight: "600" },
  link: { color: "#0d9488", marginTop: 12 },
});
