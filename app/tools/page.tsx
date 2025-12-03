'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Button variant="secondary" onClick={() => setActiveTool('')} className="mb-4">← Back</Button>
          <Card>
            <h2 className="text-2xl font-bold mb-6">📊 Budget Planner</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={budget.income || ''}
                  onChange={(e) => setBudget({ ...budget, income: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="30000"
                />
              </div>
              <Button onClick={calculateBudget}>Calculate Budget</Button>
              {budget.needs > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold">Needs (50%)</div>
                    <div className="text-2xl font-bold">₹{budget.needs.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Rent, food, bills</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-semibold">Wants (30%)</div>
                    <div className="text-2xl font-bold">₹{budget.wants.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Entertainment, shopping</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold">Savings (20%)</div>
                    <div className="text-2xl font-bold">₹{budget.savings.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Emergency fund, investments</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTool === 'risk') {
    const riskData = risk.amount && risk.income ? calculateRisk() : null;
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Button variant="secondary" onClick={() => setActiveTool('')} className="mb-4">← Back</Button>
          <Card>
            <h2 className="text-2xl font-bold mb-6">⚖️ Risk Checker</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Amount to Invest (₹)</label>
                <input
                  type="number"
                  value={risk.amount || ''}
                  onChange={(e) => setRisk({ ...risk, amount: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="10000"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={risk.income || ''}
                  onChange={(e) => setRisk({ ...risk, income: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="30000"
                />
              </div>
              {riskData && (
                <div className={`mt-6 p-6 rounded-lg ${riskData.level === 'HIGH' ? 'bg-red-100 border-2 border-red-300' : riskData.level === 'MEDIUM' ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-green-100 border-2 border-green-300'}`}>
                  <div className="text-3xl mb-2">{riskData.level === 'HIGH' ? '⚠️' : riskData.level === 'MEDIUM' ? '⚡' : '✅'}</div>
                  <div className="font-bold text-xl mb-2">Risk Level: {riskData.level}</div>
                  <div className="text-lg mb-4">This is {riskData.percentage.toFixed(1)}% of your monthly income</div>
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
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-2">Financial Tools 🛠️</h1>
        <p className="text-gray-600 mb-8">Practical tools to manage your money</p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card onClick={() => setActiveTool('budget')} className="hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">Budget Planner</h3>
            <p className="text-gray-600">Calculate 50-30-20 budget for your income</p>
          </Card>
          <Card onClick={() => setActiveTool('risk')} className="hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">⚖️</div>
            <h3 className="text-xl font-bold mb-2">Risk Checker</h3>
            <p className="text-gray-600">Check if your investment amount is safe</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
