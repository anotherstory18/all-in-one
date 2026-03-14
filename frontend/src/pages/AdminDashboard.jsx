import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import api from '../services/api';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  if (!stats) return <Layout><div className="card">Loading dashboard...</div></Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <KpiCard title="Patients Today" value={stats.patientsToday} />
        <KpiCard title="Revenue Today" value={`$${stats.totalRevenueToday}`} />
        <KpiCard title="Receipts" value={stats.receiptsGenerated} />
        <KpiCard title="OPD Queue Load" value={stats.opdQueueLoad} />
        <KpiCard title="Beds Occupied" value={`${stats.bedOccupancy.occupied}/${stats.bedOccupancy.total}`} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card"><Bar data={{ labels: ['Available', 'Occupied'], datasets: [{ label: 'Beds', data: [stats.bedOccupancy.available, stats.bedOccupancy.occupied], backgroundColor: ['#16a34a', '#dc2626'] }] }} /></div>
        <div className="card"><Doughnut data={{ labels: stats.doctorAvailability.map((d) => d.name), datasets: [{ data: stats.doctorAvailability.map((d) => d.availability ? 1 : 0), backgroundColor: ['#2563eb', '#60a5fa', '#1d4ed8'] }] }} /></div>
      </div>
    </Layout>
  );
}
