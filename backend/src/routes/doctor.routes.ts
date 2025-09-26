import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import {
  getMyAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
  createPrescription,
  getMyPrescriptions,
  uploadReport,
  getMyReports,
} from '../controllers/doctor.controller';

const router = Router();

router.use(authenticate, authorize(['doctor']))
  .get('/appointments', getMyAppointments)
  .put('/appointments/:id/status', updateAppointmentStatus)
  .put('/appointments/:id/reschedule', rescheduleAppointment)
  .post('/prescriptions', createPrescription)
  .get('/prescriptions', getMyPrescriptions)
  .post('/reports/upload', uploadReport)
  .get('/reports', getMyReports);

export default router;

