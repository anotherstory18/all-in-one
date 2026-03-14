import Bed from '../models/Bed.js';

export const getBeds = async (_req, res) => {
  const beds = await Bed.find().sort({ bedNumber: 1 });
  return res.json(beds);
};

export const updateBedStatus = async (req, res) => {
  const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bed) return res.status(404).json({ message: 'Bed not found' });
  return res.json(bed);
};
