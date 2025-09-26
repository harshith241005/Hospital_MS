import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { Prescription } from '../models/Prescription';
import { MedicalReport } from '../models/MedicalReport';
import { Bill } from '../models/Bill';
import { Feedback } from '../models/Feedback';

export const getMyAppointments = async (req: Request, res: Response) => {
  const apps = await Appointment.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
  res.json(apps);
};

export const createAppointment = async (req: Request, res: Response) => {
  const app = await Appointment.create(req.body);
  res.status(201).json(app);
};

export const getMyPrescriptions = async (req: Request, res: Response) => {
  const pres = await Prescription.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
  res.json(pres);
};

export const getMyReports = async (req: Request, res: Response) => {
  const reports = await MedicalReport.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
  res.json(reports);
};

export const getMyBills = async (req: Request, res: Response) => {
  const bills = await Bill.find({ patient: req.query.patientId || undefined });
  res.json(bills);
};

export const submitFeedback = async (req: Request, res: Response) => {
  const fb = await Feedback.create(req.body);
  res.status(201).json(fb);
};


