'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';

export default function Learn() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Modules</h1>
          <p className="text-gray-600 text-lg">Start from basics or jump to any topic</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((module) => {
            const completed = module.lessons.filter(l => 
              user?.progress?.completedLessons?.includes(l.id)
            ).length;
            const total = module.lessons.length;

            return (
              <button
                key={module.id}
                onClick={() => router.push(`/learn/${module.id}`)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
              >
                <div className="text-5xl mb-4">{module.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{total} lessons</span>
                  <span className="text-green-600 font-semibold">{completed}/{total} done</span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${(completed/total)*100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
