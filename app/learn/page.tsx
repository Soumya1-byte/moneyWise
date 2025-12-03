'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import LessonCard from '@/components/molecules/LessonCard';
import PageTransition from '@/components/animations/PageTransition';
import { lessons } from '@/data/lessons';
import { useStore } from '@/store/useStore';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function Learn() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((module) => {
            const completed = module.lessons.filter(l => 
              user?.progress?.completedLessons?.includes(l.id)
            ).length;
            const total = module.lessons.length;

            return (
              <Card key={module.id} onClick={() => router.push(`/learn/${module.id}`)} className="hover:scale-105 transition-transform">
                <div className="text-5xl mb-3">{module.icon}</div>
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{total} lessons</span>
                  <span className="text-sm font-semibold text-green-600">{completed}/{total} done</span>
                </div>
                <div className="mt-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(completed/total)*100}%` }} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
