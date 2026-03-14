import express from 'express';
import { getPatients, registerPatient, searchPatient } from '../controllers/patientController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, authorize('receptionist', 'admin'), registerPatient);
router.get('/', protect, getPatients);
router.get('/search/:patientId', protect, searchPatient);

export default router;
