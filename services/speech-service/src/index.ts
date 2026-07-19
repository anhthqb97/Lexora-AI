import express from "express";

const app = express();
app.use(express.raw({ type: "audio/*", limit: "10mb" }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "speech" });
});

/** Mock STT — replace with Azure/Whisper in production. */
app.post("/v1/transcribe", (req, res) => {
  const hasAudio = Buffer.isBuffer(req.body) && req.body.length > 0;
  res.json({
    text: hasAudio ? "Hello, this is a speech-service transcript." : "",
    confidence: hasAudio ? 0.92 : 0,
  });
});

app.post("/v1/pronunciation", (req, res) => {
  const referenceText = (req.body?.referenceText as string) ?? "";
  res.json({
    accuracy: referenceText ? 85 : 0,
    fluency: 80,
    completeness: 90,
  });
});

const port = Number(process.env.PORT ?? 8082);
app.listen(port, () => {
  console.log(`speech-service listening on :${port}`);
});
