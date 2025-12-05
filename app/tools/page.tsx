'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import BudgetPlanner from '@/components/organisms/BudgetPlanner';
import RiskChecker from '@/components/organisms/RiskChecker';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import PageTransition from '@/components/animations/PageTransition';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import Image from 'next/image';

type ToolType = 'overview' | 'budget' | 'risk';

export default function Tools() {
  const [activeTool, setActiveTool] = useState<ToolType>('overview');

  const toolCards = [
    {
      id: 'budget',
      title: 'Budget Planner',
      description: 'Plan your spending using the proven 50-30-20 rule. Allocate your income wisely across needs, wants, and savings.',
      icon: '/assets/budget-planner.png',
      benefits: ['50-30-20 allocation', 'Real-time tracking', 'Smart recommendations'],
    },
    {
      id: 'risk',
      title: 'Crypto Risk Checker',
      description: 'Assess investment risk relative to your income. Get personalized guidance on safe investment amounts.',
      icon: '/assets/risk-checker.png',
      benefits: ['Risk assessment', 'Volatility analysis', 'Safe limits'],
    },
  ];

  if (activeTool !== 'overview') {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
          <Navbar />

          <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                size="md"
                onClick={() => setActiveTool('overview')}
                className="gap-2"
              >
                ← Back to Tools
              </Button>
            </motion.div>

            {/* Tool Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTool === 'budget' && <BudgetPlanner />}
              {activeTool === 'risk' && <RiskChecker riskScore={45} volatility={23.5} />}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Overview State
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Premium Header */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-6xl font-bold text-navy mb-3 font-heading">
                Financial Tools
              </h1>
              <p className="text-lg text-navy/60 max-w-3xl leading-relaxed">
                Take control of your finances with powerful, easy-to-use tools. Learn best practices while planning your budget and assessing investment risks.
              </p>
            </motion.div>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {toolCards.map((tool) => (
              <motion.div
                key={tool.id}
                variants={fadeInUp}
                onClick={() => setActiveTool(tool.id as ToolType)}
                className="cursor-pointer group"
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover
                  className="relative overflow-hidden h-full flex flex-col transition-all duration-300"
                >
                  {/* Decorative background elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-money-green/5 rounded-full blur-3xl group-hover:bg-money-green/10 transition-colors duration-300" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-money-green/5 rounded-full blur-2xl group-hover:bg-money-green/10 transition-colors duration-300" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      className="p-4 bg-money-green/10 rounded-lg w-fit mb-6"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Image
                        src={tool.icon}
                        alt={tool.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </motion.div>

                    {/* Title & Description */}
                    <motion.div
                      className="mb-4 flex-1"
                      whileHover={{ x: 4 }}
                    >
                      <h3 className="text-2xl font-bold text-navy mb-2 font-heading">
                        {tool.title}
                      </h3>
                      <p className="text-navy/70 leading-relaxed">
                        {tool.description}
                      </p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div className="mb-6 space-y-2">
                      {tool.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-sm text-navy/70"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-money-green" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center gap-2 text-money-green font-semibold group-hover:text-money-green-dark transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <span>Open Tool</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Educational Section */}
          <motion.section
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-bold text-navy mb-8 font-heading">
                How to Use These Tools
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={staggerContainer}
            >
              {/* Budget Planner Guide */}
              <motion.div variants={fadeInUp}>
                <Card variant="glass" padding="lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-money-green/10 rounded-lg flex-shrink-0">
                      <Image
                        src="/assets/lightbulb.png"
                        alt="Tip"
                        width={24}
                        height={24}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-navy">
                      Budget Planning Tips
                    </h3>
                  </div>
                  <ul className="space-y-3 text-navy/70 text-sm">
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">1.</span>
                      <span>Enter your monthly income to get started</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">2.</span>
                      <span>Follow the 50-30-20 rule as a guideline</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">3.</span>
                      <span>Adjust categories based on your lifestyle</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">4.</span>
                      <span>Track spending monthly and adjust as needed</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* Risk Checker Guide */}
              <motion.div variants={fadeInUp}>
                <Card variant="glass" padding="lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent-yellow/20 rounded-lg flex-shrink-0">
                      <Image
                        src="/assets/warning.png"
                        alt="Warning"
                        width={24}
                        height={24}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-navy">
                      Safe Investment Guide
                    </h3>
                  </div>
                  <ul className="space-y-3 text-navy/70 text-sm">
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">✓</span>
                      <span>Low Risk: 0-5% of your monthly income</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-accent-yellow flex-shrink-0">⚡</span>
                      <span>Medium Risk: 5-10% of your monthly income</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-red-500 flex-shrink-0">⚠️</span>
                      <span>High Risk: 10%+ of your monthly income</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-money-green flex-shrink-0">•</span>
                      <span>Always keep 3-6 months emergency fund first</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Important Notice */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 p-6 bg-accent-yellow/20 border-2 border-accent-yellow/40 rounded-2xl flex items-start gap-4"
          >
            <Image
              src="/assets/lightbulb.png"
              alt="Info"
              width={32}
              height={32}
              className="flex-shrink-0 mt-1"
            />
            <div>
              <p className="font-bold text-navy mb-1">Educational Disclaimer</p>
              <p className="text-navy/70 text-sm">
                These tools are for educational purposes only and should not be considered as financial advice. 
                Always do your own research and consult with a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
