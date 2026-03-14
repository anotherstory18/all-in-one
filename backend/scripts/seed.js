import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Bed from '../models/Bed.js';
import Patient from '../models/Patient.js';
import QueueEntry from '../models/QueueEntry.js';
import Hospital from '../models/Hospital.js';

dotenv.config();
await connectDB();

await Promise.all([
  User.deleteMany(),
  Doctor.deleteMany(),
  Bed.deleteMany(),
  Patient.deleteMany(),
  QueueEntry.deleteMany(),
  Hospital.deleteMany()
]);

const doctors = await Doctor.insertMany([
  { name: 'Dr. Sarah Khan', department: 'Cardiology', specialization: 'Heart Specialist', availability: true, phone: '03001112222' },
  { name: 'Dr. Omar Ali', department: 'General', specialization: 'Physician', availability: true, phone: '03003334444' },
  { name: 'Dr. Ayesha Noor', department: 'Orthopedics', specialization: 'Bone Specialist', availability: false, phone: '03005556666' }
]);

await User.insertMany([
  { name: 'System Admin', email: 'admin@hospital.com', password: 'admin123', role: 'admin' },
  { name: 'Reception Desk', email: 'reception@hospital.com', password: 'recep123', role: 'receptionist' },
  { name: 'Dr. Sarah Khan', email: 'doctor@hospital.com', password: 'doctor123', role: 'doctor', doctorId: doctors[0]._id }
]);


await Hospital.insertMany([
  {
    hospitalName: 'City Care Hospital',
    hospitalId: 'HSP-001',
    address: '12 Main Boulevard',
    city: 'Lahore',
    phoneNumber: '042-12345678',
    departmentsAvailable: ['General', 'Cardiology', 'Orthopedics'],
    totalBeds: 120,
    availableBeds: 45,
    icuBeds: 20,
    emergencyBeds: 15,
    doctorsList: [
      { name: 'Dr. Sarah Khan', department: 'Cardiology', availability: true },
      { name: 'Dr. Omar Ali', department: 'General', availability: true }
    ],
    opdConsultationFee: 1500,
    serviceCharges: 500
  },
  {
    hospitalName: 'Metro Health Center',
    hospitalId: 'HSP-002',
    address: '45 Canal Road',
    city: 'Karachi',
    phoneNumber: '021-87654321',
    departmentsAvailable: ['General', 'Pediatrics', 'Emergency'],
    totalBeds: 90,
    availableBeds: 33,
    icuBeds: 14,
    emergencyBeds: 10,
    doctorsList: [
      { name: 'Dr. Ayesha Noor', department: 'Orthopedics', availability: false }
    ],
    opdConsultationFee: 1200,
    serviceCharges: 350
  }
]);

const beds = Array.from({ length: 12 }, (_, i) => ({
  bedNumber: `B-${i + 1}`,
  type: i < 3 ? 'ICU' : i < 5 ? 'emergency' : 'general',
  status: i % 4 === 0 ? 'occupied' : 'available'
}));
await Bed.insertMany(beds);

console.log('Seed data inserted successfully');
process.exit(0);
