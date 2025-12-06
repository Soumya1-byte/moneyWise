interface ActionCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function ActionCard({ title, description, icon, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-6 bg-white/50 backdrop-blur-md border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:border-[#2FCF89]/20"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-600">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}
