export const scenarios = [
  {
    id: 'crypto-pump',
    title: 'The Crypto Pump',
    start: 'scenario-1',
    nodes: {
      'scenario-1': {
        text: 'You invested ₹10,000 in a meme coin. It pumped 50% in 2 days. What do you do?',
        choices: [
          { text: 'Sell everything and take profit', next: 'sell-all', emotion: 'smart' },
          { text: 'Hold for more gains', next: 'hold-greed', emotion: 'greedy' },
          { text: 'Sell half, keep half', next: 'sell-half', emotion: 'balanced' },
          { text: 'Buy more with FOMO', next: 'buy-more', emotion: 'fomo' }
        ]
      },
      'sell-all': {
        text: 'You sold at ₹15,000. Next day it crashed to ₹3,000. You saved yourself!',
        outcome: 'win',
        pnl: 5000,
        lesson: 'Taking profits is never wrong'
      },
      'hold-greed': {
        text: 'You held. It crashed 80% next week. Your ₹15,000 became ₹3,000.',
        outcome: 'loss',
        pnl: -7000,
        lesson: 'Greed destroys portfolios'
      },
      'sell-half': {
        text: 'You sold ₹7,500. Rest crashed. Final: ₹9,000. Small loss but learned risk management.',
        outcome: 'neutral',
        pnl: -1000,
        lesson: 'Partial profit-taking reduces risk'
      },
      'buy-more': {
        text: 'You bought ₹5,000 more at top. It crashed. Lost ₹12,000 total.',
        outcome: 'loss',
        pnl: -12000,
        lesson: 'Never chase pumps with more money'
      }
    }
  },
  {
    id: 'market-crash',
    title: 'The Market Crash',
    start: 'crash-1',
    nodes: {
      'crash-1': {
        text: 'Market crashes 30%. Your portfolio is down ₹50,000. What do you do?',
        choices: [
          { text: 'Panic sell everything', next: 'panic-sell', emotion: 'fear' },
          { text: 'Hold and wait', next: 'hold-crash', emotion: 'patient' },
          { text: 'Buy the dip', next: 'buy-dip', emotion: 'brave' },
          { text: 'Check news constantly', next: 'news-anxiety', emotion: 'anxious' }
        ]
      },
      'panic-sell': {
        text: 'You sold at bottom. Market recovered 40% in 3 months. You missed it.',
        outcome: 'loss',
        pnl: -50000,
        lesson: 'Panic selling locks in losses'
      },
      'hold-crash': {
        text: 'You held. Market recovered in 6 months. Back to breakeven.',
        outcome: 'neutral',
        pnl: 0,
        lesson: 'Patience pays in quality investments'
      },
      'buy-dip': {
        text: 'You bought more. Market recovered. You made ₹80,000 profit.',
        outcome: 'win',
        pnl: 80000,
        lesson: 'Crashes are opportunities for prepared investors'
      },
      'news-anxiety': {
        text: 'You stressed for weeks, made emotional trades, lost ₹30,000 more.',
        outcome: 'loss',
        pnl: -80000,
        lesson: 'News creates noise, not signals'
      }
    }
  }
];
