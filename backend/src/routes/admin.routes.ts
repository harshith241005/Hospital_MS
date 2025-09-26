import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';
import {
  getDashboardStats,
  listDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  listPatients,
  createPatient,
  updatePatient,
  deletePatient,
  listAppointments,
  createBill,
  listBills,
  createStaff,
  listStaff,
  updateStaff,
  deleteStaff,
} from '../controllers/admin.controller';

const router = Router();

router.use(authenticate, authorize(['admin']));

router.get('/dashboard/stats', getDashboardStats);

router.get('/doctors', listDoctors);
router.post('/doctors', createDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

router.get('/patients', listPatients);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

router.get('/appointments', listAppointments);

router.post('/bills', createBill);
router.get('/bills', listBills);

router.post('/staff', createStaff);
router.get('/staff', listStaff);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

export default router;

