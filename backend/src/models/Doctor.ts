import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface DoctorDocument extends Document {
  user: Types.ObjectId;
  specialization: string;
  experience?: string;
  phone: string;
  availability?: string;
}

const DoctorSchema = new Schema<DoctorDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    experience: { type: String },
    phone: { type: String, required: true },
    availability: { type: String },
  },
  { timestamps: true }
);

export const Doctor: Model<DoctorDocument> = mongoose.models.Doctor || mongoose.model<DoctorDocument>('Doctor', DoctorSchema);



