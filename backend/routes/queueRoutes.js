import express from 'express';
import { getQueue, nextPatientForDoctor, updateQueueStatus } from '../controllers/queueController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getQueue);
router.patch('/:id', protect, updateQueueStatus);
router.post('/next', protect, nextPatientForDoctor);

export default router;
