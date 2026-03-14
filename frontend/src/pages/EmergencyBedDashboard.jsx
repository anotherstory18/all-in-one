import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function EmergencyBedDashboard() {
  const [beds, setBeds] = useState([]);
  const load = () => api.get('/beds').then((r) => setBeds(r.data));
  useEffect(() => { load(); }, []);

  const stats = useMemo(() => ({
    total: beds.length,
    available: beds.filter((b) => b.status === 'available').length,
    occupied: beds.filter((b) => b.status === 'occupied').length,
    icu: beds.filter((b) => b.type === 'ICU').length,
    emergency: beds.filter((b) => b.type === 'emergency').length
  }), [beds]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Emergency Bed Dashboard</h2>
      <div className="grid md:grid-cols-5 gap-3 mb-4">
        {Object.entries(stats).map(([k, v]) => <div key={k} className="card"><p className="capitalize">{k}</p><p className="font-bold text-xl">{v}</p></div>)}
      </div>
      <div className="grid md:grid-cols-4 gap-3">
        {beds.map((bed) => (
          <div key={bed._id} className={`card border-2 ${bed.status === 'available' ? 'border-green-500' : 'border-red-500'}`}>
            <p className="font-semibold">{bed.bedNumber}</p>
            <p>{bed.type}</p>
            <p className={bed.status === 'available' ? 'text-green-600' : 'text-red-600'}>{bed.status}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
