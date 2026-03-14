import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientRegistrationPage from './pages/PatientRegistrationPage';
import OpdSlipPage from './pages/OpdSlipPage';
import QueueMonitorPage from './pages/QueueMonitorPage';
import DoctorAvailabilityPage from './pages/DoctorAvailabilityPage';
import EmergencyBedDashboard from './pages/EmergencyBedDashboard';
import BillingPage from './pages/BillingPage';
import ReceiptPage from './pages/ReceiptPage';
import ReportsPage from './pages/ReportsPage';
import HospitalAdminPage from './pages/HospitalAdminPage';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
      <Route path="/reception" element={<Protected><ReceptionistDashboard /></Protected>} />
      <Route path="/doctor" element={<Protected><DoctorDashboard /></Protected>} />
      <Route path="/patients/register" element={<Protected><PatientRegistrationPage /></Protected>} />
      <Route path="/opd-slip" element={<Protected><OpdSlipPage /></Protected>} />
      <Route path="/queue" element={<Protected><QueueMonitorPage /></Protected>} />
      <Route path="/doctor-availability" element={<Protected><DoctorAvailabilityPage /></Protected>} />
      <Route path="/beds" element={<Protected><EmergencyBedDashboard /></Protected>} />
      <Route path="/billing" element={<Protected><BillingPage /></Protected>} />
      <Route path="/receipt" element={<Protected><ReceiptPage /></Protected>} />
      <Route path="/reports" element={<Protected><ReportsPage /></Protected>} />
      <Route path="/hospitals" element={<Protected><HospitalAdminPage /></Protected>} />
    </Routes>
  );
}
