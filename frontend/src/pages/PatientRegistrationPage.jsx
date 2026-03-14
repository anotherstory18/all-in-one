import { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import api from '../services/api';

const initial = { name: '', age: '', gender: 'Male', phone: '', address: '', symptoms: '', department: 'General', emergency: false };

export default function PatientRegistrationPage() {
  const [form, setForm] = useState(initial);
  const [slip, setSlip] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/patients', form);
    setSlip(data);
    setForm(initial);
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
      <form onSubmit={submit} className="card grid md:grid-cols-2 gap-3">
        {['name', 'age', 'phone', 'address', 'symptoms', 'department'].map((f) => (
          <input key={f} className="border rounded p-2" placeholder={f} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} required />
        ))}
        <select className="border rounded p-2" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.emergency} onChange={(e) => setForm({ ...form, emergency: e.target.checked })} />Emergency Priority</label>
        <button className="bg-hospitalBlue text-white rounded py-2">Register</button>
      </form>
      {slip && (
        <div className="card mt-4">
          <p>Patient ID: <b>{slip.patient.patientId}</b></p>
          <p>Token Number: <b>{slip.queueEntry.tokenNumber}</b></p>
          <Link className="text-blue-700 underline" to="/opd-slip" state={slip}>Go to OPD Slip (Print)</Link>
        </div>
      )}
    </Layout>
  );
}
