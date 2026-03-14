import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    consultationFee: { type: Number, default: 0 },
    labTestCharges: { type: Number, default: 0 },
    medicineCharges: { type: Number, default: 0 },
    otherServices: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Bill', billSchema);
