'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import AnimatedCounter from '@/components/molecules/AnimatedCounter';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

interface DashboardHeaderProps {
  userName: string;
  totalXP: number;
  currentLevel: number;
  streakDays: number;
  nextMilestone: number;
  onStartLearning?: () => void;
}

export default function DashboardHeader({
  userName,
  totalXP,
  currentLevel,
  streakDays,
  nextMilestone,
  onStartLearning,
}: DashboardHeaderProps) {
  const xpToNextLevel = nextMilestone - totalXP;

  return (
    <motion.div
      className="space-y-6 mb-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Welcome Section */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-navy mb-2 font-heading"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Welcome back, {userName}
            </motion.h1>
            <p className="text-lg text-navy/60">
              Keep up the great progress on your financial journey
            </p>
          </div>
          <motion.div
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-money-green/20 to-money-green/5 p-1 hidden md:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Image
                src="/assets/trophy.png"
                alt="Progress"
                width={40}
                height={40}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Total XP */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <motion.div
              className="text-sm font-semibold text-navy/70 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Total XP
            </motion.div>
            <motion.div
              className="text-2xl md:text-3xl font-bold text-money-green font-mono"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 17 }}
            >
              <AnimatedCounter to={totalXP} duration={2} />
            </motion.div>
          </Card>
        </motion.div>

        {/* Current Level */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Card
            variant="gradient"
            padding="md"
            className="text-center text-white"
          >
            <motion.div
              className="text-sm font-semibold opacity-90 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Level
            </motion.div>
            <motion.div
              className="text-2xl md:text-3xl font-bold font-mono"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 17 }}
            >
              {currentLevel}
            </motion.div>
          </Card>
        </motion.div>

        {/* Streak */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <motion.div
              className="text-sm font-semibold text-navy/70 mb-2 flex items-center justify-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>Streak</span>
              <Image
                src="/assets/lightbulb.png"
                alt="Fire"
                width={16}
                height={16}
              />
            </motion.div>
            <motion.div
              className="text-2xl md:text-3xl font-bold text-orange-500 font-mono"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 17 }}
            >
              {streakDays}
            </motion.div>
          </Card>
        </motion.div>

        {/* Next Milestone */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <motion.div
              className="text-xs font-semibold text-navy/70 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              To Next Level
            </motion.div>
            <motion.div
              className="text-xl md:text-2xl font-bold text-money-green font-mono"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 17 }}
            >
              {Math.max(0, xpToNextLevel)}
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Daily Tip + CTA */}
      <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6">
        {/* Tip Card */}
        <Card variant="glass" padding="md" className="md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent-yellow/20 rounded-lg flex-shrink-0">
              <Image
                src="/assets/lightbulb.png"
                alt="Tip"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">Daily Tip</h3>
              <p className="text-sm text-navy/70">
                Start with an emergency fund. It should cover 3-6 months of living expenses. This protects you from unexpected financial emergencies.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Button */}
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            fullWidth
            onClick={onStartLearning}
            className="h-full"
          >
            Start Learning
          </Button>
        </motion.div>
      </motion.div>

      {/* Progress Bar to Next Level */}
      <motion.div variants={fadeInUp}>
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-cream-dark/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-navy">
              Progress to Level {currentLevel + 1}
            </span>
            <span className="text-xs font-bold text-money-green">
              {Math.round(((nextMilestone - xpToNextLevel) / nextMilestone) * 100)}%
            </span>
          </div>
          <div className="relative h-3 bg-cream-dark/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-money-green to-money-green-light rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  ((nextMilestone - xpToNextLevel) / nextMilestone) * 100,
                  100
                )}%`,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
