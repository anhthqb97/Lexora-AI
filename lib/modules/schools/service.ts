import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";

const SchoolClassSchema = new Schema(
  {
    schoolId: { type: Schema.Types.ObjectId, required: true, index: true },
    name: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId },
    studentIds: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true },
);

export const SchoolClassModel = models.SchoolClass ?? model("SchoolClass", SchoolClassSchema);

export async function importRoster(schoolId: string, className: string, studentIds: string[]) {
  await connectDatabase();
  return SchoolClassModel.create({
    schoolId,
    name: className,
    studentIds,
  });
}

export async function listClasses(schoolId: string) {
  await connectDatabase();
  return SchoolClassModel.find({ schoolId }).sort({ name: 1 });
}

export async function getSchoolAnalytics(schoolId: string) {
  await connectDatabase();
  const classes = await SchoolClassModel.find({ schoolId });
  const totalStudents = classes.reduce((sum, c) => sum + (c.studentIds?.length ?? 0), 0);
  return {
    schoolId,
    classCount: classes.length,
    totalStudents,
    avgClassSize: classes.length ? totalStudents / classes.length : 0,
  };
}
