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
      <Card className={cn('group cursor-pointer relative', className)}>
        <div className="flex items-start gap-4">
          <IconWrapper src={icon} alt={title} size="lg" />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-navy group-hover:text-money-green transition-colors">
                {title}
              </h3>
              {completed && <span className="text-2xl">✓</span>}
            </div>
            
            <p className="text-sm text-navy/70 mb-3">{description}</p>
            
            <div className="flex items-center gap-2">
              <Badge variant="info" size="sm">
                {questions} questions
              </Badge>
              <Badge variant="success" size="sm">
                +{xpReward} XP
              </Badge>
              {completed && score !== undefined && (
                <Badge variant="warning" size="sm">
                  Score: {score}%
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Completion overlay */}
        {completed && (
          <motion.div
            className="absolute top-2 right-2 w-8 h-8 bg-money-green rounded-full flex items-center justify-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            ✓
          </motion.div>
        )}
      </Card>
    </Link>
  );
};

export default QuizCard;
