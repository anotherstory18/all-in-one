import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema(
  {
    receiptNumber: { type: String, required: true, unique: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    services: [{ type: String }],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
    paymentDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Receipt', receiptSchema);
