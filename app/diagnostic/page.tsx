'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';

export default function Diagnostic() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);

  const analyze = () => {
    const mistakes = [];
    if (input.toLowerCase().includes('fomo')) mistakes.push('FOMO');
    if (input.toLowerCase().includes('panic')) mistakes.push('Emotional Trading');
    if (input.toLowerCase().includes('everyone')) mistakes.push('Herd Mentality');
    
    setResult({
      mistakes,
      corrections: {
        'FOMO': 'Wait 24 hours before any investment decision',
        'Emotional Trading': 'Set rules and stick to them',
        'Herd Mentality': 'Do your own research'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Money Mistake Diagnostic</h1>
          <p className="text-sm text-gray-500">Describe your financial decisions and get insights</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your recent financial decisions or habits..."
            className="w-full h-32 px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 outline-none resize-none"
          />
          
          <button
            onClick={analyze}
            className="mt-4 w-full py-3 bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium rounded-xl transition-all"
          >
            Analyze
          </button>

          {result && result.mistakes.length > 0 && (
            <div className="mt-6 space-y-4">
              {result.mistakes.map((mistake: string) => (
                <div key={mistake} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{mistake}</h3>
                  <p className="text-sm text-gray-600">{result.corrections[mistake]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
