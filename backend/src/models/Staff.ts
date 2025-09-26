import mongoose, { Schema, Document, Model } from 'mongoose';

export interface StaffDocument extends Document {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

const StaffSchema = new Schema<StaffDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export const Staff: Model<StaffDocument> = mongoose.models.Staff || mongoose.model<StaffDocument>('Staff', StaffSchema);



