'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface DividerProps {
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'default' | 'light' | 'accent';
  margin?: 'sm' | 'md' | 'lg';
}

const Divider = ({ variant = 'solid', color = 'default', margin = 'md' }: DividerProps) => {
  const variants = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const colors = {
    default: 'border-navy/10',
    light: 'border-cream-dark/30',
    accent: 'border-money-green/30',
  };

  const margins = {
    sm: 'my-3',
    md: 'my-6',
    lg: 'my-8',
  };

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.4 }}
      className={cn('h-px border-t', variants[variant], colors[color], margins[margin])}
    />
  );
};

export default Divider;