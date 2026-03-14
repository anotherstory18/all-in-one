export default function KpiCard({ title, value }) {
  return (
    <div className="card border-l-4 border-hospitalBlue">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-hospitalBlue">{value}</h3>
    </div>
  );
}
