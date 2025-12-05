'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import LessonCard from '@/components/molecules/LessonCard';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  duration: number;
  icon?: string;
  progress?: number;
  isCompleted?: boolean;
}

interface LearningPathProps {
  lessons: Lesson[];
  title?: string;
  onLessonClick?: (lessonId: string) => void;
}

export default function LearningPath({
  lessons,
  title = 'Your Learning Path',
  onLessonClick,
}: LearningPathProps) {
  return (
    <motion.section
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl font-bold text-navy mb-2 font-heading">
          {title}
        </h2>
        <p className="text-navy/60">
          Master financial literacy one lesson at a time. Start with the basics and progress to advanced topics.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <LessonCard
              {...lesson}
              onClick={() => onLessonClick?.(lesson.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {lessons.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-navy/60">No lessons available yet.</p>
        </motion.div>
      )}
    </motion.section>
  );
}
