'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import LearningPath from '@/components/organisms/LearningPath';
import PageTransition from '@/components/animations/PageTransition';
import Card from '@/components/atoms/Card';
import StatBox from '@/components/molecules/StatBox';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import { dailyTips } from '@/data/tips';
import Image from 'next/image';

export default function Dashboard() {
  const { user, setUser } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }
      try {
        const res = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLessons = async () => {
      try {
        const res = await fetch('/api/lessons');
        if (res.ok) {
          const data = await res.json();
          setLessons(data.lessons || []);
        }
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
      }
    };

    if (!user) fetchUser();
    else setIsLoading(false);

    fetchLessons();
  }, [user, router, setUser]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream-light to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 border-4 border-money-green border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const quickActions = [
    {
      icon: '/assets/lessons.png',
      title: 'Learn',
      desc: 'Explore financial topics',
      path: '/learn',
    },
    {
      icon: '/assets/quiz.png',
      title: 'Quiz',
      desc: 'Test your knowledge',
      path: '/quiz',
    },
    {
      icon: '/assets/budget-planner.png',
      title: 'Tools',
      desc: 'Budget & expense tracker',
      path: '/tools',
    },
    {
      icon: '/assets/mistake.png',
      title: 'Stories',
      desc: 'Learn from mistakes',
      path: '/stories',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Premium Dashboard Header */}
          <DashboardHeader
            userName={user.name || 'Learner'}
            totalXP={user.progress?.xp || 0}
            currentLevel={user.progress?.level || 1}
            streakDays={user.progress?.streakDays || 0}
            nextMilestone={user.progress?.nextMilestoneXP || 1000}
            onStartLearning={() => router.push('/learn')}
          />

          {/* Quick Actions Grid */}
          <motion.section
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-navy font-heading">
                Quick Start
              </h2>
              <p className="text-navy/60 mt-2">
                Jump into any activity to continue your journey
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              variants={staggerContainer}
            >
              {quickActions.map((action, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  onClick={() => router.push(action.path)}
                  className="cursor-pointer"
                >
                  <Card
                    variant="default"
                    padding="md"
                    hover
                    className="flex flex-col items-center text-center h-full"
                  >
                    <motion.div
                      className="mb-3"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Image
                        src={action.icon}
                        alt={action.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </motion.div>
                    <h3 className="font-bold text-sm md:text-base text-navy mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-navy/60">{action.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Learning Path Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mb-12"
          >
            <LearningPath
              lessons={lessons.slice(0, 6)}
              title="Your Learning Path"
              onLessonClick={(lessonId) => router.push(`/learn/${lessonId}`)}
            />
          </motion.div>

          {/* Stats Overview */}
          <motion.section
            className="mb-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-navy font-heading">
                Your Statistics
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <StatBox
                  label="Lessons Completed"
                  value={user.progress?.lessonsCompleted || 0}
                  icon="/assets/lesson.png"
                  trend={{
                    value: 2,
                    isPositive: true,
                  }}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatBox
                  label="Quizzes Passed"
                  value={user.progress?.quizzesCompleted || 0}
                  icon="/assets/quiz.png"
                  trend={{
                    value: 1,
                    isPositive: true,
                  }}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatBox
                  label="Badges Earned"
                  value={user.progress?.badges?.length || 0}
                  icon="/assets/badge.png"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <StatBox
                  label="Current Streak"
                  value={`${user.progress?.streakDays || 0} days`}
                  icon="/assets/lightbulb.png"
                  trend={{
                    value: user.progress?.streakDays || 0,
                    isPositive: true,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Daily Tip Card - Premium Style */}
          <motion.section
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card
                variant="glass"
                padding="lg"
                className="bg-gradient-to-br from-accent-yellow/20 via-white/40 to-accent-yellow/10 border-2 border-accent-yellow/30 relative overflow-hidden"
              >
                {/* Decorative blur elements */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-yellow/20 rounded-full blur-3xl" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-accent-yellow/10 rounded-full blur-2xl" />

                <div className="relative z-10 flex items-start gap-4 md:gap-6">
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Image
                      src="/assets/lightbulb.png"
                      alt="Tip"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3
                      className="text-xl md:text-2xl font-bold text-navy mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Daily Financial Tip
                    </motion.h3>
                    <motion.p
                      className="text-navy/75 text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {dailyTips[Math.floor(Math.random() * dailyTips.length)]}
                    </motion.p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
