import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
  {
    bedNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['general', 'ICU', 'emergency'], required: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' }
  },
  { timestamps: true }
);

export default mongoose.model('Bed', bedSchema);
