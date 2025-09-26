import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface BillDocument extends Document {
  patient: Types.ObjectId;
  date: Date;
  amount: number;
  status: 'paid' | 'pending';
  details: string;
  invoiceUrl: string;
}

const BillSchema = new Schema<BillDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
    details: { type: String, required: true },
    invoiceUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Bill: Model<BillDocument> = mongoose.models.Bill || mongoose.model<BillDocument>('Bill', BillSchema);


