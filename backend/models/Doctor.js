import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    specialization: { type: String, required: true },
    availability: { type: Boolean, default: true },
    phone: String
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
