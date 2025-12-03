'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge = ({ children, variant = 'default', size = 'md', className }: BadgeProps) => {
  const variants = {
    success: 'bg-money-green/10 text-money-green border-money-green/20',
    warning: 'bg-accent-yellow/20 text-yellow-700 border-accent-yellow/30',
    info: 'bg-blue-50 text-blue-600 border-blue-200',
    default: 'bg-cream text-navy border-cream-dark',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
