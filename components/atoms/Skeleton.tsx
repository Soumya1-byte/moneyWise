'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  count?: number;
  circle?: boolean;
}

export default function Skeleton({
  className,
  count = 1,
  circle = false,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'bg-gradient-to-r from-cream-dark/20 via-cream-dark/10 to-cream-dark/20',
            circle ? 'rounded-full' : 'rounded-xl',
            'h-4 w-full',
            className
          )}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      ))}
    </>
  );
}
