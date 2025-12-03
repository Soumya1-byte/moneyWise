'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  color?: 'green' | 'yellow' | 'blue';
}

const ProgressBar = ({ 
  value, 
  max, 
  label, 
  showPercentage = true, 
  className,
  color = 'green'
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    green: 'bg-money-green',
    yellow: 'bg-accent-yellow',
    blue: 'bg-blue-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-navy">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-mono text-navy">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-cream rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', colors[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
