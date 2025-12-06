export async function fetchPriceData(symbol: string, timeframe: string): Promise<number[]> {
  const prices: number[] = [];
  const basePrice = symbol === 'BTC' ? 45000 : 2800;
  
  for (let i = 0; i < 100; i++) {
    prices.push(basePrice * (1 + (Math.random() - 0.5) * 0.1));
  }
  
  return prices;
}

export async function getLivePrices(symbols: string[]): Promise<Record<string, number>> {
  const prices: Record<string, number> = {};
  
  for (const symbol of symbols) {
    prices[symbol] = symbol === 'BTC' ? 45000 : 2800;
  }
  
  return prices;
}
