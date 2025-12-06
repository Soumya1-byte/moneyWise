'use client';

import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';

export default function Learn() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Learning Modules</h1>
          <p className="text-sm text-gray-500">Structured paths to financial literacy</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((module) => {
            const completed = module.lessons.filter(l => 
              user?.progress?.completedLessons?.includes(l.id)
            ).length;
            const total = module.lessons.length;
            const progress = (completed/total)*100;

            return (
              <button
                key={module.id}
                onClick={() => router.push(`/learn/${module.id}`)}
                className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl">
                    {module.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{module.description}</p>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-400">{total} lessons</span>
                  <span className="text-gray-600 font-medium">{completed}/{total}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2FCF89] h-1.5 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
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
