import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

export default function OpdSlipPage() {
  const { state } = useLocation();
  const slip = state?.opdSlip;

  return (
    <Layout>
      <div className="card max-w-xl">
        <h2 className="text-xl font-bold text-hospitalBlue">OPD Slip</h2>
        {slip ? (
          <>
            <p>Patient ID: {slip.patientId}</p>
            <p>Token: {slip.token}</p>
            <button className="mt-3 bg-hospitalBlue text-white px-3 py-2 rounded" onClick={() => window.print()}>Print Slip</button>
          </>
        ) : <p>No slip data available.</p>}
      </div>
    </Layout>
  );
}
