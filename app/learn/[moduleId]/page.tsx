'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useStore();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const moduleData = lessons.find(m => m.id === params.moduleId);
  if (!moduleData) return <div>Module not found</div>;

  const completeLesson = async (lessonId: string, xp: number) => {
    const token = localStorage.getItem('token');
    await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ lessonId, xp }),
    });
    setSelectedLesson(null);
    window.location.reload();
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
          >
            ← Back
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{selectedLesson.title}</h1>
            <div className="prose max-w-none whitespace-pre-line text-lg text-gray-700 leading-relaxed">
              {selectedLesson.content}
            </div>
            <div className="pt-6 border-t">
              <button
                onClick={() => completeLesson(selectedLesson.id, selectedLesson.xp)}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Complete Lesson (+{selectedLesson.xp} XP)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <button
          onClick={() => router.push('/learn')}
          className="mb-6 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
        >
          ← Back to Modules
        </button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{moduleData.icon} {moduleData.title}</h1>
          <p className="text-gray-600 text-lg">{moduleData.description}</p>
        </div>

        <div className="space-y-4">
          {moduleData.lessons.map((lesson, idx) => {
            const isCompleted = user?.progress?.completedLessons?.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500">+{lesson.xp} XP</p>
                  </div>
                  <span className="text-2xl text-gray-400">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
