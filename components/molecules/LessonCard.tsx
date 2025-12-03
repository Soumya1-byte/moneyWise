'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import Badge from '@/components/atoms/Badge';
import ProgressBar from '@/components/atoms/ProgressBar';
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
      glowEffect={!isLocked}
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={!isLocked ? { scale: 1.05, rotate: 5 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <IconWrapper src={icon} alt={title} size="lg" animate={!isLocked} />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-navy group-hover:text-money-green transition-colors duration-200">
              {title}
            </h3>
            {isLocked && <span className="text-xl">🔐</span>}
          </div>
          
          <p className="text-sm text-navy/70 mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge variant={difficultyColors[difficulty]} size="sm">
              {difficulty}
            </Badge>
            <Badge variant="neutral" size="sm">
              +{xpReward} XP
            </Badge>
          </div>

          <ProgressBar 
            value={progress} 
            max={totalLessons} 
            label={`${progress}/${totalLessons} lessons`}
            variant="animated"
            size="sm"
          />
        </div>
      </div>

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
