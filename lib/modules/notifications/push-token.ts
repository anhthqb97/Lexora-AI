import mongoose, { Schema, models, model } from "mongoose";

export interface IPushToken {
  userId: mongoose.Types.ObjectId;
  token: string;
  platform: "ios" | "android" | "unknown";
  createdAt: Date;
  updatedAt: Date;
}

const PushTokenSchema = new Schema<IPushToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    token: { type: String, required: true, unique: true },
    platform: { type: String, enum: ["ios", "android", "unknown"], default: "unknown" },
  },
  { timestamps: true },
);

PushTokenSchema.index({ userId: 1, token: 1 });

export const PushToken =
  models.PushToken ?? model<IPushToken>("PushToken", PushTokenSchema);

export async function registerPushToken(
  userId: string,
  token: string,
  platform: "ios" | "android" | "unknown" = "unknown",
) {
  await PushToken.findOneAndUpdate(
    { token },
    { userId: new mongoose.Types.ObjectId(userId), token, platform },
    { upsert: true, new: true },
  );
}

export async function listPushTokens(userId: string): Promise<string[]> {
  const docs = await PushToken.find({ userId: new mongoose.Types.ObjectId(userId) });
  return docs.map((d) => d.token);
}
