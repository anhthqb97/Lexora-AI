import mongoose, { Schema, model, models } from "mongoose";
import { connectDatabase } from "@/lib/db/mongoose";

const CenterSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    contactEmail: String,
    studentCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const AssignmentSchema = new Schema(
  {
    centerId: { type: Schema.Types.ObjectId, required: true, index: true },
    teacherId: { type: Schema.Types.ObjectId, required: true },
    studentId: { type: Schema.Types.ObjectId, required: true, index: true },
    type: { type: String, enum: ["speaking", "toeic", "writing"], required: true },
    title: { type: String, required: true },
    dueAt: Date,
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    grade: { type: Number },
    sessionId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

export const CenterModel = models.Center ?? model("Center", CenterSchema);
export const AssignmentModel = models.Assignment ?? model("Assignment", AssignmentSchema);

export type AssignmentDTO = {
  id: string;
  centerId: string;
  studentId: string;
  type: string;
  title: string;
  dueAt?: string;
  status: string;
};

export function toAssignmentDTO(doc: {
  _id: mongoose.Types.ObjectId;
  centerId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  dueAt?: Date;
  status: string;
}): AssignmentDTO {
  return {
    id: doc._id.toString(),
    centerId: doc.centerId.toString(),
    studentId: doc.studentId.toString(),
    type: doc.type,
    title: doc.title,
    dueAt: doc.dueAt?.toISOString(),
    status: doc.status,
  };
}

export async function listCenters() {
  await connectDatabase();
  return CenterModel.find().sort({ name: 1 }).lean();
}

export async function createAssignment(input: {
  centerId: string;
  teacherId: string;
  studentId: string;
  type: string;
  title: string;
  dueAt?: string;
}) {
  await connectDatabase();
  const doc = await AssignmentModel.create({
    centerId: input.centerId,
    teacherId: input.teacherId,
    studentId: input.studentId,
    type: input.type,
    title: input.title,
    dueAt: input.dueAt ? new Date(input.dueAt) : undefined,
  });
  return toAssignmentDTO(doc);
}

export async function listAssignmentsForStudent(studentId: string) {
  await connectDatabase();
  const docs = await AssignmentModel.find({ studentId }).sort({ createdAt: -1 });
  return docs.map(toAssignmentDTO);
}

export async function getTeacherProgress(centerId: string) {
  await connectDatabase();
  const total = await AssignmentModel.countDocuments({ centerId });
  const completed = await AssignmentModel.countDocuments({ centerId, status: "completed" });
  return {
    centerId,
    totalAssignments: total,
    completed,
    completionRate: total ? completed / total : 0,
  };
}
