'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: number;
  xpReward: number;
  completed?: boolean;
  score?: number;
  className?: string;
}

const QuizCard = ({
  id,
  title,
  description,
  icon,
  questions,
  xpReward,
  completed = false,
  score,
  className,
}: QuizCardProps) => {
  return (
    <Link href={`/quiz/${id}`}>
      <Card 
        className={cn('group cursor-pointer relative overflow-hidden', className)}
        hover={true}
        glowEffect={!completed}
      >
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <IconWrapper src={icon} alt={title} size="lg" animate={true} />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg md:text-xl font-bold text-navy group-hover:text-money-green transition-colors duration-200">
                {title}
              </h3>
              {completed && (
                <motion.span 
                  className="text-green-500 text-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  ✓
                </motion.span>
              )}
            </div>
            
            <p className="text-sm text-navy/70 mb-3">{description}</p>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="info" size="sm">
                {questions} questions
              </Badge>
              <Badge variant="success" size="sm">
                +{xpReward} XP
              </Badge>
              {completed && score !== undefined && (
                <Badge variant="warning" size="sm">
                  {score}%
                </Badge>
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-money-green/0 via-money-green/5 to-money-green/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={false}
        />
      </Card>
    </Link>
  );
};

export default QuizCard;
