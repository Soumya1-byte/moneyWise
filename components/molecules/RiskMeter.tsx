'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import ProgressBar from '@/components/atoms/ProgressBar';
import { cn } from '@/lib/utils/cn';

interface RiskMeterProps {
  level: 'low' | 'medium' | 'high';
  percentage: number;
  title: string;
  description: string;
  recommendation?: string;
  className?: string;
}

const RiskMeter = ({
  level,
  percentage,
  title,
  description,
  recommendation,
  className,
}: RiskMeterProps) => {
  const colors = {
    low: {
      bg: 'bg-money-green/10',
      border: 'border-money-green',
      text: 'text-money-green',
      icon: '✅',
    },
    medium: {
      bg: 'bg-accent-yellow/20',
      border: 'border-accent-yellow',
      text: 'text-yellow-600',
      icon: '⚡',
    },
    high: {
      bg: 'bg-red-100/50',
      border: 'border-red-400',
      text: 'text-red-600',
      icon: '⚠️',
    },
  };

  const color = colors[level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card
        padding="lg"
        className={cn('border-2', color.bg, color.border)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-navy/60 font-semibold mb-1">{title}</p>
            <h3 className={cn('text-3xl font-bold', color.text)}>
              {level.toUpperCase()}
            </h3>
          </div>
          <span className="text-4xl">{color.icon}</span>
        </div>

        <p className="text-navy/70 mb-4 text-sm">{description}</p>

        <ProgressBar
          value={percentage}
          max={100}
          variant="gradient"
          showValue={true}
          size="md"
          className="mb-4"
        />

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 p-3 bg-white/50 rounded-lg border border-navy/10"
          >
            <p className="text-sm text-navy/70 font-medium">{recommendation}</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default RiskMeter;