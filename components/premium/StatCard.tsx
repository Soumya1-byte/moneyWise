interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl p-6 bg-white/50 backdrop-blur-md border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <h2 className="text-4xl font-semibold text-gray-900 mb-1">{value}</h2>
      {trend && <p className="text-xs text-gray-400">{trend}</p>}
    </div>
  );
}
