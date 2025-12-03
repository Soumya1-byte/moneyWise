'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'animated' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
}

const ProgressBar = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = true,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variants = {
    default: 'bg-money-green',
    animated: 'bg-gradient-to-r from-money-green to-money-green-light',
    gradient: 'bg-gradient-to-r from-money-green via-money-green-light to-money-green-dark',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-semibold text-navy">{label}</span>}
          {showValue && <span className="text-sm font-mono text-navy/70">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-cream rounded-full overflow-hidden shadow-inner-soft', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('h-full rounded-full shadow-glow-green', variants[variant])}
        />
      </div>
    </div>
  );
};

export default ProgressBar;