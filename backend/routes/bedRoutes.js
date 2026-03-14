import express from 'express';
import { getBeds, updateBedStatus } from '../controllers/bedController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getBeds);
router.patch('/:id', protect, authorize('admin'), updateBedStatus);

export default router;
