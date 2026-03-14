import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function ReceptionistDashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Receptionist Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/patients/register" className="card hover:shadow-lg">Patient Registration</Link>
        <Link to="/queue" className="card hover:shadow-lg">Queue Monitor</Link>
        <Link to="/billing" className="card hover:shadow-lg">Billing + Receipt</Link>
      </div>
    </Layout>
  );
}
