import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

export default function DoctorAvailabilityPage() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => { api.get('/doctors').then((r) => setDoctors(r.data)); }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Doctor Availability</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {doctors.map((doctor) => (
          <div className="card" key={doctor._id}>
            <p className="font-semibold">{doctor.name}</p>
            <p>{doctor.department}</p>
            <p className={doctor.availability ? 'text-green-600' : 'text-red-600'}>{doctor.availability ? 'Available' : 'Unavailable'}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
