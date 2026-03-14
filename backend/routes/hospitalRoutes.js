import express from 'express';
import {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital,
  updateHospitalBeds,
  updateHospitalDoctorsAndCharges
} from '../controllers/hospitalController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospitalById).put(updateHospital).delete(deleteHospital);
router.patch('/:id/beds', updateHospitalBeds);
router.patch('/:id/settings', updateHospitalDoctorsAndCharges);

export default router;
