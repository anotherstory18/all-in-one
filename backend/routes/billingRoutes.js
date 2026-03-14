import express from 'express';
import { createBill, downloadReceiptPdf, generateReceipt } from '../controllers/billingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/bills', protect, createBill);
router.post('/receipts', protect, generateReceipt);
router.get('/receipts/:id/pdf', protect, downloadReceiptPdf);

export default router;
