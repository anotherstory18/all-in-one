import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    symptoms: { type: String, required: true },
    department: { type: String, required: true },
    emergency: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);
