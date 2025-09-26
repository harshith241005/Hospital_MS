import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { Prescription } from '../models/Prescription';
import { MedicalReport } from '../models/MedicalReport';

export const getMyAppointments = async (req: Request, res: Response) => {
  const user = req.user!;
  const apps = await Appointment.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
  res.json(apps);
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  const updated = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(updated);
};

export const rescheduleAppointment = async (req: Request, res: Response) => {
  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    { date: req.body.date, time: req.body.time },
    { new: true }
  );
  res.json(updated);
};

export const createPrescription = async (req: Request, res: Response) => {
  const pres = await Prescription.create(req.body);
  res.status(201).json(pres);
};

export const getMyPrescriptions = async (req: Request, res: Response) => {
  const pres = await Prescription.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
  res.json(pres);
};

export const uploadReport = async (req: Request, res: Response) => {
  const report = await MedicalReport.create(req.body);
  res.status(201).json(report);
};

export const getMyReports = async (req: Request, res: Response) => {
  const reports = await MedicalReport.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
  res.json(reports);
};


