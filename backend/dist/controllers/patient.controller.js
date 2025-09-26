"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitFeedback = exports.getMyBills = exports.getMyReports = exports.getMyPrescriptions = exports.createAppointment = exports.getMyAppointments = void 0;
const Appointment_1 = require("../models/Appointment");
const Prescription_1 = require("../models/Prescription");
const MedicalReport_1 = require("../models/MedicalReport");
const Bill_1 = require("../models/Bill");
const Feedback_1 = require("../models/Feedback");
const getMyAppointments = async (req, res) => {
    const apps = await Appointment_1.Appointment.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
    res.json(apps);
};
exports.getMyAppointments = getMyAppointments;
const createAppointment = async (req, res) => {
    const app = await Appointment_1.Appointment.create(req.body);
    res.status(201).json(app);
};
exports.createAppointment = createAppointment;
const getMyPrescriptions = async (req, res) => {
    const pres = await Prescription_1.Prescription.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
    res.json(pres);
};
exports.getMyPrescriptions = getMyPrescriptions;
const getMyReports = async (req, res) => {
    const reports = await MedicalReport_1.MedicalReport.find({ patient: req.query.patientId || undefined }).populate('patient doctor');
    res.json(reports);
};
exports.getMyReports = getMyReports;
const getMyBills = async (req, res) => {
    const bills = await Bill_1.Bill.find({ patient: req.query.patientId || undefined });
    res.json(bills);
};
exports.getMyBills = getMyBills;
const submitFeedback = async (req, res) => {
    const fb = await Feedback_1.Feedback.create(req.body);
    res.status(201).json(fb);
};
exports.submitFeedback = submitFeedback;
