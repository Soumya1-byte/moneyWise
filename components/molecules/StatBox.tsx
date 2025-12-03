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
  variant?: 'default' | 'colored' | 'glass';
}

const StatBox = ({ 
  icon, 
  label, 
  value, 
  suffix = '', 
  trend, 
  trendValue, 
  className,
  variant = 'default'
}: StatBoxProps) => {
  const animatedValue = useAnimatedCounter(value, 1500);

  const variants = {
    default: '',
    colored: 'bg-gradient-to-br from-money-green/10 to-money-green/5 border border-money-green/20',
    glass: 'bg-white/50 backdrop-blur-sm border border-white/40',
  };

  return (
    <Card 
      className={cn('relative overflow-hidden', className, variants[variant])} 
      padding="md"
      glowEffect={variant === 'colored'}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-navy/60 mb-1 font-medium">{label}</p>
          <motion.p 
            className="text-3xl md:text-4xl font-bold text-navy font-mono"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {animatedValue}{suffix}
          </motion.p>
          {trend && trendValue && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                'flex items-center gap-1 mt-2 text-sm font-semibold',
                trend === 'up' ? 'text-money-green' : 'text-red-500'
              )}
            >
              <span className="text-lg">{trend === 'up' ? '↗' : '↘'}</span>
              <span>{trendValue}</span>
            </motion.div>
          )}
        </div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <IconWrapper src={icon} alt={label} size="lg" />
        </motion.div>
      </div>
      
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-money-green/5 rounded-full blur-2xl" />
    </Card>
  );
};

export default StatBox;
