import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function ReceiptPage() {
  const [form, setForm] = useState({ patient: '', services: 'Consultation', totalAmount: 0, paymentStatus: 'Paid' });
  const [receipt, setReceipt] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, services: form.services.split(',').map((s) => s.trim()) };
    const { data } = await api.post('/billing/receipts', payload);
    setReceipt(data);
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Receipt Generation</h2>
      <form className="card max-w-2xl grid md:grid-cols-2 gap-3" onSubmit={submit}>
        {['patient', 'services', 'totalAmount'].map((k) => <input key={k} className="border p-2 rounded" placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required />)}
        <select className="border p-2 rounded" value={form.paymentStatus} onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}><option>Paid</option><option>Pending</option></select>
        <button className="bg-hospitalBlue text-white rounded py-2">Generate Receipt</button>
      </form>
      {receipt && (
        <div className="card mt-4">
          <p>Receipt #: {receipt.receiptNumber}</p>
          <a className="underline text-blue-700" href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/billing/receipts/${receipt._id}/pdf`} target="_blank">Download Receipt PDF</a>
        </div>
      )}
    </Layout>
  );
}
