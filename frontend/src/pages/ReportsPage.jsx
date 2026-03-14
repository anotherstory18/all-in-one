import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportsPage() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    api.get('/admin/reports').then((r) => setReports(r.data));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      {!reports ? <div className="card">Loading...</div> : (
        <>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            <div className="card">Daily Patients: {reports.dailyPatients}</div>
            <div className="card">Daily Revenue: {reports.dailyRevenue}</div>
            <div className="card">Doctor Workload Entries: {reports.doctorWorkload.length}</div>
          </div>
          <div className="card max-w-lg">
            <Pie data={{ labels: reports.bedUtilization.map((b) => b._id), datasets: [{ data: reports.bedUtilization.map((b) => b.count), backgroundColor: ['#22c55e', '#ef4444'] }] }} />
          </div>
          <button className="mt-4 bg-hospitalBlue text-white px-4 py-2 rounded" onClick={() => window.print()}>Download/Print Report</button>
        </>
      )}
    </Layout>
  );
}
