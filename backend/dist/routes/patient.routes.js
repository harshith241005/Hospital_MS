"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const roles_1 = require("../middleware/roles");
const patient_controller_1 = require("../controllers/patient.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate, (0, roles_1.authorize)(['patient']))
    .get('/appointments', patient_controller_1.getMyAppointments)
    .post('/appointments', patient_controller_1.createAppointment)
    .get('/prescriptions', patient_controller_1.getMyPrescriptions)
    .get('/reports', patient_controller_1.getMyReports)
    .get('/bills', patient_controller_1.getMyBills)
    .post('/feedback', patient_controller_1.submitFeedback);
exports.default = router;
