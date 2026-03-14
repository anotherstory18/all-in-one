import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const roleRoute = { admin: '/admin', receptionist: '/reception', doctor: '/doctor' };

export default function LoginPage() {
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      navigate(roleRoute[user.role]);
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <form className="card max-w-md w-full" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-hospitalBlue mb-4">Hospital Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input className="w-full border p-2 rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border p-2 rounded mb-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-hospitalBlue text-white rounded py-2">Login</button>
      </form>
    </div>
  );
}
