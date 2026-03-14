import Patient from '../models/Patient.js';
import Bill from '../models/Bill.js';
import Doctor from '../models/Doctor.js';
import Bed from '../models/Bed.js';
import Receipt from '../models/Receipt.js';
import QueueEntry from '../models/QueueEntry.js';
import Hospital from '../models/Hospital.js';

export const dashboardStats = async (_req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [patientsToday, revenueAgg, doctors, queueLoad, beds, receiptsToday, hospitals] = await Promise.all([
    Patient.countDocuments({ createdAt: { $gte: today } }),
    Bill.aggregate([{ $match: { createdAt: { $gte: today } } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    Doctor.find(),
    QueueEntry.countDocuments({ status: { $ne: 'completed' } }),
    Bed.find(),
    Receipt.countDocuments({ createdAt: { $gte: today } }),
    Hospital.find()
  ]);

  const occupiedBeds = beds.filter((b) => b.status === 'occupied').length;
  const hospitalTotals = hospitals.reduce((acc, h) => {
    acc.totalBeds += h.totalBeds || 0;
    acc.availableBeds += h.availableBeds || 0;
    acc.icuBeds += h.icuBeds || 0;
    acc.emergencyBeds += h.emergencyBeds || 0;
    return acc;
  }, { totalBeds: 0, availableBeds: 0, icuBeds: 0, emergencyBeds: 0 });

  return res.json({
    patientsToday,
    totalRevenueToday: revenueAgg[0]?.total || 0,
    doctorAvailability: doctors.map((d) => ({ name: d.name, availability: d.availability })),
    opdQueueLoad: queueLoad,
    bedOccupancy: { total: beds.length, occupied: occupiedBeds, available: beds.length - occupiedBeds },
    receiptsGenerated: receiptsToday,
    hospitalsManaged: hospitals.length,
    hospitalBedSummary: hospitalTotals
  });
};

export const reports = async (_req, res) => {
  const [dailyPatients, dailyRevenue, doctorWorkload, bedUtilization, hospitalCount] = await Promise.all([
    Patient.countDocuments(),
    Bill.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    QueueEntry.aggregate([{ $group: { _id: '$doctor', patients: { $sum: 1 } } }]),
    Bed.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Hospital.countDocuments()
  ]);

  return res.json({
    dailyPatients,
    dailyRevenue: dailyRevenue[0]?.total || 0,
    doctorWorkload,
    bedUtilization,
    hospitalCount
  });
};
