import { calculateRSI, calculateEMA, generateSignal } from './core';
import { fetchPriceData } from './data';

export class TradingEngine {
  private isRunning = false;
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async start() {
    this.isRunning = true;
    console.log('Trading engine started');
  }

  async stop() {
    this.isRunning = false;
    console.log('Trading engine stopped');
  }

  async scan(symbol: string) {
    const prices = await fetchPriceData(symbol, this.config.timeframe);
    const rsi = calculateRSI(prices);
    const ema = calculateEMA(prices, 20);
    const signal = generateSignal(rsi, ema, prices[prices.length - 1]);
    
    return { symbol, rsi, ema, signal };
  }

  getStatus() {
    return {
      running: this.isRunning,
      config: this.config
    };
  }
}
