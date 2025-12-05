'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

interface RiskMeterProps {
  riskScore: number;
  volatility?: number;
  onAssessmentChange?: (score: number) => void;
}

export default function RiskChecker({
  riskScore = 45,
  volatility = 23.5,
}: RiskMeterProps) {
  const [inputAmount, setInputAmount] = useState('1000');

  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: 'Low Risk', color: 'money-green', icon: '🟢' };
    if (score < 60) return { level: 'Medium Risk', color: 'accent-yellow', icon: '🟡' };
    if (score < 85) return { level: 'High Risk', color: 'orange-500', icon: '🟠' };
    return { level: 'Very High Risk', color: 'red-500', icon: '🔴' };
  };

  const risk = getRiskLevel(riskScore);
  const potentialLoss = (parseFloat(inputAmount) || 0) * (volatility / 100);
  const potentialGain = (parseFloat(inputAmount) || 0) * (volatility / 100);

  return (
    <motion.div
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-3xl font-bold text-navy mb-2 font-heading">
          Crypto Risk Checker
        </h2>
        <p className="text-navy/60">
          Understand volatility and potential risks before investing
        </p>
      </motion.div>

      {/* Risk Meter Visual */}
      <motion.div variants={fadeInUp}>
        <Card variant="default" padding="lg">
          <div className="space-y-6">
            {/* Risk Gauge */}
            <div className="text-center">
              <motion.div
                className="relative w-40 h-40 mx-auto mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  {/* Background arc */}
                  <path
                    d="M 30 100 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Risk arcs */}
                  <path
                    d="M 30 100 A 70 70 0 0 1 70 35"
                    fill="none"
                    stroke="#00C46A"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 70 35 A 70 70 0 0 1 130 30"
                    fill="none"
                    stroke="#FFE28A"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 130 30 A 70 70 0 0 1 170 100"
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Needle */}
                  <motion.line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="40"
                    stroke="#0A1A2F"
                    strokeWidth="4"
                    strokeLinecap="round"
                    animate={{
                      rotate: riskScore * 1.8 - 90,
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ transformOrigin: '100px 100px' }}
                  />

                  {/* Center dot */}
                  <circle cx="100" cy="100" r="6" fill="#0A1A2F" />
                </svg>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className={`text-3xl font-bold text-${risk.color}`}>
                  {riskScore}
                </h3>
                <p className="text-navy/70 font-semibold mt-1">
                  {risk.level}
                </p>
              </motion.div>
            </div>

            {/* Risk Description */}
            <motion.div
              className="p-4 bg-cream/50 rounded-lg border border-navy/10"
              variants={fadeInUp}
            >
              <p className="text-sm text-navy/70 leading-relaxed">
                {riskScore < 30 &&
                  'This asset is relatively stable with low price volatility. Suitable for conservative investors seeking steady returns.'}
                {riskScore >= 30 &&
                  riskScore < 60 &&
                  'Moderate volatility. Good balance between risk and potential returns. Suitable for moderate investors.'}
                {riskScore >= 60 &&
                  riskScore < 85 &&
                  'High volatility. Significant price fluctuations possible. Only invest what you can afford to lose.'}
                {riskScore >= 85 &&
                  'Extreme volatility. Very speculative. High potential for significant losses. Only for experienced investors.'}
              </p>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Calculator */}
      <motion.div variants={fadeInUp}>
        <Card variant="default" padding="lg">
          <h3 className="text-lg font-bold text-navy mb-4">Risk Calculator</h3>

          <div className="space-y-4">
            {/* Input */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/60">
                  $
                </span>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-cream-dark/30 focus:border-money-green focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Results Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <p className="text-xs font-semibold text-green-700 mb-1 uppercase">
                  Best Case (Gain)
                </p>
                <p className="text-2xl font-bold text-green-600 font-mono">
                  +${potentialGain.toFixed(2)}
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <p className="text-xs font-semibold text-red-700 mb-1 uppercase">
                  Worst Case (Loss)
                </p>
                <p className="text-2xl font-bold text-red-600 font-mono">
                  -${potentialLoss.toFixed(2)}
                </p>
              </motion.div>
            </motion.div>

            {/* Current Volatility */}
            <motion.div
              className="p-4 bg-cream/50 rounded-lg"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-navy">Current Volatility</span>
                <span className="text-2xl font-bold text-money-green font-mono">
                  {volatility}%
                </span>
              </div>
              <p className="text-xs text-navy/60">
                This represents the average price fluctuation over the past month
              </p>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Warning Banner */}
      <motion.div
        variants={fadeInUp}
        className="p-4 bg-accent-yellow/20 border border-accent-yellow/40 rounded-lg flex items-start gap-3"
      >
        <Image
          src="/assets/warning.png"
          alt="Warning"
          width={24}
          height={24}
          className="flex-shrink-0 mt-0.5"
        />
        <div>
          <p className="font-semibold text-navy mb-1">Important Disclaimer</p>
          <p className="text-sm text-navy/70">
            This tool is for educational purposes only. Past performance does not guarantee
            future results. Always do your own research and never invest more than you can
            afford to lose.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
