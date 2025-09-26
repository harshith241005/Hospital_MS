"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.listStaff = exports.createStaff = exports.listBills = exports.createBill = exports.listAppointments = exports.deletePatient = exports.updatePatient = exports.createPatient = exports.listPatients = exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.listDoctors = exports.getDashboardStats = void 0;
const User_1 = require("../models/User");
const Doctor_1 = require("../models/Doctor");
const Patient_1 = require("../models/Patient");
const Appointment_1 = require("../models/Appointment");
const Bill_1 = require("../models/Bill");
const Staff_1 = require("../models/Staff");
const getDashboardStats = async (_req, res) => {
    const [patients, doctors, appointments] = await Promise.all([
        Patient_1.Patient.countDocuments(),
        Doctor_1.Doctor.countDocuments(),
        Appointment_1.Appointment.countDocuments(),
    ]);
    res.json({ totals: { patients, doctors, appointments } });
};
exports.getDashboardStats = getDashboardStats;
const listDoctors = async (_req, res) => {
    const docs = await Doctor_1.Doctor.find().populate('user');
    res.json(docs);
};
exports.listDoctors = listDoctors;
const createDoctor = async (req, res) => {
    const { email, password, name, specialization, experience, phone, availability } = req.body;
    const user = await User_1.User.create({ email, password, role: 'doctor', name });
    const doctor = await Doctor_1.Doctor.create({ user: user._id, specialization, experience, phone, availability });
    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, doctor });
};
exports.createDoctor = createDoctor;
const updateDoctor = async (req, res) => {
    const updated = await Doctor_1.Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updateDoctor = updateDoctor;
const deleteDoctor = async (req, res) => {
    const doc = await Doctor_1.Doctor.findById(req.params.id);
    if (!doc)
        return res.status(404).json({ message: 'Doctor not found' });
    await User_1.User.findByIdAndDelete(doc.user);
    await doc.deleteOne();
    res.json({ ok: true });
};
exports.deleteDoctor = deleteDoctor;
const listPatients = async (_req, res) => {
    const pts = await Patient_1.Patient.find().populate('user doctorAssigned');
    res.json(pts);
};
exports.listPatients = listPatients;
const createPatient = async (req, res) => {
    const { email, password, name, age, gender, disease, doctorAssigned, contact } = req.body;
    const user = await User_1.User.create({ email, password, role: 'patient', name });
    const patient = await Patient_1.Patient.create({ user: user._id, age, gender, disease, doctorAssigned, contact });
    res.status(201).json({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, patient });
};
exports.createPatient = createPatient;
const updatePatient = async (req, res) => {
    const updated = await Patient_1.Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
exports.updatePatient = updatePatient;
const deletePatient = async (req, res) => {
    const pat = await Patient_1.Patient.findById(req.params.id);
    if (!pat)
        return res.status(404).json({ message: 'Patient not found' });
    await User_1.User.findByIdAndDelete(pat.user);
    await pat.deleteOne();
    res.json({ ok: true });
};
exports.deletePatient = deletePatient;
const listAppointments = async (_req, res) => {
    const apps = await Appointment_1.Appointment.find().populate('patient doctor');
    res.json(apps);
};
exports.listAppointments = listAppointments;
const createBill = async (req, res) => {
    const bill = await Bill_1.Bill.create(req.body);
    res.status(201).json(bill);
};
exports.createBill = createBill;
const listBills = async (_req, res) => {
    const bills = await Bill_1.Bill.find();
    res.json(bills);
};
exports.listBills = listBills;
const createStaff = async (req, res) => {
    const staff = await Staff_1.Staff.create(req.body);
    res.status(201).json(staff);
};
exports.createStaff = createStaff;
const listStaff = async (_req, res) => {
    const staff = await Staff_1.Staff.find();
    res.json(staff);
};
exports.listStaff = listStaff;
const updateStaff = async (req, res) => {
    const staff = await Staff_1.Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(staff);
};
exports.updateStaff = updateStaff;
const deleteStaff = async (req, res) => {
    await Staff_1.Staff.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
};
exports.deleteStaff = deleteStaff;
