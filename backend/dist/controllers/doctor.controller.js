"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyReports = exports.uploadReport = exports.getMyPrescriptions = exports.createPrescription = exports.rescheduleAppointment = exports.updateAppointmentStatus = exports.getMyAppointments = void 0;
const Appointment_1 = require("../models/Appointment");
const Prescription_1 = require("../models/Prescription");
const MedicalReport_1 = require("../models/MedicalReport");
const getMyAppointments = async (req, res) => {
    const user = req.user;
    const apps = await Appointment_1.Appointment.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
    res.json(apps);
};
exports.getMyAppointments = getMyAppointments;
const updateAppointmentStatus = async (req, res) => {
    const updated = await Appointment_1.Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
};
exports.updateAppointmentStatus = updateAppointmentStatus;
const rescheduleAppointment = async (req, res) => {
    const updated = await Appointment_1.Appointment.findByIdAndUpdate(req.params.id, { date: req.body.date, time: req.body.time }, { new: true });
    res.json(updated);
};
exports.rescheduleAppointment = rescheduleAppointment;
const createPrescription = async (req, res) => {
    const pres = await Prescription_1.Prescription.create(req.body);
    res.status(201).json(pres);
};
exports.createPrescription = createPrescription;
const getMyPrescriptions = async (req, res) => {
    const pres = await Prescription_1.Prescription.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
    res.json(pres);
};
exports.getMyPrescriptions = getMyPrescriptions;
const uploadReport = async (req, res) => {
    const report = await MedicalReport_1.MedicalReport.create(req.body);
    res.status(201).json(report);
};
exports.uploadReport = uploadReport;
const getMyReports = async (req, res) => {
    const reports = await MedicalReport_1.MedicalReport.find({ doctor: req.query.doctorId || undefined }).populate('patient doctor');
    res.json(reports);
};
exports.getMyReports = getMyReports;
