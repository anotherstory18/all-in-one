import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function BillingPage() {
  const [form, setForm] = useState({ patient: '', consultationFee: 0, labTestCharges: 0, medicineCharges: 0, otherServices: 0 });
  const [bill, setBill] = useState(null);

  const total = Number(form.consultationFee) + Number(form.labTestCharges) + Number(form.medicineCharges) + Number(form.otherServices);

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/billing/bills', { ...form, totalAmount: total });
    setBill(data);
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Billing</h2>
      <form onSubmit={submit} className="card max-w-2xl grid md:grid-cols-2 gap-3">
        {['patient', 'consultationFee', 'labTestCharges', 'medicineCharges', 'otherServices'].map((k) => (
          <input key={k} className="border p-2 rounded" placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required />
        ))}
        <div className="md:col-span-2 font-semibold">Total: {total}</div>
        <button className="bg-hospitalBlue text-white rounded py-2">Create Bill</button>
      </form>
      {bill && <div className="card mt-4">Bill created with total: {bill.totalAmount} <button onClick={() => window.print()} className="underline text-blue-700">Print Bill</button></div>}
    </Layout>
  );
}
