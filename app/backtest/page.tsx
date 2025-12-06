'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';

export default function Backtest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runBacktest = async () => {
    setLoading(true);
    const res = await fetch('/api/backtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asset: 'BTC', startDate: '2024-01-01', endDate: '2024-12-31' })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Strategy Backtesting</h1>
          <p className="text-sm text-gray-500">Test trading strategies on historical data</p>
        </div>

        <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
          <button
            onClick={runBacktest}
            disabled={loading}
            className="w-full py-3 bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Run Backtest'}
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Total P/L</span>
                <span className={`text-lg font-semibold ${result.pnl >= 0 ? 'text-[#2FCF89]' : 'text-red-600'}`}>
                  {result.pnl >= 0 ? '+' : ''}₹{result.pnl.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Win Rate</span>
                <span className="text-lg font-semibold text-gray-900">{result.winRate}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
