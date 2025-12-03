'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import { cn } from '@/lib/utils/cn';

interface RiskMeterProps {
  value: number;
  maxValue?: number;
  label?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

const RiskMeter = ({
  value,
  maxValue = 100,
  label = 'Risk Level',
  riskLevel = 'medium',
  className,
}: RiskMeterProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const riskColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  };

  const riskBg = {
    low: 'from-green-500 to-green-600',
    medium: 'from-yellow-500 to-yellow-600',
    high: 'from-orange-500 to-orange-600',
    critical: 'from-red-500 to-red-600',
  };

  return (
    <Card className={cn('relative overflow-hidden', className)} padding="lg">
      <h3 className="text-lg font-semibold text-navy mb-6">{label}</h3>

      <div className="flex items-center gap-8">
        {/* Speedometer-style gauge */}
        <div className="flex-1">
          <div className="relative w-40 h-40 mx-auto">
            {/* Background arc */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
                strokeDasharray="141 282"
                strokeDashoffset="0"
              />
              {/* Progress arc */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="141 282"
                initial={{ strokeDashoffset: 141 }}
                animate={{ strokeDashoffset: 141 - (percentage / 100) * 141 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={cn('transition-colors', riskColors[riskLevel])}
              />
            </svg>

            {/* Center value */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-navy font-mono">
                  {Math.round(value)}
                </div>
                <div className={cn('text-sm font-semibold capitalize', riskColors[riskLevel])}>
                  {riskLevel}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Risk details */}
        <div className="flex-1 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-3 bg-cream/50 rounded-lg"
          >
            <p className="text-xs font-semibold text-navy/60 mb-1">Current Risk</p>
            <p className={cn('text-lg font-bold', riskColors[riskLevel])}>
              {Math.round(percentage)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-3 bg-gradient-to-r ${riskBg[riskLevel]} bg-opacity-10 rounded-lg border border-current border-opacity-20`}
          >
            <p className="text-xs font-semibold text-navy/60 mb-1">Classification</p>
            <p className={cn('text-sm font-semibold capitalize', riskColors[riskLevel])}>
              {riskLevel === 'critical' ? 'High Risk' : riskLevel}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Recommended action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-3 bg-money-green/10 border border-money-green/30 rounded-lg"
      >
        <p className="text-xs font-semibold text-money-green/80 mb-1">Recommendation</p>
        <p className="text-sm text-navy">
          {riskLevel === 'critical' && 'Consider diversifying your investments.'}
          {riskLevel === 'high' && 'Monitor your portfolio regularly.'}
          {riskLevel === 'medium' && 'Your risk level is balanced.'}
          {riskLevel === 'low' && 'Your investments are well-protected.'}
        </p>
      </motion.div>
    </Card>
  );
};

export default RiskMeter;