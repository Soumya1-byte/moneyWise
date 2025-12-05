/**
 * Image Assets Mapping
 * Centralized system for managing all PNG assets used in the app
 * Makes it easy to swap, update, or add new assets globally
 */

export const imageAssets = {
  // Feature icons
  icons: {
    check: '/assets/check.png',
    shield: '/assets/shield.png',
    target: '/assets/target.png',
    warning: '/assets/warning.png',
    lightbulb: '/assets/lightbulb.png',
    trophy: '/assets/trophy.png',
    xp: '/assets/xp.png',
    level: '/assets/level.png',
    badge: '/assets/badge.png',
  },
  
  // Category icons for lessons/tools
  categories: {
    budgeting: '/assets/budgeting.png',
    banking: '/assets/banking.png',
    investing: '/assets/investing.png',
    stocks: '/assets/stocks.png',
    crypto: '/assets/crypto.png',
    mutualFunds: '/assets/mutual-funds.png',
    moneyBasics: '/assets/money-basics.png',
    planning: '/assets/planning.png',
  },

  // Tool illustrations
  tools: {
    budgetPlanner: '/assets/budget-planner.png',
    expenseTracker: '/assets/expense-tracker.png',
    riskChecker: '/assets/risk-checker.png',
    goalPlanner: '/assets/goal-planner.png',
  },

  // Quiz and learning
  learning: {
    lesson: '/assets/lesson.png',
    quiz: '/assets/quiz.png',
    correct: '/assets/correct.png',
    incorrect: '/assets/incorrect.png',
    mistake: '/assets/mistake.png',
  },

  // Status indicators
  status: {
    success: '/assets/check.png',
    error: '/assets/warning.png',
  },
} as const;

/**
 * Type-safe asset access
 * Usage: getAsset('icons', 'check') -> returns path
 */
export function getAsset(category: keyof typeof imageAssets, key: string): string {
  return (imageAssets[category] as Record<string, string>)[key] || '';
}

/**
 * Asset exists checker (useful for error handling)
 */
export function assetExists(category: keyof typeof imageAssets, key: string): boolean {
  return key in (imageAssets[category] as Record<string, string>);
}
