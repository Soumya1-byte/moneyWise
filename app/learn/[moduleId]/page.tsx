'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useStore();
  const [selectedLesson, setSelectedLesson] = useState<typeof module.lessons[0] | null>(null);

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
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Button variant="secondary" onClick={() => setSelectedLesson(null)} className="mb-4">← Back</Button>
          <Card>
            <h1 className="text-3xl font-bold mb-6">{selectedLesson.title}</h1>
            <div className="prose max-w-none whitespace-pre-line text-lg leading-relaxed">
              {selectedLesson.content}
            </div>
            <div className="mt-8 pt-6 border-t">
              <Button onClick={() => completeLesson(selectedLesson.id, selectedLesson.xp)}>
                Complete Lesson (+{selectedLesson.xp} XP)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Button variant="secondary" onClick={() => router.push('/learn')} className="mb-4">← Back to Modules</Button>
        <h1 className="text-3xl font-bold mb-2">{moduleData.icon} {moduleData.title}</h1>
        <p className="text-gray-600 mb-8">{moduleData.description}</p>

        <div className="space-y-4">
          {moduleData.lessons.map((lesson, idx) => {
            const isCompleted = user?.progress?.completedLessons?.includes(lesson.id);
            return (
              <Card key={lesson.id} onClick={() => setSelectedLesson(lesson)} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {isCompleted ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">+{lesson.xp} XP</p>
                    </div>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
