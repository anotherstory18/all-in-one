import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const emptyForm = {
  hospitalName: '',
  hospitalId: '',
  address: '',
  city: '',
  phoneNumber: '',
  departmentsAvailable: '',
  totalBeds: 0,
  availableBeds: 0,
  icuBeds: 0,
  emergencyBeds: 0,
  doctorsList: '',
  opdConsultationFee: 0,
  serviceCharges: 0
};

const parseDoctors = (doctorsList) =>
  doctorsList
    .split(',')
    .map((doctor) => doctor.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, department, availability] = entry.split('|').map((v) => v?.trim());
      return {
        name,
        department: department || 'General',
        availability: availability ? availability.toLowerCase() === 'true' : true
      };
    });

const toApiPayload = (form) => ({
  ...form,
  departmentsAvailable: form.departmentsAvailable,
  doctorsList: parseDoctors(form.doctorsList)
});

const toEditForm = (hospital) => ({
  hospitalName: hospital.hospitalName,
  hospitalId: hospital.hospitalId,
  address: hospital.address,
  city: hospital.city,
  phoneNumber: hospital.phoneNumber,
  departmentsAvailable: hospital.departmentsAvailable.join(', '),
  totalBeds: hospital.totalBeds,
  availableBeds: hospital.availableBeds,
  icuBeds: hospital.icuBeds,
  emergencyBeds: hospital.emergencyBeds,
  doctorsList: hospital.doctorsList.map((doc) => `${doc.name}|${doc.department}|${doc.availability}`).join(', '),
  opdConsultationFee: hospital.opdConsultationFee,
  serviceCharges: hospital.serviceCharges
});

export default function HospitalAdminPage() {
  const [hospitals, setHospitals] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);

  const loadHospitals = async () => {
    const { data } = await api.get('/hospitals');
    setHospitals(data);
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const payload = toApiPayload(form);

    if (editId) {
      await api.put(`/hospitals/${editId}`, payload);
    } else {
      await api.post('/hospitals', payload);
    }

    setForm(emptyForm);
    setEditId('');
    loadHospitals();
  };

  const handleDelete = async (id) => {
    await api.delete(`/hospitals/${id}`);
    if (selectedHospital?._id === id) {
      setSelectedHospital(null);
    }
    loadHospitals();
  };

  const startEdit = (hospital) => {
    setEditId(hospital._id);
    setForm(toEditForm(hospital));
    setSelectedHospital(hospital);
  };

  const hospitalStats = useMemo(() => {
    const total = hospitals.length;
    const totalBeds = hospitals.reduce((sum, hospital) => sum + Number(hospital.totalBeds || 0), 0);
    const availableBeds = hospitals.reduce((sum, hospital) => sum + Number(hospital.availableBeds || 0), 0);
    return { total, totalBeds, availableBeds };
  }, [hospitals]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Hospital Management Admin Module</h2>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="card"><p>Total Hospitals</p><p className="text-2xl font-bold text-hospitalBlue">{hospitalStats.total}</p></div>
        <div className="card"><p>Total Beds</p><p className="text-2xl font-bold text-hospitalBlue">{hospitalStats.totalBeds}</p></div>
        <div className="card"><p>Available Beds</p><p className="text-2xl font-bold text-green-600">{hospitalStats.availableBeds}</p></div>
      </div>

      <form onSubmit={submit} className="card grid md:grid-cols-3 gap-3 mb-5">
        <h3 className="md:col-span-3 text-xl font-semibold">{editId ? 'Edit Hospital' : 'Add Hospital'}</h3>
        {Object.keys(emptyForm).map((key) => (
          <input
            key={key}
            className="border rounded p-2"
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required={['hospitalName', 'hospitalId', 'address', 'city', 'phoneNumber'].includes(key)}
          />
        ))}
        <p className="md:col-span-3 text-xs text-slate-500">
          Doctors format: <b>Name|Department|true/false</b>, comma-separated (example: Dr A|Cardiology|true, Dr B|General|false)
        </p>
        <div className="md:col-span-3 flex gap-2">
          <button className="bg-hospitalBlue text-white rounded px-4 py-2">{editId ? 'Update Hospital' : 'Add Hospital'}</button>
          {editId && (
            <button
              type="button"
              className="bg-slate-200 rounded px-4 py-2"
              onClick={() => {
                setEditId('');
                setForm(emptyForm);
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="card overflow-auto">
        <h3 className="text-lg font-semibold mb-3">All Hospitals</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Hospital ID</th>
              <th>City</th>
              <th>Phone</th>
              <th>Beds</th>
              <th>ICU</th>
              <th>Emergency</th>
              <th>Consultation Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital._id} className="border-b">
                <td>{hospital.hospitalName}</td>
                <td>{hospital.hospitalId}</td>
                <td>{hospital.city}</td>
                <td>{hospital.phoneNumber}</td>
                <td>{hospital.availableBeds}/{hospital.totalBeds}</td>
                <td>{hospital.icuBeds}</td>
                <td>{hospital.emergencyBeds}</td>
                <td>{hospital.opdConsultationFee}</td>
                <td className="space-x-2">
                  <button className="text-blue-700 underline" onClick={() => setSelectedHospital(hospital)}>View</button>
                  <button className="text-amber-700 underline" onClick={() => startEdit(hospital)}>Edit</button>
                  <button className="text-red-700 underline" onClick={() => handleDelete(hospital._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedHospital && (
        <div className="card mt-4">
          <h3 className="text-lg font-semibold">Hospital Details</h3>
          <p><b>Name:</b> {selectedHospital.hospitalName}</p>
          <p><b>Address:</b> {selectedHospital.address}, {selectedHospital.city}</p>
          <p><b>Departments:</b> {selectedHospital.departmentsAvailable.join(', ')}</p>
          <p><b>Doctors:</b> {selectedHospital.doctorsList.map((doctor) => `${doctor.name} (${doctor.department})`).join(', ')}</p>
          <p><b>Service Charges:</b> {selectedHospital.serviceCharges}</p>
        </div>
      )}
    </Layout>
  );
}
