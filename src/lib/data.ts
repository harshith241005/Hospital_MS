import type { Doctor, Patient, Appointment, Staff, Prescription, MedicalReport, Bill, Advisory, HealthVitals } from './types';

export const doctors: Doctor[] = [
  {
    "id": "D001",
    "name": "Dr. Aditi Sharma",
    "specialization": "Cardiologist",
    "experience": "12 years",
    "email": "aditi.sharma@hms.com",
    "phone": "9876543210",
    "availability": "Mon-Fri, 10am-4pm"
  },
  {
    "id": "D002",
    "name": "Dr. Ramesh Verma",
    "specialization": "Neurologist",
    "experience": "15 years",
    "email": "doctor@hms.com",
    "phone": "9812345678",
    "availability": "Tue-Sat, 11am-5pm"
  },
  {
    "id": "D003",
    "name": "Dr. Sneha Kapoor",
    "specialization": "Pediatrician",
    "experience": "8 years",
    "email": "sneha.kapoor@hms.com",
    "phone": "9123456789",
    "availability": "Mon-Fri, 9am-2pm"
  },
  {
    "id": "D004",
    "name": "Dr. Vikram Singh",
    "specialization": "Orthopedic Surgeon",
    "experience": "10 years",
    "email": "vikram.singh@hms.com",
    "phone": "9988776655",
    "availability": "Mon-Sat, 2pm-8pm"
  },
  {
    "id": "D005",
    "name": "Dr. Meera Joshi",
    "specialization": "Gynecologist",
    "experience": "14 years",
    "email": "meera.joshi@hms.com",
    "phone": "9871203456",
    "availability": "Mon-Sat, 10am-3pm"
  },
  {
    "id": "D006",
    "name": "Dr. Arjun Nair",
    "specialization": "Dermatologist",
    "experience": "7 years",
    "email": "arjun.nair@hms.com",
    "phone": "9765432109",
    "availability": "Mon-Fri, 1pm-6pm"
  }
];

export const patients: Patient[] = [
  {
    "id": "P001",
    "name": "Rahul Mehta",
    "age": 32,
    "gender": "Male",
    "disease": "Hypertension",
    "doctorAssigned": "Dr. Aditi Sharma",
    "contact": "9876501234",
    "email": "patient@hms.com"
  },
  {
    "id": "P002",
    "name": "Priya Reddy",
    "age": 28,
    "gender": "Female",
    "disease": "Migraine",
    "doctorAssigned": "Dr. Ramesh Verma",
    "contact": "9823412345",
    "email": "priya.reddy@example.com"
  },
  {
    "id": "P003",
    "name": "Ankit Gupta",
    "age": 45,
    "gender": "Male",
    "disease": "Diabetes",
    "doctorAssigned": "Dr. Meera Joshi",
    "contact": "9911223344",
    "email": "ankit.gupta@example.com"
  },
  {
    "id": "P004",
    "name": "Sanya Malhotra",
    "age": 6,
    "gender": "Female",
    "disease": "Fever",
    "doctorAssigned": "Dr. Sneha Kapoor",
    "contact": "9988332211",
    "email": "sanya.malhotra@example.com"
  },
  {
    "id": "P005",
    "name": "Vikash Yadav",
    "age": 52,
    "gender": "Male",
    "disease": "Fracture (Leg)",
    "doctorAssigned": "Dr. Vikram Singh",
    "contact": "9123009876",
    "email": "vikash.yadav@example.com"
  },
  {
    "id": "P006",
    "name": "Neha Patel",
    "age": 34,
    "gender": "Female",
    "disease": "Skin Allergy",
    "doctorAssigned": "Dr. Arjun Nair",
    "contact": "9786541230",
    "email": "neha.patel@example.com"
  }
];

export const appointments: Appointment[] = [
    { id: 'A001', patientId: 'P001', patientName: 'Rahul Mehta', doctorId: 'D001', doctorName: 'Dr. Aditi Sharma', date: '2024-08-15', time: '10:00 AM', status: 'confirmed' },
    { id: 'A002', patientId: 'P002', patientName: 'Priya Reddy', doctorId: 'D002', doctorName: 'Dr. Ramesh Verma', date: '2024-08-16', time: '11:30 AM', status: 'pending' },
    { id: 'A003', patientId: 'P003', patientName: 'Ankit Gupta', doctorId: 'D005', doctorName: 'Dr. Meera Joshi', date: '2024-08-16', time: '02:00 PM', status: 'completed' },
    { id: 'A004', patientId: 'P004', patientName: 'Sanya Malhotra', doctorId: 'D003', doctorName: 'Dr. Sneha Kapoor', date: '2024-08-17', time: '09:00 AM', status: 'cancelled' },
    { id: 'A005', patientId: 'P001', patientName: 'Rahul Mehta', doctorId: 'D002', doctorName: 'Dr. Ramesh Verma', date: '2024-08-20', time: '01:00 PM', status: 'pending' },
    { id: 'A006', patientId: 'P005', patientName: 'Vikash Yadav', doctorId: 'D004', doctorName: 'Dr. Vikram Singh', date: '2024-08-21', time: '04:00 PM', status: 'confirmed' },
];

