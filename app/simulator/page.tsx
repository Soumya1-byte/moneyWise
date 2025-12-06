'use client';

import { useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import ScenarioSlider from '@/components/system/ScenarioSlider';

export default function WhatIfSimulator() {
  const [investment, setInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [returns, setReturns] = useState(12);
  const [inflation, setInflation] = useState(6);

  const futureValue = investment * Math.pow(1 + returns / 100, years);
  const realValue = futureValue / Math.pow(1 + inflation / 100, years);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">What-If Simulator</h1>
          <p className="text-sm text-gray-500">Visualize financial scenarios</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">
            <ScenarioSlider label="Monthly Investment" value={investment} onChange={setInvestment} min={1000} max={50000} step={1000} unit="₹" />
            <ScenarioSlider label="Years" value={years} onChange={setYears} min={1} max={30} />
            <ScenarioSlider label="Expected Returns" value={returns} onChange={setReturns} min={5} max={20} unit="%" />
            <ScenarioSlider label="Inflation" value={inflation} onChange={setInflation} min={3} max={10} unit="%" />
          </div>

          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Projection</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Future Value</p>
                <p className="text-3xl font-semibold text-gray-900">₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Real Value (Inflation Adjusted)</p>
                <p className="text-2xl font-semibold text-[#2FCF89]">₹{realValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
