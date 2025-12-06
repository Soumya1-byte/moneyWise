'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 text-lg">Let's continue your financial learning journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Your Level</div>
            <div className="text-5xl font-bold my-2">{user.progress?.level || 1}</div>
            <div className="text-sm opacity-90">{user.progress?.xp || 0} XP</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Completed Lessons</div>
            <div className="text-5xl font-bold my-2">{user.progress?.completedLessons?.length || 0}</div>
            <div className="text-sm opacity-90">Keep learning!</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-1">Badges Earned</div>
            <div className="text-5xl font-bold my-2">{user.progress?.badges?.length || 0}</div>
            <div className="text-sm opacity-90">Collect them all!</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Daily Tip</h3>
              <p className="text-gray-700 text-lg">{tip}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/learn')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Continue Learning</h3>
            <p className="text-gray-600">Explore lessons on money, investing, and more</p>
          </button>
          
          <button
            onClick={() => router.push('/quiz')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Take a Quiz</h3>
            <p className="text-gray-600">Test your knowledge and earn XP</p>
          </button>
          
          <button
            onClick={() => router.push('/tools')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Use Tools</h3>
            <p className="text-gray-600">Budget planner, expense tracker, and more</p>
          </button>
          
          <button
            onClick={() => router.push('/stories')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Read Stories</h3>
            <p className="text-gray-600">Learn from real financial mistakes</p>
          </button>
        </div>
      </div>
    </div>
  );
}
