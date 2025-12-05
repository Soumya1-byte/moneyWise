'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ChipProps {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'primary';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Chip({
  children,
  className,
  variant = 'default',
  size = 'md',
  icon,
  onClose,
}: ChipProps) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200';

  const variants = {
    default: 'bg-cream/70 text-navy border border-cream-dark/20',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    primary: 'bg-money-green/10 text-money-green border border-money-green/30',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };

  return (
    <motion.div
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onClose && (
        <motion.button
          onClick={onClose}
          className="ml-1 hover:opacity-70 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ✕
        </motion.button>
      )}
    </motion.div>
  );
}
