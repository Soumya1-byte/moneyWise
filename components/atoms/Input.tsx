'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'minimal';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, variant = 'default', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 rounded-xl font-body transition-all duration-200 focus:outline-none';
    
    const variants = {
      default: 'bg-cream/50 border-2 border-cream-dark/30 text-navy placeholder:text-navy/40 focus:border-money-green focus:bg-white focus:shadow-glow-green',
      minimal: 'bg-transparent border-b-2 border-navy/20 text-navy placeholder:text-navy/40 focus:border-money-green',
    };

    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {label && (
          <label className="block text-sm font-semibold text-navy mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/50">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              baseStyles,
              variants[variant],
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:shadow-none',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-2 font-medium"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
