export default function QueueTable({ queue = [] }) {
  return (
    <div className="card overflow-auto">
      <h3 className="font-semibold mb-2">Queue Monitor</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Token</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((row) => (
            <tr key={row._id} className="border-b">
              <td>{row.tokenNumber}</td>
              <td>{row.patient?.name}</td>
              <td className="capitalize">{row.status}</td>
              <td>{row.doctor?.name || 'Unassigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
