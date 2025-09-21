export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  availability: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctorAssigned: string;
  contact: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  medicines: { medicine: string; dosage: string }[];
  notes: string;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  date: string;
  fileUrl: string; // a dummy url
}

export interface Bill {
  id: string;
  patientId: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  details: string;
}


export interface Advisory {
    id: string;
    title: string;
    details: string;
}


export interface HealthVitals {
    bloodPressure: { date: string; systolic: number; diastolic: number; }[];
    bloodSugar: { date: string; level: number; }[];
}
