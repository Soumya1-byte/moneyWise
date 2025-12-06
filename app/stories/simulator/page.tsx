'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import { scenarios } from '@/data/storyScenarios';

export default function StorySimulator() {
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [currentNode, setCurrentNode] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  const startScenario = (scenario: any) => {
    setSelectedScenario(scenario);
    setCurrentNode(scenario.start);
    setHistory([]);
  };

  const makeChoice = (nextNode: string) => {
    setHistory([...history, currentNode]);
    setCurrentNode(nextNode);
  };

  const reset = () => {
    setSelectedScenario(null);
    setCurrentNode('');
    setHistory([]);
  };

  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Story Simulator</h1>
            <p className="text-sm text-gray-500">Make choices and see outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => startScenario(scenario)}
                className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-500">Interactive financial scenario</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const node = selectedScenario.nodes[currentNode];

  if (node.outcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className={`bg-white/50 backdrop-blur-md border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 ${
            node.outcome === 'win' ? 'border-[#2FCF89]/20' : 
            node.outcome === 'loss' ? 'border-red-200' : 'border-gray-200'
          }`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Outcome</h2>
            <p className="text-gray-700 mb-6">{node.text}</p>
            
            <div className={`p-4 rounded-xl mb-6 ${
              node.pnl >= 0 ? 'bg-[#2FCF89]/5 border border-[#2FCF89]/20' : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm font-medium text-gray-900">
                P/L: <span className={node.pnl >= 0 ? 'text-[#2FCF89]' : 'text-red-600'}>
                  {node.pnl >= 0 ? '+' : ''}₹{node.pnl.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Lesson Learned:</p>
              <p className="text-sm text-gray-700">{node.lesson}</p>
            </div>

            <button
              onClick={reset}
              className="w-full py-3 bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium rounded-xl transition-all"
            >
              Try Another Scenario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{node.text}</h2>

          <div className="space-y-3">
            {node.choices.map((choice: any, idx: number) => (
              <button
                key={idx}
                onClick={() => makeChoice(choice.next)}
                className="w-full p-4 text-left border border-gray-200 rounded-xl hover:border-[#2FCF89] hover:bg-[#2FCF89]/5 transition-all text-sm font-medium text-gray-700"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
