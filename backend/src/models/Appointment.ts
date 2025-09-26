import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface AppointmentDocument extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  date: Date;
  time: string;
  status: AppointmentStatus;
  requirements?: string;
}

const AppointmentSchema = new Schema<AppointmentDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending', required: true },
    requirements: { type: String },
  },
  { timestamps: true }
);

export const Appointment: Model<AppointmentDocument> = mongoose.models.Appointment || mongoose.model<AppointmentDocument>('Appointment', AppointmentSchema);


