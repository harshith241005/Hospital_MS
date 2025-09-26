import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import {
  getMyAppointments,
  createAppointment,
  getMyPrescriptions,
  getMyReports,
  getMyBills,
  submitFeedback,
} from '../controllers/patient.controller';

const router = Router();

router.use(authenticate, authorize(['patient']))
  .get('/appointments', getMyAppointments)
  .post('/appointments', createAppointment)
  .get('/prescriptions', getMyPrescriptions)
  .get('/reports', getMyReports)
  .get('/bills', getMyBills)
  .post('/feedback', submitFeedback);

export default router;

