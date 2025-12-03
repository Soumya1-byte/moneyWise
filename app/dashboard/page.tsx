'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
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
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600 mb-8">Let's continue your financial learning journey</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-sm opacity-90">Your Level</div>
            <div className="text-4xl font-bold my-2">{user.progress?.level || 1}</div>
            <div className="text-sm opacity-90">{user.progress?.xp || 0} XP</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-sm opacity-90">Completed Lessons</div>
            <div className="text-4xl font-bold my-2">{user.progress?.completedLessons?.length || 0}</div>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="text-sm opacity-90">Badges Earned</div>
            <div className="text-4xl font-bold my-2">{user.progress?.badges?.length || 0}</div>
          </Card>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-lg mb-1">Daily Tip</h3>
              <p className="text-gray-700">{tip}</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card onClick={() => router.push('/learn')} className="hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold mb-2">Continue Learning</h3>
            <p className="text-gray-600">Explore lessons on money, investing, and more</p>
          </Card>
          <Card onClick={() => router.push('/quiz')} className="hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-xl font-bold mb-2">Take a Quiz</h3>
            <p className="text-gray-600">Test your knowledge and earn XP</p>
          </Card>
          <Card onClick={() => router.push('/tools')} className="hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="text-xl font-bold mb-2">Use Tools</h3>
            <p className="text-gray-600">Budget planner, expense tracker, and more</p>
          </Card>
          <Card onClick={() => router.push('/stories')} className="hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-xl font-bold mb-2">Read Stories</h3>
            <p className="text-gray-600">Learn from real financial mistakes</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
