import mongoose from 'mongoose';

const queueEntrySchema = new mongoose.Schema(
  {
    tokenNumber: { type: String, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    department: { type: String, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    status: {
      type: String,
      enum: ['waiting', 'in consultation', 'completed'],
      default: 'waiting'
    },
    estimatedWaitMinutes: { type: Number, default: 15 },
    priority: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('QueueEntry', queueEntrySchema);
