import { connectDatabase } from "@/lib/db/mongoose";
import mongoose from "mongoose";
import { ReferralRewardModel } from "./service";

export async function grantPendingRewards(referrerUserId: string): Promise<number> {
  await connectDatabase();
  const result = await ReferralRewardModel.updateMany(
    { referrerUserId: new mongoose.Types.ObjectId(referrerUserId), status: "pending" },
    { status: "granted" },
  );
  return result.modifiedCount;
}