export const staff: Staff[] = [
    { id: 'S001', name: 'Sunita Sharma', role: 'Nurse', email: 'sunita.s@hms.com', phone: '9876543211' },
    { id: 'S002', name: 'Rajesh Kumar', role: 'Receptionist', email: 'rajesh.k@hms.com', phone: '9876543212' },
    { id: 'S003', name: 'Amit Singh', role: 'Lab Technician', email: 'amit.s@hms.com', phone: '9876543213' },
    { id: 'S004', name: 'Priya Desai', role: 'Pharmacist', email: 'priya.d@hms.com', phone: '9876543214' },
    { id: 'S005', name: 'Deepak Verma', role: 'Accountant', email: 'deepak.v@hms.com', phone: '9876543215' },
];


export const prescriptions: Prescription[] = [
  {
    id: 'PR001',
    patientId: 'P001',
    patientName: 'Rahul Mehta',
    doctorId: 'D001',
    doctorName: 'Dr. Aditi Sharma',
    date: '2024-08-15',
    medicines: [
      { medicine: 'Amlodipine', dosage: '5mg once daily' },
      { medicine: 'Aspirin', dosage: '75mg once daily' }
    ],
    notes: 'Follow up in 2 weeks.'
  },
  {
    id: 'PR002',
    patientId: 'P002',
    patientName: 'Priya Reddy',
    doctorId: 'D002',
    doctorName: 'Dr. Ramesh Verma',
    date: '2024-08-10',
    medicines: [
      { medicine: 'Sumatriptan', dosage: '50mg as needed for migraine' },
    ],
    notes: 'Avoid triggers like caffeine and lack of sleep.'
  },
   {
    id: 'PR003',
    patientId: 'P001',
    patientName: 'Rahul Mehta',
    doctorId: 'D002',
    doctorName: 'Dr. Ramesh Verma',
    date: '2024-07-05',
    medicines: [
      { medicine: 'Ibuprofen', dosage: '200mg twice a day' },
    ],
    notes: 'Take with food.'
  }
];


export const medicalReports: MedicalReport[] = [
  { id: 'MR001', patientId: 'P001', title: 'Blood Test Report', date: '2024-08-14', fileUrl: '/reports/blood-test-p001.pdf' },
  { id: 'MR002', patientId: 'P001', title: 'Chest X-Ray', date: '2024-07-20', fileUrl: '/reports/xray-p001.pdf' },
  { id: 'MR003', patientId: 'P002', title: 'MRI Scan', date: '2024-08-09', fileUrl: '/reports/mri-p002.pdf' },
];

export const bills: Bill[] = [
  { id: 'B001', patientId: 'P001', date: '2024-08-15', amount: 1500, status: 'paid', details: 'Consultation & Blood Test' },
  { id: 'B002', patientId: 'P001', date: '2024-08-20', amount: 500, status: 'pending', details: 'Follow-up Consultation' },
  { id: 'B003', patientId: 'P002', date: '2024-08-16', amount: 8000, status: 'paid', details: 'MRI Scan & Consultation' },
];


export const healthAdvisories: Advisory[] = [
    { id: 'HA001', title: 'Follow-up Reminder', details: 'You have a follow-up due with Dr. Aditi Sharma on August 29th for your hypertension check-up.' },
    { id: 'HA002', title: 'Annual Check-up Recommendation', details: 'Based on your age and medical history, we recommend scheduling a yearly full-body check-up.' },
    { id: 'HA003', title: 'Medication Advisory', details: 'Your last prescription included antibiotics. Please ensure you complete the full course and avoid alcohol.' },
];

export const doctorAdvisories: Advisory[] = [
    { id: 'DA001', title: 'Schedule Update', details: 'You have 5 appointments scheduled for today. Your first is at 10:00 AM with Rahul Mehta.' },
    { id: 'DA002', title: 'New Guideline: Diabetes Care', details: 'New hospital guideline: Prescribe Metformin XR for long-term type 2 diabetes patients for better glycemic control.' },
    { id: 'DA003', title: 'Staff Meeting Announcement', details: 'A mandatory hospital staff meeting is scheduled for 4 PM today in the main conference hall.' },
];

export const adminAdvisories: Advisory[] = [
    { id: 'AA001', title: 'Weekly Occupancy Report', details: 'Hospital occupancy is at 78% this week. The General Ward is nearing full capacity.' },
    { id: 'AA002', title: 'Department Performance', details: 'The Department of Cardiology has the maximum number of bookings this month (32 appointments).' },
    { id: 'AA003', title: 'Resource Alert: Blood Bank', details: 'The O-negative blood bank level is critically low. Please coordinate with the lab to replenish stock immediately.' },
];


export const healthVitals: HealthVitals = {
    bloodPressure: [
        { date: '2024-05-01', systolic: 130, diastolic: 85 },
        { date: '2024-06-01', systolic: 128, diastolic: 82 },
        { date: '2024-07-01', systolic: 135, diastolic: 88 },
        { date: '2024-08-01', systolic: 132, diastolic: 86 },
    ],
    bloodSugar: [
        { date: '2024-05-01', level: 110 },
        { date: '2024-06-01', level: 115 },
        { date: '2024-07-01', level: 108 },
        { date: '2024-08-01', level: 112 },
    ]
}
