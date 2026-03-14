import express from 'express';
import { getDoctorQueue, getDoctors } from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getDoctors);
router.get('/:id/queue', protect, getDoctorQueue);

export default router;
