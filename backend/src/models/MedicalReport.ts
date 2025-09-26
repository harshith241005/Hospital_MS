import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface MedicalReportDocument extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  title: string;
  date: Date;
  fileUrl: string;
}

const MedicalReportSchema = new Schema<MedicalReportDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const MedicalReport: Model<MedicalReportDocument> = mongoose.models.MedicalReport || mongoose.model<MedicalReportDocument>('MedicalReport', MedicalReportSchema);



