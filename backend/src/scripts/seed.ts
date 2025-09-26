import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectToDatabase } from '../config/db.js';
import { User } from '../models/User.js';
import { Doctor } from '../models/Doctor.js';
import { Patient } from '../models/Patient.js';

async function run() {
  await connectToDatabase();
  await Promise.all([User.deleteMany({}), Doctor.deleteMany({}), Patient.deleteMany({})]);

  const admin = await User.create({ email: 'admin@hms.com', password: 'admin123', role: 'admin', name: 'Admin' });

  const docUser1 = await User.create({ email: 'doc1@hms.com', password: 'doctor123', role: 'doctor', name: 'Dr. One' });
  const doc1 = await Doctor.create({ user: docUser1._id, specialization: 'Cardiology', phone: '1111111111' });

  const patUser1 = await User.create({ email: 'pat1@hms.com', password: 'patient123', role: 'patient', name: 'Pat One' });
  await Patient.create({ user: patUser1._id, age: 30, gender: 'M', disease: 'Flu', doctorAssigned: doc1._id, contact: '9999999999' });

  // eslint-disable-next-line no-console
  console.log('Seed complete');
  await mongoose.connection.close();
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});



