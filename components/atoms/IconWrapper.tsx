'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';

interface IconWrapperProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  animate?: boolean;
  colorOverlay?: string;
  glow?: boolean;
}

const IconWrapper = ({ 
  src, 
  alt, 
  size = 'md', 
  className, 
  animate = true,
  colorOverlay,
  glow = false
}: IconWrapperProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const sizes = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    xxl: 96,
  };

  const dimension = sizes[size];

  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.8 },
    animate: isLoaded ? { opacity: 1, scale: 1 } : {},
    whileHover: { scale: 1.1, rotate: 5 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  } : {};

  const shadowClass = glow ? 'shadow-glow-green' : '';

  return (
    <Wrapper
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg',
        colorOverlay && 'bg-gradient-to-br from-money-green/10 to-money-green/5',
        shadowClass,
        className
      )}
      {...animationProps}
    >
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        onLoad={() => setIsLoaded(true)}
        className="object-contain filter drop-shadow-sm hover:drop-shadow-md transition-all"
        priority={false}
        quality={85}
      />
    </Wrapper>
  );
};

export default IconWrapper;
