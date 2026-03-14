import QueueEntry from '../models/QueueEntry.js';

export const getQueue = async (req, res) => {
  const { department } = req.query;
  const query = department ? { department } : {};
  const queue = await QueueEntry.find(query)
    .populate('patient')
    .populate('doctor')
    .sort({ priority: -1, createdAt: 1 });
  return res.json(queue);
};

export const updateQueueStatus = async (req, res) => {
  const entry = await QueueEntry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('patient')
    .populate('doctor');
  if (!entry) return res.status(404).json({ message: 'Queue entry not found' });
  return res.json(entry);
};

export const nextPatientForDoctor = async (req, res) => {
  const { doctorId, department } = req.body;
  const next = await QueueEntry.findOneAndUpdate(
    { doctor: doctorId, department, status: 'waiting' },
    { status: 'in consultation' },
    { sort: { priority: -1, createdAt: 1 }, new: true }
  ).populate('patient');
  return res.json(next);
};
