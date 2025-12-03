'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <motion.label
            className="block text-sm font-medium text-navy mb-2"
            animate={{ color: isFocused ? '#00C46A' : '#0A1A2F' }}
          >
            {label}
          </motion.label>
        )}
        <motion.input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-money-green/20 focus:border-money-green',
            'placeholder:text-silver',
            error ? 'border-red-500' : 'border-cream-dark',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{ scale: isFocused ? 1.01 : 1 }}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          required={props.required}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
