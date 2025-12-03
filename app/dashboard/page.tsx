'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/atoms/Card';
import StatBox from '@/components/molecules/StatBox';
import IconWrapper from '@/components/atoms/IconWrapper';
import PageTransition from '@/components/animations/PageTransition';
import { dailyTips } from '@/data/tips';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function Dashboard() {
  const { user, setUser } = useStore();
  const router = useRouter();
  const [tip, setTip] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/');
      }
    };
    if (!user) fetchUser();
    setTip(dailyTips[Math.floor(Math.random() * dailyTips.length)]);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-money-green border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const quickActions = [
    { icon: '/assets/lessons.png', title: 'Continue Learning', desc: 'Explore lessons on money, investing, and more', path: '/learn' },
    { icon: '/assets/quiz.png', title: 'Take a Quiz', desc: 'Test your knowledge and earn XP', path: '/quiz' },
    { icon: '/assets/budget-planner.png', title: 'Use Tools', desc: 'Budget planner, expense tracker, and more', path: '/tools' },
    { icon: '/assets/warning.png', title: 'Read Stories', desc: 'Learn from real financial mistakes', path: '/stories' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />
        
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-2 font-heading">
              Welcome back, {user.name}
            </h1>
            <p className="text-navy/60 text-lg">Let's continue your financial learning journey</p>
          </motion.div>

          {/* Stats Grid */}
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
                trend="up"
                trendValue="+2 this week"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatBox
                icon="/assets/xp.png"
                label="Total XP"
                value={user.progress?.xp || 0}
                suffix=" XP"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <StatBox
                icon="/assets/badge.png"
                label="Badges Earned"
                value={user.progress?.badges?.length || 0}
              />
            </motion.div>
          </motion.div>

          {/* Daily Tip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Card 
              variant="glass" 
              className="bg-gradient-to-r from-accent-yellow/20 to-accent-yellow-light/20 border-2 border-accent-yellow/30"
            >
              <div className="flex items-start gap-4">
                <IconWrapper src="/assets/lightbulb.png" alt="Daily Tip" size="lg" />
                <div>
                  <h3 className="font-bold text-xl mb-2 text-navy">Daily Financial Tip</h3>
                  <p className="text-navy/80 leading-relaxed">{tip}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold text-navy mb-6 font-heading">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.map((action, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card
                    onClick={() => router.push(action.path)}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <IconWrapper src={action.icon} alt={action.title} size="lg" />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-navy group-hover:text-money-green transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-navy/60">{action.desc}</p>
                      </div>
                      <motion.span
                        className="text-money-green text-2xl"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
