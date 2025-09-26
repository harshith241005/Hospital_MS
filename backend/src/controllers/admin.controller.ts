import { Request, Response } from 'express';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';
import { Patient } from '../models/Patient';
import { Appointment } from '../models/Appointment';
import { Bill } from '../models/Bill';
import { Staff } from '../models/Staff';

export const getDashboardStats = async (_req: Request, res: Response) => {
  const [patients, doctors, appointments] = await Promise.all([
    Patient.countDocuments(),
    Doctor.countDocuments(),
    Appointment.countDocuments(),
  ]);
  res.json({ totals: { patients, doctors, appointments } });
};

export const listDoctors = async (_req: Request, res: Response) => {
  const docs = await Doctor.find().populate('user');
  res.json(docs);
};

export const createDoctor = async (req: Request, res: Response) => {
  const { email, password, name, specialization, experience, phone, availability } = req.body as any;
  const user = await User.create({ email, password, role: 'doctor', name });
  const doctor = await Doctor.create({ user: user._id, specialization, experience, phone, availability });
  res.status(201).json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, doctor });
};

export const updateDoctor = async (req: Request, res: Response) => {
  const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const doc = await Doctor.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Doctor not found' });
  await User.findByIdAndDelete(doc.user);
  await doc.deleteOne();
  res.json({ ok: true });
};

export const listPatients = async (_req: Request, res: Response) => {
  const pts = await Patient.find().populate('user doctorAssigned');
  res.json(pts);
};

export const createPatient = async (req: Request, res: Response) => {
  const { email, password, name, age, gender, disease, doctorAssigned, contact } = req.body as any;
  const user = await User.create({ email, password, role: 'patient', name });
  const patient = await Patient.create({ user: user._id, age, gender, disease, doctorAssigned, contact });
  res.status(201).json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, patient });
};

export const updatePatient = async (req: Request, res: Response) => {
  const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deletePatient = async (req: Request, res: Response) => {
  const pat = await Patient.findById(req.params.id);
  if (!pat) return res.status(404).json({ message: 'Patient not found' });
  await User.findByIdAndDelete(pat.user);
  await pat.deleteOne();
  res.json({ ok: true });
};

export const listAppointments = async (_req: Request, res: Response) => {
  const apps = await Appointment.find().populate('patient doctor');
  res.json(apps);
};

export const createBill = async (req: Request, res: Response) => {
  const bill = await Bill.create(req.body);
  res.status(201).json(bill);
};

export const listBills = async (_req: Request, res: Response) => {
  const bills = await Bill.find();
  res.json(bills);
};

export const createStaff = async (req: Request, res: Response) => {
  const staff = await Staff.create(req.body);
  res.status(201).json(staff);
};

export const listStaff = async (_req: Request, res: Response) => {
  const staff = await Staff.find();
  res.json(staff);
};

export const updateStaff = async (req: Request, res: Response) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(staff);
};

export const deleteStaff = async (req: Request, res: Response) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};


