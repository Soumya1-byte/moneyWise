'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { stories } from '@/data/stories';

export default function Stories() {
  const [selected, setSelected] = useState<any>(null);

  if (selected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Button variant="secondary" onClick={() => setSelected(null)} className="mb-4">← Back</Button>
          <Card>
            <div className="text-5xl mb-4">{selected.icon}</div>
            <h1 className="text-3xl font-bold mb-2">{selected.title}</h1>
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
              {selected.category}
            </span>
            <div className="prose max-w-none whitespace-pre-line text-lg mb-8">
              {selected.story}
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-3">❌ What Went Wrong:</h3>
              <ul className="space-y-2">
                {selected.whatWentWrong.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-3">✅ How to Avoid:</h3>
              <ul className="space-y-2">
                {selected.howToAvoid.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Key Rule:</h3>
              <p className="text-lg">{selected.keyRule}</p>
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
        <h1 className="text-3xl font-bold mb-2">Real Stories 📖</h1>
        <p className="text-gray-600 mb-8">Learn from others' financial mistakes</p>
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Card key={story.id} onClick={() => setSelected(story)} className="hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{story.icon}</div>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  {story.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p className="text-gray-600">Click to read the full story and lessons</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
