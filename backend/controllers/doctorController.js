import Doctor from '../models/Doctor.js';
import QueueEntry from '../models/QueueEntry.js';

export const getDoctors = async (_req, res) => {
  const doctors = await Doctor.find().sort({ name: 1 });
  return res.json(doctors);
};

export const getDoctorQueue = async (req, res) => {
  const queue = await QueueEntry.find({ doctor: req.params.id }).populate('patient').sort({ createdAt: 1 });
  return res.json(queue);
};
