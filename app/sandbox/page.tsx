'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';

export default function PortfolioSandbox() {
  const [balance, setBalance] = useState(100000);
  const [holdings, setHoldings] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Portfolio Sandbox</h1>
          <p className="text-sm text-gray-500">Practice portfolio management with virtual money</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Balance</h3>
            <p className="text-3xl font-semibold text-gray-900">₹{balance.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
