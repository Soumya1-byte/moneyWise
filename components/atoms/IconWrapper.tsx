'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface IconWrapperProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const IconWrapper = ({ src, alt, size = 'md', className, animate = true }: IconWrapperProps) => {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const dimension = sizes[size];

  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: { scale: 1.1, rotate: 5 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  return (
    <Wrapper
      className={cn('relative inline-block', className)}
      {...animationProps}
    >
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        className="object-contain"
      />
    </Wrapper>
  );
};

export default IconWrapper;
