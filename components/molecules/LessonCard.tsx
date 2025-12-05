'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import Chip from '@/components/atoms/Chip';
import XPBadge from './XPBadge';
import { cn } from '@/lib/utils/cn';

interface DifficultyBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  size?: 'sm' | 'md';
}

function DifficultyBadge({ level, size = 'md' }: DifficultyBadgeProps) {
  const configs = {
    beginner: { label: 'Beginner', color: 'success' as const },
    intermediate: { label: 'Intermediate', color: 'warning' as const },
    advanced: { label: 'Advanced', color: 'info' as const },
  };

  const config = configs[level];

  return (
    <Chip variant={config.color} size={size}>
      {config.label}
    </Chip>
  );
}

interface LessonCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  duration: number;
  icon?: string;
  progress?: number;
  isCompleted?: boolean;
  onClick?: () => void;
}

export default function LessonCard({
  title,
  description,
  difficulty,
  xpReward,
  duration,
  icon,
  progress = 0,
  isCompleted = false,
  onClick,
}: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card
        variant="default"
        padding="lg"
        hover
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          isCompleted && 'ring-2 ring-money-green ring-offset-2'
        )}
      >
        {/* Animated background glow for completed */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-money-green/10 to-transparent"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="relative z-10">
          {/* Header with icon and difficulty */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-3 bg-money-green/10 rounded-lg">
                  <Image
                    src={icon}
                    alt={title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-navy line-clamp-2">
                  {title}
                </h3>
              </div>
            </div>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-2 bg-money-green/20 rounded-full"
              >
                <Image
                  src="/assets/check.png"
                  alt="Completed"
                  width={20}
                  height={20}
                />
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-navy/70 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Metadata footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-dark/20">
            <div className="flex items-center gap-3">
              <DifficultyBadge level={difficulty} size="sm" />
              <span className="text-xs text-navy/60 font-medium">
                {duration} min
              </span>
            </div>
            <XPBadge xp={xpReward} size="sm" showAnimation={false} />
          </div>

          {/* Progress bar if in progress */}
          {progress > 0 && !isCompleted && (
            <motion.div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-navy/60">
                  Progress
                </span>
                <span className="text-xs font-bold text-money-green">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-cream-dark/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-money-green to-money-green-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
