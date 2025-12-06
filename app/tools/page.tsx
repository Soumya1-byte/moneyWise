'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';

export default function Tools() {
  const [activeTool, setActiveTool] = useState('');
  const [budget, setBudget] = useState({ income: 0, needs: 0, wants: 0, savings: 0 });
  const [risk, setRisk] = useState({ amount: 0, income: 0 });

  const calculateBudget = () => {
    const income = budget.income;
    setBudget({
      ...budget,
      needs: income * 0.5,
      wants: income * 0.3,
      savings: income * 0.2,
    });
  };

  const calculateRisk = () => {
    const percentage = (risk.amount / risk.income) * 100;
    return { percentage, level: percentage > 20 ? 'HIGH' : percentage > 10 ? 'MEDIUM' : 'LOW' };
  };

  if (activeTool === 'budget') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setActiveTool('')}
            className="mb-6 px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-gray-700 font-medium transition-all text-sm"
          >
            ← Back
          </button>
          
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Budget Planner</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                value={budget.income || ''}
                onChange={(e) => setBudget({ ...budget, income: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                placeholder="30000"
              />
            </div>
            
            <button
              onClick={calculateBudget}
              className="w-full px-6 py-3 rounded-xl bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium shadow-[0_4px_12px_rgba(47,207,137,0.3)] hover:shadow-[0_6px_20px_rgba(47,207,137,0.4)] transition-all"
            >
              Calculate Budget
            </button>
            
            {budget.needs > 0 && (
              <div className="space-y-4 pt-4">
                <div className="p-6 bg-white/60 rounded-xl border border-gray-200">
                  <div className="text-sm font-medium text-gray-500 mb-1">Needs (50%)</div>
                  <div className="text-3xl font-semibold text-gray-900">₹{budget.needs.toFixed(0)}</div>
                  <div className="text-xs text-gray-400 mt-1">Rent, food, bills</div>
                </div>
                
                <div className="p-6 bg-white/60 rounded-xl border border-gray-200">
                  <div className="text-sm font-medium text-gray-500 mb-1">Wants (30%)</div>
                  <div className="text-3xl font-semibold text-gray-900">₹{budget.wants.toFixed(0)}</div>
                  <div className="text-xs text-gray-400 mt-1">Entertainment, shopping</div>
                </div>
                
                <div className="p-6 bg-[#2FCF89]/5 rounded-xl border border-[#2FCF89]/20">
                  <div className="text-sm font-medium text-gray-500 mb-1">Savings (20%)</div>
                  <div className="text-3xl font-semibold text-gray-900">₹{budget.savings.toFixed(0)}</div>
                  <div className="text-xs text-gray-400 mt-1">Emergency fund, investments</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeTool === 'risk') {
    const riskData = risk.amount && risk.income ? calculateRisk() : null;
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setActiveTool('')}
            className="mb-6 px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-gray-700 font-medium transition-all text-sm"
          >
            ← Back
          </button>
          
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Risk Checker</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Invest (₹)</label>
              <input
                type="number"
                value={risk.amount || ''}
                onChange={(e) => setRisk({ ...risk, amount: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                placeholder="10000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                value={risk.income || ''}
                onChange={(e) => setRisk({ ...risk, income: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                placeholder="30000"
              />
            </div>
            
            {riskData && (
              <div className={`p-6 rounded-xl border ${
                riskData.level === 'HIGH' ? 'bg-red-50 border-red-200' : 
                riskData.level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-200' : 
                'bg-[#2FCF89]/5 border-[#2FCF89]/20'
              }`}>
                <div className="font-semibold text-lg mb-2 text-gray-900">Risk Level: {riskData.level}</div>
                <div className="text-sm text-gray-600 mb-4">This is {riskData.percentage.toFixed(1)}% of your monthly income</div>
                
                {riskData.level === 'HIGH' && (
                  <div className="text-sm">
                    <p className="font-semibold mb-2">⚠️ Warning:</p>
                    <p>This is too much! Only invest 2-5% in high-risk assets like crypto. Consider reducing the amount.</p>
                  </div>
                )}
                {riskData.level === 'MEDIUM' && (
                  <div className="text-sm">
                    <p className="font-semibold mb-2">⚡ Caution:</p>
                    <p>This is moderate risk. Make sure you have emergency fund first and can afford to lose this money.</p>
                  </div>
                )}
                {riskData.level === 'LOW' && (
                  <div className="text-sm">
                    <p className="font-semibold mb-2">✅ Good:</p>
                    <p>This is a reasonable amount. Still, only invest what you can afford to lose completely.</p>
                  </div>
                )}
              </div>
            )}
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Financial Tools</h1>
          <p className="text-sm text-gray-500">Practical calculators for financial planning</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setActiveTool('budget')}
            className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Planner</h3>
            <p className="text-sm text-gray-500">Calculate 50-30-20 budget for your income</p>
          </button>
          
          <button
            onClick={() => setActiveTool('risk')}
            className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Checker</h3>
            <p className="text-sm text-gray-500">Check if your investment amount is safe</p>
          </button>
        </div>
      </div>
    </div>
  );
}
