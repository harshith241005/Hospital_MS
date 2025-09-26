import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface FeedbackDocument extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  rating: number;
  comment?: string;
  date: Date;
}

const FeedbackSchema = new Schema<FeedbackDocument>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Feedback: Model<FeedbackDocument> = mongoose.models.Feedback || mongoose.model<FeedbackDocument>('Feedback', FeedbackSchema);



