import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface PatientDocument extends Document {
  user: Types.ObjectId;
  age: number;
  gender?: string;
  disease?: string;
  doctorAssigned?: Types.ObjectId;
  contact: string;
}

const PatientSchema = new Schema<PatientDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true },
    gender: { type: String },
    disease: { type: String },
    doctorAssigned: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

export const Patient: Model<PatientDocument> = mongoose.models.Patient || mongoose.model<PatientDocument>('Patient', PatientSchema);


