'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import { cn } from '@/lib/utils/cn';

interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: { value: number; isPositive: boolean };
  variant?: 'default' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatBox({
  label,
  value,
  icon,
  trend,
  variant = 'default',
  size = 'md',
}: StatBoxProps) {
  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const textSizes = {
    sm: { label: 'text-xs', value: 'text-xl' },
    md: { label: 'text-sm', value: 'text-2xl' },
    lg: { label: 'text-base', value: 'text-3xl' },
  };

  const variants = {
    default: 'bg-white border border-cream-dark/20',
    gradient: 'bg-gradient-to-br from-money-green/10 to-money-green/5 border border-money-green/20',
    glass: 'bg-white/40 backdrop-blur-xl border border-white/60',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Card variant="default" padding={sizes[size] as any} className={variants[variant]}>
        <div className="flex items-start justify-between mb-3">
          {icon && (
            <motion.div
              className="p-2.5 bg-money-green/10 rounded-lg"
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              <Image
                src={icon}
                alt={label}
                width={24}
                height={24}
                className="object-contain"
              />
            </motion.div>
          )}
          {trend && (
            <motion.div
              className={cn(
                'text-xs font-bold px-2 py-1 rounded-full',
                trend.isPositive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              )}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </motion.div>
          )}
        </div>

        <motion.div
          className={cn(
            'font-mono font-bold text-money-green',
            textSizes[size].value
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {value}
        </motion.div>

        <p className={cn('text-navy/70 mt-2', textSizes[size].label)}>
          {label}
        </p>
      </Card>
    </motion.div>
  );
}
