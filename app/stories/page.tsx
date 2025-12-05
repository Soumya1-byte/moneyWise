'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { stories } from '@/data/stories';

export default function Stories() {
  const [selected, setSelected] = useState<any>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelected(null)}
            className="mb-6 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
          >
            ← Back
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="text-6xl mb-4">{selected.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900">{selected.title}</h1>
            <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              {selected.category}
            </span>
            
            <div className="prose max-w-none whitespace-pre-line text-lg text-gray-700 leading-relaxed">
              {selected.story}
            </div>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">❌ What Went Wrong:</h3>
              <ul className="space-y-2">
                {selected.whatWentWrong.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-4">✅ How to Avoid:</h3>
              <ul className="space-y-2">
                {selected.howToAvoid.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-green-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-2">Key Rule:</h3>
              <p className="text-lg text-gray-700">{selected.keyRule}</p>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Real Stories</h1>
          <p className="text-gray-600 text-lg">Learn from others' financial mistakes</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setSelected(story)}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{story.icon}</div>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {story.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {story.title}
              </h3>
              <p className="text-gray-600">Click to read the full story and lessons</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
