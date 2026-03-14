import Patient from '../models/Patient.js';
import QueueEntry from '../models/QueueEntry.js';

const buildPatientId = () => `PAT-${Date.now()}`;
const buildToken = (department) => `${department.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

export const registerPatient = async (req, res) => {
  const payload = { ...req.body, patientId: buildPatientId() };
  const patient = await Patient.create(payload);

  const queueEntry = await QueueEntry.create({
    tokenNumber: buildToken(patient.department),
    patient: patient._id,
    department: patient.department,
    priority: patient.emergency ? 1 : 0,
    estimatedWaitMinutes: patient.emergency ? 5 : 20
  });

  return res.status(201).json({ patient, queueEntry, opdSlip: { patientId: patient.patientId, token: queueEntry.tokenNumber } });
};

export const getPatients = async (_req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 }).limit(200);
  return res.json(patients);
};

export const searchPatient = async (req, res) => {
  const patient = await Patient.findOne({ patientId: req.params.patientId });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  return res.json(patient);
};
