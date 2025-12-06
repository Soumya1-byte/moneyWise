'use client';

import PremiumNavbar from '@/components/premium/PremiumNavbar';

const timeline = [
  { month: 1, title: 'Build Habits', tasks: ['Track expenses', 'Set goals', 'Emergency fund'] },
  { month: 2, title: 'Master Budgeting', tasks: ['50-30-20 rule', 'Cut expenses', 'Automate savings'] },
  { month: 3, title: 'Learn Basics', tasks: ['Inflation', 'Compound interest', 'Asset classes'] },
  { month: 4, title: 'Index Investing', tasks: ['Demat account', 'Index funds', 'Start SIP'] },
  { month: 5, title: 'Risk Management', tasks: ['Risk tolerance', 'Diversification', 'Stop-loss'] },
  { month: 6, title: 'Advanced', tasks: ['Rebalancing', 'Tax optimization', 'Long-term strategy'] }
];

export default function InvestingTimeline() {
  const currentMonth = 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">6-Month Journey</h1>
          <p className="text-sm text-gray-500">Your guided path to financial mastery</p>
        </div>

        <div className="space-y-6">
          {timeline.map((item, idx) => {
            const isActive = idx + 1 === currentMonth;
            
            return (
              <div key={idx} className={`bg-white/50 backdrop-blur-md border rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-6 ${
                isActive ? 'border-[#2FCF89]/20' : 'border-white/10'
              }`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Month {item.month}: {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded border border-gray-300" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
