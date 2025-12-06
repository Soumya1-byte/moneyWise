'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import { stories } from '@/data/stories';

export default function Stories() {
  const [selected, setSelected] = useState<any>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelected(null)}
            className="mb-6 px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-gray-700 font-medium transition-all text-sm"
          >
            ← Back
          </button>
          
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">{selected.title}</h1>
            <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100">
              {selected.category}
            </span>
            
            <div className="prose max-w-none whitespace-pre-line text-sm text-gray-600 leading-relaxed">
              {selected.story}
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-base text-gray-900 mb-4">What Went Wrong</h3>
              <ul className="space-y-2">
                {selected.whatWentWrong.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#2FCF89]/5 border border-[#2FCF89]/20 rounded-xl p-6">
              <h3 className="font-semibold text-base text-gray-900 mb-4">How to Avoid</h3>
              <ul className="space-y-2">
                {selected.howToAvoid.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#2FCF89] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/60 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-base text-gray-900 mb-2">Key Rule</h3>
              <p className="text-sm text-gray-600">{selected.keyRule}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Real Stories</h1>
          <p className="text-sm text-gray-500">Learn from real financial mistakes</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelected(story)}
              className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl">
                  {story.icon}
                </div>
                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100">
                  {story.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {story.title}
              </h3>
              <p className="text-sm text-gray-500">Read full story and lessons</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
