import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  email?: string;
  phone?: string;
  passwordHash?: string;
  oauthProvider?: "google" | "facebook" | null;
  oauthId?: string;
  tier: "free" | "paid";
  status: "active" | "deleted";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    passwordHash: { type: String },
    oauthProvider: { type: String, enum: ["google", "facebook", null], default: null },
    oauthId: { type: String },
    tier: { type: String, enum: ["free", "paid"], default: "free" },
    status: { type: String, enum: ["active", "deleted"], default: "active" },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

export const User = models.User ?? model<IUser>("User", UserSchema);

export { mongoose };
