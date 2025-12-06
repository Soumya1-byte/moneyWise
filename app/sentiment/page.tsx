'use client';

import { useEffect, useState } from 'react';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import IndicatorGauge from '@/components/system/IndicatorGauge';

export default function MarketSentiment() {
  const [sentiment, setSentiment] = useState<any>(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      const res = await fetch('/api/market/sentiment');
      const data = await res.json();
      setSentiment(data);
    };

    fetchSentiment();
    const interval = setInterval(fetchSentiment, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!sentiment) return null;

  const getFearGreedColor = (index: number) => {
    if (index < 25) return '#EF4444';
    if (index < 45) return '#F59E0B';
    if (index < 55) return '#6B7280';
    if (index < 75) return '#10B981';
    return '#2FCF89';
  };

  const getFearGreedLabel = (index: number) => {
    if (index < 25) return 'Extreme Fear';
    if (index < 45) return 'Fear';
    if (index < 55) return 'Neutral';
    if (index < 75) return 'Greed';
    return 'Extreme Greed';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Market Sentiment</h1>
          <p className="text-sm text-gray-500">Real-time fear & greed analysis</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Fear & Greed Index</h3>
            <div className="flex justify-center">
              <IndicatorGauge 
                value={sentiment.fearGreedIndex} 
                label={getFearGreedLabel(sentiment.fearGreedIndex)}
                color={getFearGreedColor(sentiment.fearGreedIndex)}
              />
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Volatility</span>
                <span className="text-sm font-semibold text-gray-900">{sentiment.volatility.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trend</span>
                <span className={`text-sm font-semibold ${
                  sentiment.trend === 'bullish' ? 'text-[#2FCF89]' : 
                  sentiment.trend === 'bearish' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {sentiment.trend.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
