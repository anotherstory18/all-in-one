import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import QueueTable from '../components/QueueTable';
import api from '../services/api';

export default function QueueMonitorPage() {
  const [department, setDepartment] = useState('');
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    api.get(`/queue${department ? `?department=${department}` : ''}`).then((r) => setQueue(r.data));
  }, [department]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Smart OPD Queue</h2>
      <select className="border p-2 rounded mb-3" value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        <option value="General">General</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Orthopedics">Orthopedics</option>
      </select>
      <QueueTable queue={queue} />
    </Layout>
  );
}
