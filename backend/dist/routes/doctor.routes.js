"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const roles_1 = require("../middleware/roles");
const doctor_controller_1 = require("../controllers/doctor.controller");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate, (0, roles_1.authorize)(['doctor']))
    .get('/appointments', doctor_controller_1.getMyAppointments)
    .put('/appointments/:id/status', doctor_controller_1.updateAppointmentStatus)
    .put('/appointments/:id/reschedule', doctor_controller_1.rescheduleAppointment)
    .post('/prescriptions', doctor_controller_1.createPrescription)
    .get('/prescriptions', doctor_controller_1.getMyPrescriptions)
    .post('/reports/upload', doctor_controller_1.uploadReport)
    .get('/reports', doctor_controller_1.getMyReports);
exports.default = router;
