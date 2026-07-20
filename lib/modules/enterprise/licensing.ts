import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";

const EnterpriseLicenseSchema = new Schema(
  {
    companyId: { type: String, required: true, index: true },
    seats: { type: Number, required: true },
    usedSeats: { type: Number, default: 0 },
    invoiceId: String,
    status: { type: String, enum: ["active", "expired"], default: "active" },
  },
  { timestamps: true },
);

export const EnterpriseLicenseModel =
  models.EnterpriseLicense ?? model("EnterpriseLicense", EnterpriseLicenseSchema);

export async function createBulkLicense(companyId: string, seats: number, invoiceId?: string) {
  await connectDatabase();
  return EnterpriseLicenseModel.create({ companyId, seats, invoiceId });
}

export async function assignSeat(companyId: string): Promise<boolean> {
  await connectDatabase();
  const license = await EnterpriseLicenseModel.findOne({ companyId, status: "active" });
  if (!license || license.usedSeats >= license.seats) return false;
  license.usedSeats += 1;
  await license.save();
  return true;
}
