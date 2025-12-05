'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ProgressBar from '@/components/atoms/ProgressBar';
import { cn } from '@/lib/utils/cn';

interface Milestone {
  step: number;
  label: string;
}

interface ProgressTrackerProps {
  current: number;
  total: number;
  label: string;
  variant?: 'linear' | 'circular';
  milestones?: Milestone[];
  className?: string;
}

const ProgressTracker = ({
  current,
  total,
  label,
  variant = 'linear',
  milestones = [],
  className,
}: ProgressTrackerProps) => {
  const percentage = Math.min((current / total) * 100, 100);
  const getMilestoneMessage = () => {
    if (!milestones.length) return '';
    const currentMilestone = milestones.find((m) => current <= m.step);
    return currentMilestone?.label || milestones[milestones.length - 1].label;
  };

  if (variant === 'circular') {
    return (
      <Card padding="lg" className={cn('text-center', className)}>
        <p className="text-sm text-navy/60 font-semibold mb-4">{label}</p>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-cream-dark/20"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-money-green"
              strokeDasharray={314}
              initial={{ strokeDashoffset: 314 }}
              animate={{ strokeDashoffset: 314 - (314 * percentage) / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-navy font-mono">{current}</p>
              <p className="text-xs text-navy/60">of {total}</p>
            </div>
          </div>
        </div>

        <p className="text-xl font-bold text-navy mb-2">
          {Math.round(percentage)}%
        </p>
        {getMilestoneMessage() && (
          <p className="text-sm text-money-green font-semibold">
            {getMilestoneMessage()}
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card padding="lg" className={className}>
      <div className="flex justify-between items-baseline mb-4">
        <p className="text-sm text-navy/60 font-semibold">{label}</p>
        <motion.span
          className="text-2xl font-bold text-money-green font-mono"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {current}/{total}
        </motion.span>
      </div>

      <ProgressBar
        value={current}
        max={total}
        variant="animated"
        showValue={false}
        size="md"
      />

      {getMilestoneMessage() && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-money-green font-semibold mt-3"
        >
          {getMilestoneMessage()}
        </motion.p>
      )}
    </Card>
  );
};

export default ProgressTracker;