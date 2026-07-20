import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import { NextResponse } from "next/server";
import { getAuthUserId, unauthorized } from "@/lib/api/auth";
import { ok } from "@/lib/api/response";

const NpsResponseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, index: true },
    score: { type: Number, required: true, min: 0, max: 10 },
  },
  { timestamps: true },
);

const NpsResponseModel = models.NpsResponse ?? model("NpsResponse", NpsResponseSchema);

export async function POST(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  const body = await req.json();
  const score = Number(body.score);
  if (Number.isNaN(score) || score < 0 || score > 10) {
    return NextResponse.json(
      { error: { code: "INVALID_INPUT", message: "score 0-10 required" } },
      { status: 400 },
    );
  }
  await connectDatabase();
  await NpsResponseModel.create({ userId, score });
  return ok({ recorded: true }, 201);
}

export async function GET(req: Request) {
  const userId = await getAuthUserId(req);
  if (!userId) return unauthorized();
  await connectDatabase();
  const count = await NpsResponseModel.countDocuments();
  const avg = await NpsResponseModel.aggregate([
    { $group: { _id: null, avg: { $avg: "$score" } } },
  ]);
  return ok({ totalResponses: count, averageScore: avg[0]?.avg ?? null });
}
