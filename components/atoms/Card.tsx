'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className, 
  variant = 'default', 
  hover = true,
  padding = 'md',
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-soft hover:shadow-medium',
    glass: 'bg-white/80 backdrop-blur-md shadow-soft border border-white/20',
    gradient: 'bg-gradient-to-br from-money-green to-money-green-dark text-white shadow-glow-green',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverAnimation = hover ? {
    whileHover: { y: -4, scale: 1.01 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  return (
    <motion.div
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
