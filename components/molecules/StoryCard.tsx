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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Card 
        className={cn('group cursor-pointer h-full', className)}
        onClick={onClick}
        hover={true}
        glowEffect={true}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Badge variant="warning" size="sm" className="mb-4">
            {category}
          </Badge>
          
          <h3 className="text-lg md:text-xl font-bold text-navy mb-3 group-hover:text-money-green transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-navy/70 mb-4 line-clamp-3 leading-relaxed">{preview}</p>
          
          <motion.div
            className="bg-gradient-to-r from-accent-yellow/20 to-accent-yellow/10 border-l-4 border-accent-yellow p-4 rounded-lg"
            whileHover={{ backgroundColor: 'rgba(255, 226, 138, 0.15)' }}
          >
            <p className="text-sm font-medium text-navy leading-relaxed">
              <span className="text-lg mr-2">💡</span>
              {lesson}
            </p>
          </motion.div>

          <motion.div
            className="mt-4 text-money-green text-sm font-semibold flex items-center gap-2"
            whileHover={{ x: 4 }}
          >
            <span>Read full story</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default StoryCard;
