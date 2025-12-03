'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ProgressBar from '@/components/atoms/ProgressBar';
import { cn } from '@/lib/utils/cn';

interface ProgressTrackerProps {
  current: number;
  total: number;
  label?: string;
  milestones?: Array<{ step: number; label: string }>;
  className?: string;
  variant?: 'linear' | 'circular';
}

const ProgressTracker = ({
  current,
  total,
  label = 'Progress',
  milestones,
  className,
  variant = 'linear',
}: ProgressTrackerProps) => {
  const percentage = (current / total) * 100;

  if (variant === 'circular') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={cn('flex flex-col items-center gap-4', className)}>
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#f0ede5"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C46A" />
                <stop offset="100%" stopColor="#00E67E" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold text-navy font-mono">{current}</div>
              <div className="text-xs text-navy/60">of {total}</div>
            </motion.div>
          </div>
        </div>

        {label && <p className="text-sm font-semibold text-navy">{label}</p>}
      </div>
    );
  }

  return (
    <Card className={className} padding="lg">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-navy">{label}</h3>
          <motion.span
            className="text-2xl font-bold text-money-green font-mono"
            key={current}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {current}/{total}
          </motion.span>
        </div>

        <ProgressBar value={current} max={total} showValue={false} variant="gradient" />

        {milestones && (
          <div className="mt-6 space-y-2">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'flex items-center gap-3 p-2 rounded-lg transition-colors',
                  current >= milestone.step
                    ? 'bg-money-green/10 border border-money-green/30'
                    : 'bg-cream/30 border border-cream-dark/20'
                )}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    current >= milestone.step
                      ? 'bg-money-green text-white'
                      : 'bg-silver text-navy/60'
                  )}
                >
                  {current >= milestone.step ? '✓' : milestone.step}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    current >= milestone.step ? 'text-navy' : 'text-navy/60'
                  )}
                >
                  {milestone.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressTracker;