'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import LearningPath from '@/components/organisms/LearningPath';
import PageTransition from '@/components/animations/PageTransition';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import Image from 'next/image';

export default function Learn() {
  const router = useRouter();
  const { user } = useStore();

  // Transform lessons data to match LearningPath component
  const transformedLessons = lessons.flatMap((module) =>
    module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.content?.substring(0, 100) || 'Learn about this financial topic',
      difficulty: 'beginner' as const,
      xpReward: lesson.xp || 100,
      duration: 15,
      icon: '/assets/lesson.png',
      progress: user?.progress?.completedLessons?.includes(lesson.id) ? 100 : 0,
      isCompleted: user?.progress?.completedLessons?.includes(lesson.id) || false,
    }))
  );

  const completedCount = transformedLessons.filter((l) => l.isCompleted).length;
  const totalCount = transformedLessons.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Premium Header with Progress */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold text-navy mb-2 font-heading">
                    Learning Modules
                  </h1>
                  <p className="text-lg text-navy/60 max-w-3xl leading-relaxed">
                    Master financial literacy step by step. Start from the basics or jump to advanced topics.
                    Learn at your own pace with interactive lessons and quizzes.
                  </p>
                </div>

                {/* Progress Circle */}
                <motion.div
                  className="hidden md:flex flex-col items-center gap-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-24 h-24">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#00C46A"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 45 * (1 - completionPercentage / 100)
                        }`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{
                          strokeDashoffset: `${
                            2 * Math.PI * 45 * (1 - completionPercentage / 100)
                          }`,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-navy">
                        {completionPercentage}%
                      </span>
                      <span className="text-xs text-navy/60">Complete</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Filter/Sort Chips */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mt-6">
              <Chip variant="primary">
                {completedCount} Completed
              </Chip>
              <Chip variant="default">
                {totalCount} Total
              </Chip>
              <Chip variant="info">
                {transformedLessons.reduce((sum, l) => sum + l.xpReward, 0)} XP Available
              </Chip>
            </motion.div>
          </motion.div>

          {/* Learning Path Component */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <LearningPath
              lessons={transformedLessons}
              title="Your Learning Journey"
              onLessonClick={(lessonId) => router.push(`/learn/${lessonId}`)}
            />
          </motion.div>

          {/* Recommended Next Steps */}
          {completedCount > 0 && (
            <motion.section
              className="mt-16"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <h2 className="text-3xl font-bold text-navy mb-2 font-heading">
                  Continue Your Journey
                </h2>
                <p className="text-navy/60">
                  Take quizzes to test your knowledge and earn bonus XP
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                {/* Quiz CTA */}
                <motion.div variants={fadeInUp}>
                  <Card
                    variant="default"
                    padding="lg"
                    hover
                    className="cursor-pointer h-full"
                    onClick={() => router.push('/quiz')}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-accent-yellow/20 rounded-lg flex-shrink-0">
                        <Image
                          src="/assets/quiz.png"
                          alt="Quiz"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-navy mb-2">
                          Take a Quiz
                        </h3>
                        <p className="text-sm text-navy/70 mb-4">
                          Test your knowledge on completed topics and earn XP rewards
                        </p>
                        <motion.div className="flex items-center gap-2 text-money-green font-semibold text-sm">
                          <span>Start Quiz</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Tools CTA */}
                <motion.div variants={fadeInUp}>
                  <Card
                    variant="default"
                    padding="lg"
                    hover
                    className="cursor-pointer h-full"
                    onClick={() => router.push('/tools')}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-money-green/10 rounded-lg flex-shrink-0">
                        <Image
                          src="/assets/budget-planner.png"
                          alt="Tools"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-navy mb-2">
                          Use Financial Tools
                        </h3>
                        <p className="text-sm text-navy/70 mb-4">
                          Apply what you learned with real-world budget and risk calculators
                        </p>
                        <motion.div className="flex items-center gap-2 text-money-green font-semibold text-sm">
                          <span>Explore Tools</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.section>
          )}

          {/* Empty State */}
          {transformedLessons.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 mt-12"
            >
              <Image
                src="/assets/lesson.png"
                alt="No lessons"
                width={64}
                height={64}
                className="mx-auto mb-6 opacity-50"
              />
              <p className="text-2xl font-bold text-navy mb-2">No modules available yet</p>
              <p className="text-navy/60 mb-6">
                Check back soon for new learning content!
              </p>
              <Button variant="secondary" size="md" onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
