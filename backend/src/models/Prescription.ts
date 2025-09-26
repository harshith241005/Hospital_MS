import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface PrescriptionMedicine {
  medicine: string;
  dosage: string;
}

export interface PrescriptionDocument extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  medicines: PrescriptionMedicine[];
  notes?: string;
}

const PrescriptionSchema = new Schema<PrescriptionDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, default: Date.now },
    medicines: [{ medicine: { type: String, required: true }, dosage: { type: String, required: true } }],
    notes: { type: String },
  },
  { timestamps: true }
);

export const Prescription: Model<PrescriptionDocument> = mongoose.models.Prescription || mongoose.model<PrescriptionDocument>('Prescription', PrescriptionSchema);



