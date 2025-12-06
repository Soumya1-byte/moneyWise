interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`rounded-2xl p-6 bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.05)] ${hover ? 'transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.01]' : ''} ${className}`}>
      {children}
    </div>
  );
}
