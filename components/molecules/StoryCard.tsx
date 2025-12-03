'use client';

import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';

interface StoryCardProps {
  title: string;
  category: string;
  preview: string;
  lesson: string;
  className?: string;
  onClick?: () => void;
}

const StoryCard = ({ title, category, preview, lesson, className, onClick }: StoryCardProps) => {
  return (
    <Card 
      className={cn('group cursor-pointer', className)}
      onClick={onClick}
    >
      <Badge variant="warning" size="sm" className="mb-3">
        {category}
      </Badge>
      
      <h3 className="text-xl font-semibold text-navy mb-2 group-hover:text-money-green transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-navy/70 mb-4 line-clamp-3">{preview}</p>
      
      <div className="bg-accent-yellow/10 border-l-4 border-accent-yellow p-3 rounded">
        <p className="text-sm font-medium text-navy">
          <span className="text-accent-yellow mr-2">💡</span>
          {lesson}
        </p>
      </div>

      <motion.div
        className="mt-4 text-money-green text-sm font-medium flex items-center gap-2"
        whileHover={{ x: 4 }}
      >
        Read full story
        <span>→</span>
      </motion.div>
    </Card>
  );
};

export default StoryCard;
