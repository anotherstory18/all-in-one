import { Link, useNavigate } from 'react-router-dom';
import { FaBed, FaFileInvoiceDollar, FaHospital, FaNotesMedical, FaUserMd, FaUsers } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const menu = [
  { to: '/admin', label: 'Admin Dashboard', icon: <FaUsers /> },
  { to: '/reception', label: 'Reception Dashboard', icon: <FaNotesMedical /> },
  { to: '/doctor', label: 'Doctor Dashboard', icon: <FaUserMd /> },
  { to: '/beds', label: 'Beds', icon: <FaBed /> },
  { to: '/hospitals', label: 'Hospitals', icon: <FaHospital /> },
  { to: '/billing', label: 'Billing', icon: <FaFileInvoiceDollar /> }
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:flex">
      <aside className="bg-hospitalBlue text-white p-4 w-full md:w-72">
        <h1 className="text-xl font-bold mb-6">🏥 Smart Hospital</h1>
        <div className="space-y-2">
          {menu.map((item) => (
            <Link key={item.to} className="flex items-center gap-2 p-2 rounded hover:bg-blue-700" to={item.to}>
              {item.icon}
              {item.label}
            </Link>
          ))}
          <button
            className="mt-6 w-full rounded bg-white text-hospitalBlue px-4 py-2 font-semibold"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Logout ({user?.role})
          </button>
        </div>
      </aside>
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
}
