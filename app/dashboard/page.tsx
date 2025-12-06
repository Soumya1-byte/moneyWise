'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import StatCard from '@/components/premium/StatCard';
import DailyTip from '@/components/premium/DailyTip';
import ActionCard from '@/components/premium/ActionCard';
import { dailyTips } from '@/data/tips';

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
  }, [user, router, setUser]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E1DD]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-gray-300 border-t-[#2FCF89] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {user.name}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Level" 
            value={user.progress?.level || 1}
            trend={`${user.progress?.xp || 0} XP earned`}
          />
          <StatCard 
            label="Lessons Completed" 
            value={user.progress?.completedLessons?.length || 0}
            trend="Keep learning"
          />
          <StatCard 
            label="Badges" 
            value={user.progress?.badges?.length || 0}
            trend="Achievements unlocked"
          />
        </div>

        <div className="mb-8">
          <DailyTip tip={tip} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ActionCard
            title="Continue Learning"
            description="Explore lessons on money, investing, and financial literacy"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            onClick={() => router.push('/learn')}
          />
          <ActionCard
            title="Take a Quiz"
            description="Test your knowledge and earn experience points"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            onClick={() => router.push('/quiz')}
          />
          <ActionCard
            title="Financial Tools"
            description="Budget planner, expense tracker, and calculators"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            onClick={() => router.push('/tools')}
          />
          <ActionCard
            title="Real Stories"
            description="Learn from real financial mistakes and successes"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            onClick={() => router.push('/stories')}
          />
        </div>
      </div>
    </div>
  );
}
