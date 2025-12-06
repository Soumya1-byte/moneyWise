'use client';

import { useEffect, useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import { useStore } from '@/store/useStore';

export default function HealthScore() {
  const { user } = useStore();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (user) {
      const learningScore = (user.progress?.completedLessons?.length || 0) * 2;
      const quizScore = (user.progress?.completedQuizzes?.length || 0) * 5;
      const total = Math.min(100, 20 + learningScore + quizScore);
      setScore(total);
    }
  }, [user]);

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-[#2FCF89]' };
    if (score >= 80) return { grade: 'A', color: 'text-[#2FCF89]' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600' };
    return { grade: 'C', color: 'text-yellow-600' };
  };

  const gradeInfo = getGrade(score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Financial Health Score</h1>
          <p className="text-sm text-gray-500">Your overall financial literacy progress</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
          <div className="text-center">
            <div className={`text-6xl font-bold ${gradeInfo.color} mb-2`}>{score}</div>
            <div className={`text-2xl font-semibold ${gradeInfo.color}`}>Grade: {gradeInfo.grade}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
