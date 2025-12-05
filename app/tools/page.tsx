'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setActiveTool('')}
            className="mb-6 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
          >
            ← Back
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Budget Planner</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                value={budget.income || ''}
                onChange={(e) => setBudget({ ...budget, income: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="30000"
              />
            </div>
            
            <button
              onClick={calculateBudget}
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Budget
            </button>
            
            {budget.needs > 0 && (
              <div className="space-y-4 pt-4">
                <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="font-semibold text-gray-700 mb-1">Needs (50%)</div>
                  <div className="text-3xl font-bold text-blue-600">₹{budget.needs.toFixed(0)}</div>
                  <div className="text-sm text-gray-600 mt-1">Rent, food, bills</div>
                </div>
                
                <div className="p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div className="font-semibold text-gray-700 mb-1">Wants (30%)</div>
                  <div className="text-3xl font-bold text-yellow-600">₹{budget.wants.toFixed(0)}</div>
                  <div className="text-sm text-gray-600 mt-1">Entertainment, shopping</div>
                </div>
                
                <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="font-semibold text-gray-700 mb-1">Savings (20%)</div>
                  <div className="text-3xl font-bold text-green-600">₹{budget.savings.toFixed(0)}</div>
                  <div className="text-sm text-gray-600 mt-1">Emergency fund, investments</div>
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setActiveTool('')}
            className="mb-6 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
          >
            ← Back
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Risk Checker</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount to Invest (₹)</label>
              <input
                type="number"
                value={risk.amount || ''}
                onChange={(e) => setRisk({ ...risk, amount: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="10000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                value={risk.income || ''}
                onChange={(e) => setRisk({ ...risk, income: Number(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="30000"
              />
            </div>
            
            {riskData && (
              <div className={`p-8 rounded-xl border-2 ${
                riskData.level === 'HIGH' ? 'bg-red-50 border-red-300' : 
                riskData.level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-300' : 
                'bg-green-50 border-green-300'
              }`}>
                <div className="text-5xl mb-4">{riskData.level === 'HIGH' ? '⚠️' : riskData.level === 'MEDIUM' ? '⚡' : '✅'}</div>
                <div className="font-bold text-2xl mb-2">Risk Level: {riskData.level}</div>
                <div className="text-xl mb-4">This is {riskData.percentage.toFixed(1)}% of your monthly income</div>
                
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Tools</h1>
          <p className="text-gray-600 text-lg">Practical tools to manage your money</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setActiveTool('budget')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Budget Planner</h3>
            <p className="text-gray-600">Calculate 50-30-20 budget for your income</p>
          </button>
          
          <button
            onClick={() => setActiveTool('risk')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all text-left group"
          >
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Risk Checker</h3>
            <p className="text-gray-600">Check if your investment amount is safe</p>
          </button>
        </div>
      </div>
    </div>
  );
}
