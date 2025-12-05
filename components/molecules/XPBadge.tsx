'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface XPBadgeProps {
  xp: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export default function XPBadge({
  xp,
  label = 'XP',
  size = 'md',
  showAnimation = true,
}: XPBadgeProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const Wrapper = showAnimation ? motion.div : 'div';
  const animationProps = showAnimation
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold',
        'bg-gradient-to-r from-money-green/20 to-money-green/10',
        'border border-money-green/40 text-money-green',
        sizes[size]
      )}
      {...animationProps}
    >
      <Image
        src="/assets/xp.png"
        alt="XP"
        width={iconSizes[size]}
        height={iconSizes[size]}
        className="object-contain"
      />
      <span>{xp}</span>
      <span className="text-xs opacity-80">{label}</span>
    </Wrapper>
  );
}
