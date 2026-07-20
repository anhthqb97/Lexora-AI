import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";
import crypto from "crypto";

const ReferralCodeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true },
);

const ReferralSignupSchema = new Schema(
  {
    referrerUserId: { type: Schema.Types.ObjectId, required: true, index: true },
    referredUserId: { type: Schema.Types.ObjectId, required: true, unique: true },
    code: { type: String, required: true },
  },
  { timestamps: true },
);

const ReferralRewardSchema = new Schema(
  {
    referrerUserId: { type: Schema.Types.ObjectId, required: true, index: true },
    referredUserId: { type: Schema.Types.ObjectId, required: true },
    rewardType: { type: String, enum: ["pro_days"], default: "pro_days" },
    rewardValue: { type: Number, default: 7 },
    status: { type: String, enum: ["pending", "granted"], default: "pending" },
  },
  { timestamps: true },
);

export const ReferralCodeModel = models.ReferralCode ?? model("ReferralCode", ReferralCodeSchema);
export const ReferralSignupModel =
  models.ReferralSignup ?? model("ReferralSignup", ReferralSignupSchema);
export const ReferralRewardModel =
  models.ReferralReward ?? model("ReferralReward", ReferralRewardSchema);

function generateCode(): string {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

export type ReferralStats = {
  code: string;
  inviteUrl: string;
  signupCount: number;
  rewardsGranted: number;
  pendingRewards: number;
};

export async function getOrCreateReferralCode(userId: string): Promise<ReferralStats> {
  await connectDatabase();
  let doc = await ReferralCodeModel.findOne({ userId });
  if (!doc) {
    let code = generateCode();
    for (let i = 0; i < 5; i++) {
      const exists = await ReferralCodeModel.findOne({ code });
      if (!exists) break;
      code = generateCode();
    }
    doc = await ReferralCodeModel.create({ userId, code });
  }
  const signupCount = await ReferralSignupModel.countDocuments({ referrerUserId: userId });
  const rewardsGranted = await ReferralRewardModel.countDocuments({
    referrerUserId: userId,
    status: "granted",
  });
  const pendingRewards = await ReferralRewardModel.countDocuments({
    referrerUserId: userId,
    status: "pending",
  });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return {
    code: doc.code,
    inviteUrl: `${baseUrl}/register?ref=${doc.code}`,
    signupCount,
    rewardsGranted,
    pendingRewards,
  };
}

export async function recordReferralSignup(referredUserId: string, code: string): Promise<boolean> {
  await connectDatabase();
  const referral = await ReferralCodeModel.findOne({ code: code.toUpperCase() });
  if (!referral || referral.userId.toString() === referredUserId) return false;
  const existing = await ReferralSignupModel.findOne({ referredUserId });
  if (existing) return false;
  await ReferralSignupModel.create({
    referrerUserId: referral.userId,
    referredUserId,
    code: referral.code,
  });
  await ReferralRewardModel.create({
    referrerUserId: referral.userId,
    referredUserId,
    rewardType: "pro_days",
    rewardValue: 7,
    status: "pending",
  });
  return true;
}
