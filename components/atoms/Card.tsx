'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  glowEffect?: boolean;
}

const Card = ({ 
  children, 
  className, 
  variant = 'default', 
  hover = true,
  padding = 'md',
  glowEffect = false,
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-soft border border-cream-dark/20',
    glass: 'bg-white/70 backdrop-blur-xl shadow-soft border border-white/40',
    gradient: 'bg-gradient-to-br from-money-green via-money-green to-money-green-dark text-white shadow-elevation',
    elevated: 'bg-white shadow-elevation border border-cream-dark/10',
    minimal: 'bg-transparent hover:bg-cream/30 border-2 border-navy/10',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const hoverState = hover ? { 
    y: -6, 
    scale: 1.01,
    ...(glowEffect && { boxShadow: '0 0 24px rgba(0, 196, 106, 0.2)' })
  } : undefined;

  return (
    <motion.div
      className={cn(
        baseStyles, 
        variants[variant], 
        paddings[padding],
        glowEffect && 'shadow-glow-green',
        className
      )}
      whileHover={hoverState}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        duration: 0.2
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
