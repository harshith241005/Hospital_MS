import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri?: string): Promise<void> {
  const uri = mongoUri || process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  // Optional: log connection state
}


