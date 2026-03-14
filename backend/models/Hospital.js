import mongoose from 'mongoose';

const hospitalDoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    availability: { type: Boolean, default: true }
  },
  { _id: false }
);

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true, trim: true },
    hospitalId: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    departmentsAvailable: [{ type: String, required: true }],
    totalBeds: { type: Number, default: 0 },
    availableBeds: { type: Number, default: 0 },
    icuBeds: { type: Number, default: 0 },
    emergencyBeds: { type: Number, default: 0 },
    doctorsList: [hospitalDoctorSchema],
    opdConsultationFee: { type: Number, default: 0 },
    serviceCharges: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Hospital', hospitalSchema);
