import mongoose, { Schema, models, model } from "mongoose";
import type { PaymentProvider } from "./constants";

export interface ISubscription {
  userId: mongoose.Types.ObjectId;
  plan: "free" | "pro-monthly";
  status: "active" | "cancelled" | "expired";
  paymentProvider?: PaymentProvider;
  externalId?: string;
  startsAt?: Date;
  endsAt?: Date;
  cancelledAt?: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "User" },
    plan: { type: String, enum: ["free", "pro-monthly"], default: "free" },
    status: { type: String, enum: ["active", "cancelled", "expired"], default: "active" },
    paymentProvider: { type: String, enum: ["momo", "vnpay", "card"] },
    externalId: { type: String },
    startsAt: { type: Date },
    endsAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { timestamps: true },
);

SubscriptionSchema.index({ userId: 1 }, { unique: true });

export const Subscription =
  models.Subscription ?? model<ISubscription>("Subscription", SubscriptionSchema);
