'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface GlassCardProps {
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
  padding = 'md',
  hover = true,
}: GlassCardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-soft transition-all duration-300',
        paddings[padding],
        hover && 'hover:bg-white/50 hover:border-white/80 hover:shadow-medium',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
