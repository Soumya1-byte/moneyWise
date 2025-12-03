'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import { useAnimatedCounter } from '@/lib/hooks/useAnimatedCounter';
import { cn } from '@/lib/utils/cn';

interface StatBoxProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

const StatBox = ({ icon, label, value, suffix = '', trend, trendValue, className }: StatBoxProps) => {
  const animatedValue = useAnimatedCounter(value, 1500);

  return (
    <Card className={cn('relative overflow-hidden', className)} padding="md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-navy/60 mb-1">{label}</p>
          <motion.p 
            className="text-3xl font-bold text-navy font-mono"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {animatedValue}{suffix}
          </motion.p>
          {trend && trendValue && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-sm font-medium',
              trend === 'up' ? 'text-money-green' : 'text-red-500'
            )}>
              <span>{trend === 'up' ? '↑' : '↓'}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <IconWrapper src={icon} alt={label} size="lg" />
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-money-green/5 rounded-full blur-2xl" />
    </Card>
  );
};

export default StatBox;
