import Hospital from '../models/Hospital.js';

const normalizePayload = (body) => {
  const payload = { ...body };

  if (typeof payload.departmentsAvailable === 'string') {
    payload.departmentsAvailable = payload.departmentsAvailable
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof payload.doctorsList === 'string') {
    payload.doctorsList = payload.doctorsList
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((doctorName) => ({ name: doctorName, department: 'General', availability: true }));
  }

  return payload;
};

export const createHospital = async (req, res) => {
  const payload = normalizePayload(req.body);
  const hospital = await Hospital.create(payload);
  return res.status(201).json(hospital);
};

export const getHospitals = async (_req, res) => {
  const hospitals = await Hospital.find().sort({ createdAt: -1 });
  return res.json(hospitals);
};

export const getHospitalById = async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);
  if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
  return res.json(hospital);
};

export const updateHospital = async (req, res) => {
  const payload = normalizePayload(req.body);
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
  return res.json(hospital);
};

export const deleteHospital = async (req, res) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);
  if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
  return res.json({ message: 'Hospital deleted' });
};

export const updateHospitalBeds = async (req, res) => {
  const { availableBeds, icuBeds, emergencyBeds, totalBeds } = req.body;
  const hospital = await Hospital.findByIdAndUpdate(
    req.params.id,
    { availableBeds, icuBeds, emergencyBeds, totalBeds },
    { new: true, runValidators: true }
  );
  if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
  return res.json(hospital);
};

export const updateHospitalDoctorsAndCharges = async (req, res) => {
  const { doctorsList, departmentsAvailable, opdConsultationFee, serviceCharges } = normalizePayload(req.body);
  const hospital = await Hospital.findByIdAndUpdate(
    req.params.id,
    { doctorsList, departmentsAvailable, opdConsultationFee, serviceCharges },
    { new: true, runValidators: true }
  );
  if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
  return res.json(hospital);
};
