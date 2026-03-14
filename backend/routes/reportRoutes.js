import express from 'express';
import { dashboardStats, reports } from '../controllers/reportController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/dashboard', protect, authorize('admin'), dashboardStats);
router.get('/reports', protect, authorize('admin'), reports);

export default router;
