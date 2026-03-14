import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import QueueTable from '../components/QueueTable';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);

  const loadQueue = () => api.get(`/doctors/${user.doctorId}/queue`).then((r) => setQueue(r.data));
  useEffect(() => { if (user?.doctorId) loadQueue(); }, [user]);

  const markStatus = async (id, status) => {
    await api.patch(`/queue/${id}`, { status });
    loadQueue();
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
      <QueueTable queue={queue} />
      <div className="mt-4 grid gap-2">
        {queue.map((entry) => (
          <div className="card flex flex-wrap items-center justify-between" key={entry._id}>
            <div>
              <p className="font-semibold">{entry.patient?.name}</p>
              <p className="text-sm">Notes: add consultation notes in EMR.</p>
            </div>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white rounded px-3 py-1" onClick={() => markStatus(entry._id, 'in consultation')}>In Consultation</button>
              <button className="bg-green-600 text-white rounded px-3 py-1" onClick={() => markStatus(entry._id, 'completed')}>Completed</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
