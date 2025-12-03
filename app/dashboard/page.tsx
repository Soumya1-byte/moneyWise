'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatBox from '@/components/molecules/StatBox';
import ProgressTracker from '@/components/molecules/ProgressTracker';
import IconWrapper from '@/components/atoms/IconWrapper';
import PageTransition from '@/components/animations/PageTransition';
import { dailyTips } from '@/data/tips';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function Dashboard() {
  const { user, setUser } = useStore();
  const router = useRouter();
  const [tip, setTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
    if (!user) fetchUser();
    else setIsLoading(false);
    setTip(dailyTips[Math.floor(Math.random() * dailyTips.length)]);
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
    { icon: '/assets/lessons.png', title: 'Continue Learning', desc: 'Explore lessons on money, investing, and more', path: '/learn' },
    { icon: '/assets/quiz.png', title: 'Take a Quiz', desc: 'Test your knowledge and earn XP', path: '/quiz' },
    { icon: '/assets/budget-planner.png', title: 'Use Tools', desc: 'Budget planner, expense tracker, and more', path: '/tools' },
    { icon: '/assets/mistake.png', title: 'Read Stories', desc: 'Learn from real financial mistakes', path: '/stories' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Premium Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-heading">
                Welcome back
              </h1>
              <motion.span
                className="text-3xl md:text-4xl text-money-green"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {user.name}
              </motion.span>
            </div>
            <p className="text-lg text-navy/60 font-medium">Let's continue your financial learning journey</p>
          </motion.div>

          {/* Enhanced Stats Grid with Stagger Animation */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <StatBox
                icon="/assets/level.png"
                label="Your Level"
                value={user.progress?.level || 1}
                suffix=" 🏆"
                trend="up"
                trendValue="+2 this week"
                variant="colored"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatBox
                icon="/assets/xp.png"
                label="Total XP"
                value={user.progress?.xp || 0}
                suffix=" ✨"
                variant="colored"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatBox
                icon="/assets/badge.png"
                label="Badges Earned"
                value={user.progress?.badges?.length || 0}
                variant="colored"
              />
            </motion.div>
          </motion.div>

          {/* Premium Daily Tip Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-12"
          >
            <Card 
              variant="glass" 
              className="bg-gradient-to-r from-accent-yellow/20 via-accent-yellow/10 to-accent-yellow-light/20 border-2 border-accent-yellow/40 relative overflow-hidden"
              padding="lg"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <IconWrapper src="/assets/lightbulb.png" alt="Daily Tip" size="lg" glow={false} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3 
                    className="font-bold text-xl md:text-2xl mb-3 text-navy"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Daily Financial Tip
                  </motion.h3>
                  <motion.p 
                    className="text-navy/80 leading-relaxed text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {tip}
                  </motion.p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent-yellow/10 rounded-full blur-3xl" />
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-accent-yellow/5 rounded-full blur-2xl" />
            </Card>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 font-heading">Quick Actions</h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {quickActions.map((action, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card
                    onClick={() => router.push(action.path)}
                    className="cursor-pointer group h-full hover:shadow-hard"
                    padding="lg"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <IconWrapper src={action.icon} alt={action.title} size="xl" animate={true} />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-navy group-hover:text-money-green transition-colors duration-200">
                          {action.title}
                        </h3>
                        <p className="text-sm text-navy/60">{action.desc}</p>
                      </div>
                      <motion.div
                        className="text-money-green text-2xl mt-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6 font-heading">Your Learning Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ProgressTracker
                current={user.progress?.lessonsCompleted || 0}
                total={user.progress?.totalLessons || 10}
                label="Lessons Completed"
                variant="linear"
                milestones={[
                  { step: 0, label: 'Just Started' },
                  { step: 5, label: 'Getting Comfortable' },
                  { step: 10, label: 'Becoming an Expert' },
                ]}
              />
              <ProgressTracker
                current={user.progress?.quizzesCompleted || 0}
                total={user.progress?.totalQuizzes || 8}
                label="Quizzes Completed"
                variant="linear"
                milestones={[
                  { step: 0, label: 'Not Started' },
                  { step: 4, label: 'Halfway There' },
                  { step: 8, label: 'Quiz Master' },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
