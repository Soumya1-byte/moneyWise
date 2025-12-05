'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Tooltip from '@/components/atoms/Tooltip';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency' | 'percentage';
  showTooltip?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  format = 'number',
  showTooltip,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      const currentCount = Math.floor(from + (to - from) * progress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  const formatValue = (value: number) => {
    let formatted = value.toString();

    if (format === 'currency') {
      formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(value);
    } else if (format === 'percentage') {
      formatted = `${value}%`;
    } else {
      formatted = value.toLocaleString();
    }

    return `${prefix}${formatted}${suffix}`;
  };

  const content = (
    <motion.span
      className="font-mono font-bold text-money-green"
      key={count}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {formatValue(count)}
    </motion.span>
  );

  return showTooltip ? (
    <Tooltip content={showTooltip}>{content}</Tooltip>
  ) : (
    content
  );
}
