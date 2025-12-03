'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import Badge from '@/components/atoms/Badge';
import ProgressBar from '@/components/molecules/ProgressBar';
import { cn } from '@/lib/utils/cn';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  progress: number;
  totalLessons: number;
  isLocked?: boolean;
  className?: string;
}

const LessonCard = ({
  id,
  title,
  description,
  icon,
  difficulty,
  xpReward,
  progress,
  totalLessons,
  isLocked = false,
  className,
}: LessonCardProps) => {
  const difficultyColors = {
    Beginner: 'success',
    Intermediate: 'warning',
    Advanced: 'info',
  } as const;

  const content = (
    <Card 
      className={cn(
        'group cursor-pointer relative overflow-hidden',
        isLocked && 'opacity-60 cursor-not-allowed',
        className
      )}
      hover={!isLocked}
    >
      <div className="flex items-start gap-4">
        <IconWrapper src={icon} alt={title} size="lg" animate={!isLocked} />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-navy group-hover:text-money-green transition-colors">
              {title}
            </h3>
            {isLocked && <span className="text-2xl">🔒</span>}
          </div>
          
          <p className="text-sm text-navy/70 mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={difficultyColors[difficulty]} size="sm">
              {difficulty}
            </Badge>
            <Badge variant="default" size="sm">
              +{xpReward} XP
            </Badge>
          </div>

          <ProgressBar 
            value={progress} 
            max={totalLessons} 
            label={`${progress}/${totalLessons} lessons`}
            showPercentage={false}
          />
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-money-green/0 via-money-green/5 to-money-green/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={false}
      />
    </Card>
  );

  if (isLocked) {
    return content;
  }

  return <Link href={`/learn/${id}`}>{content}</Link>;
};

export default LessonCard;
