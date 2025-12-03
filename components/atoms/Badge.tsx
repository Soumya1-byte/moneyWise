'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Badge = ({ children, variant = 'info', size = 'md', icon }: BadgeProps) => {
  const variants = {
    success: 'bg-money-green/20 text-money-green border border-money-green/40',
    warning: 'bg-accent-yellow/30 text-yellow-700 border border-accent-yellow/50',
    danger: 'bg-red-100 text-red-700 border border-red-300',
    info: 'bg-blue-100 text-blue-700 border border-blue-300',
    neutral: 'bg-silver/30 text-navy border border-silver/60',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-semibold',
        variants[variant],
        sizes[size]
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.div>
  );
};

export default Badge;
