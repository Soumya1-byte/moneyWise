interface PortfolioChartProps {
  data: { date: string; value: number }[];
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  
  return (
    <div className="w-full h-48 relative">
      <svg className="w-full h-full" viewBox="0 0 400 100">
        <polyline
          points={data.map((d, i) => {
            const x = (i / (data.length - 1)) * 400;
            const y = 100 - ((d.value - min) / (max - min)) * 80;
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#2FCF89"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
