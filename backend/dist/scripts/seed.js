"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const db_js_1 = require("../config/db.js");
const User_js_1 = require("../models/User.js");
const Doctor_js_1 = require("../models/Doctor.js");
const Patient_js_1 = require("../models/Patient.js");
async function run() {
    await (0, db_js_1.connectToDatabase)();
    await Promise.all([User_js_1.User.deleteMany({}), Doctor_js_1.Doctor.deleteMany({}), Patient_js_1.Patient.deleteMany({})]);
    const admin = await User_js_1.User.create({ email: 'admin@hms.com', password: 'admin123', role: 'admin', name: 'Admin' });
    const docUser1 = await User_js_1.User.create({ email: 'doc1@hms.com', password: 'doctor123', role: 'doctor', name: 'Dr. One' });
    const doc1 = await Doctor_js_1.Doctor.create({ user: docUser1._id, specialization: 'Cardiology', phone: '1111111111' });
    const patUser1 = await User_js_1.User.create({ email: 'pat1@hms.com', password: 'patient123', role: 'patient', name: 'Pat One' });
    await Patient_js_1.Patient.create({ user: patUser1._id, age: 30, gender: 'M', disease: 'Flu', doctorAssigned: doc1._id, contact: '9999999999' });
    // eslint-disable-next-line no-console
    console.log('Seed complete');
    await mongoose_1.default.connection.close();
}
run().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
