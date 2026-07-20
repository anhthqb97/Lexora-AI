import express from "express";

const app = express();
app.use(express.json());

/** Extracted from lib/modules/billing — microservice stub for Phase 5 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "billing-service" });
});

app.get("/v1/plans", (_req, res) => {
  res.json({
    data: [
      { id: "free", name: "Free", priceVnd: 0 },
      { id: "pro-monthly", name: "Pro", priceVnd: 199000 },
    ],
  });
});

app.get("/v1/subscription/:userId", (req, res) => {
  res.json({
    data: { userId: req.params.userId, plan: "free", status: "active" },
  });
});

const port = Number(process.env.PORT ?? 8083);
app.listen(port, () => {
  console.log(`billing-service listening on :${port}`);
});
