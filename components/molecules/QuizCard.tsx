'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import Chip from '@/components/atoms/Chip';
import { cn } from '@/lib/utils/cn';

interface QuizCardProps {
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  timeLimit: number;
  icon?: string;
  isCompleted?: boolean;
  score?: number;
  onClick?: () => void;
}

export default function QuizCard({
  title,
  description,
  questionCount,
  difficulty,
  xpReward,
  timeLimit,
  icon,
  isCompleted = false,
  score,
  onClick,
}: QuizCardProps) {
  const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'success' },
    intermediate: { label: 'Intermediate', color: 'warning' },
    advanced: { label: 'Advanced', color: 'info' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card
        variant="default"
        padding="lg"
        className={cn(
          'relative overflow-hidden',
          isCompleted && 'ring-2 ring-money-green ring-offset-2'
        )}
      >
        {/* Completed glow */}
        {isCompleted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-money-green/10 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-3 bg-accent-yellow/20 rounded-lg">
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
                <h3 className="text-lg font-bold text-navy">{title}</h3>
              </div>
            </div>
            {isCompleted && (
              <motion.div
                className="px-3 py-1.5 bg-money-green/20 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-xs font-bold text-money-green">
                  {score}%
                </span>
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-navy/70 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Footer metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-cream-dark/20">
            <div className="flex items-center gap-2 flex-wrap">
              <Chip variant={difficultyConfig[difficulty].color as any} size="sm">
                {difficultyConfig[difficulty].label}
              </Chip>
              <span className="text-xs text-navy/60">
                {questionCount} Q
              </span>
              <span className="text-xs text-navy/60">
                {timeLimit} min
              </span>
            </div>
            <motion.div
              className="px-3 py-1.5 rounded-full font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 196, 106, 0.2), rgba(0, 196, 106, 0.1))',
                color: '#00C46A',
              }}
            >
              <span className="text-sm font-bold">+{xpReward} XP</span>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
