import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { SessionWithTurns, TurnResult } from "@lexora/shared";
import { apiFetch } from "@/lib/api-client";

export default function LiveSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [session, setSession] = useState<SessionWithTurns | null>(null);
  const [aiMessage, setAiMessage] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = id ?? "";
  const endedRef = useRef(false);

  useEffect(() => {
    if (!sessionId) return;
    apiFetch<SessionWithTurns>(`/api/v1/speaking/sessions/${sessionId}`)
      .then((s) => {
        setSession(s);
        setAiMessage(s.greeting ?? "Hello! Let's start speaking.");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Load failed"));

    apiFetch(`/api/v1/speaking/sessions/${sessionId}/resume`, { method: "POST" }).catch(() => {});
  }, [sessionId]);

  const endSession = useCallback(async () => {
    if (endedRef.current) return;
    endedRef.current = true;
    try {
      await apiFetch(`/api/v1/speaking/sessions/${sessionId}/end`, { method: "POST" });
      router.replace(`/speaking/session/${sessionId}/summary`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "End failed");
      endedRef.current = false;
    }
  }, [sessionId]);

  async function startRecording() {
    setError(null);
    const perm = await Audio.requestPermissionsAsync();
    if (!perm.granted) {
      setError("Microphone permission required");
      return;
    }
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();
    setRecording(rec);
    setIsRecording(true);
  }

  async function stopAndSend() {
    if (!recording) return;
    setIsRecording(false);
    setProcessing(true);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      let audioBase64: string | undefined;
      if (uri) {
        audioBase64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
      const result = await apiFetch<TurnResult>(`/api/v1/speaking/sessions/${sessionId}/turns`, {
        method: "POST",
        body: JSON.stringify({ audioBase64, transcript: transcript || undefined }),
      });
      setTranscript(result.transcript);
      setAiMessage(result.aiResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Turn failed");
    } finally {
      setProcessing(false);
    }
  }

  if (!session && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a5f" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.timer}>{session?.durationMinutes ?? 10} min session</Text>

      <View style={styles.aiBubble}>
        <Text style={styles.aiLabel}>AI Coach</Text>
        <Text style={styles.aiText}>{aiMessage}</Text>
      </View>

      {transcript ? (
        <View style={styles.userBubble}>
          <Text style={styles.userLabel}>You</Text>
          <Text>{transcript}</Text>
        </View>
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.controls}>
        {!isRecording ? (
          <Pressable
            style={styles.micButton}
            onPress={startRecording}
            disabled={processing}
          >
            {processing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.micText}>🎤 Hold to speak</Text>
            )}
          </Pressable>
        ) : (
          <Pressable style={[styles.micButton, styles.recording]} onPress={stopAndSend}>
            <Text style={styles.micText}>⏹ Send</Text>
          </Pressable>
        )}
      </View>

      <Pressable style={styles.endButton} onPress={endSession}>
        <Text style={styles.endText}>End session</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  timer: { textAlign: "center", color: "#64748b", marginBottom: 16 },
  aiBubble: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#e2e8f0" },
  aiLabel: { fontSize: 12, color: "#0d9488", fontWeight: "600", marginBottom: 4 },
  aiText: { fontSize: 16, color: "#1e293b" },
  userBubble: { backgroundColor: "#fef3c7", borderRadius: 12, padding: 16, marginBottom: 12 },
  userLabel: { fontSize: 12, color: "#b45309", fontWeight: "600", marginBottom: 4 },
  controls: { marginTop: 24, alignItems: "center" },
  micButton: { backgroundColor: "#f97316", paddingVertical: 16, paddingHorizontal: 32, borderRadius: 40 },
  recording: { backgroundColor: "#dc2626" },
  micText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  endButton: { marginTop: 24, padding: 12, alignItems: "center" },
  endText: { color: "#64748b", fontWeight: "600" },
  error: { color: "#dc2626", marginVertical: 8, textAlign: "center" },
});
