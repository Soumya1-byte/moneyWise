# MoneyWise PNG Assets

## Required Icons

Place your PNG assets in this directory. All icons should be:
- Format: PNG with transparency
- Size: 512x512px (will be auto-scaled)
- Style: Consistent, modern, minimal

### Landing Page Icons
- `check.png` - Checkmark for "Beginner Friendly"
- `shield.png` - Shield for "Safe & Responsible"
- `target.png` - Target for "Practical Tools"

### Dashboard Icons
- `level.png` - Level/trophy icon
- `xp.png` - XP/star icon
- `badge.png` - Badge/medal icon
- `lessons.png` - Book/learning icon
- `lightbulb.png` - Daily tip icon

### Learning Module Icons
- `money-basics.png` - Money/coins
- `budgeting.png` - Calculator/budget
- `banking.png` - Bank building
- `investing.png` - Growth chart
- `stocks.png` - Stock market graph
- `mutual-funds.png` - Pie chart
- `crypto.png` - Cryptocurrency (with warning style)
- `planning.png` - Calendar/planning

### Tool Icons
- `budget-planner.png` - Calculator
- `risk-checker.png` - Warning/gauge
- `expense-tracker.png` - Receipt/list
- `goal-planner.png` - Target/goal

### Quiz Icons
- `quiz.png` - Question mark
- `correct.png` - Green checkmark
- `incorrect.png` - Red X
- `trophy.png` - Trophy for completion

### Story Icons
- `warning.png` - Warning triangle
- `lesson.png` - Lightbulb
- `mistake.png` - Caution sign

## Usage in Code

Icons are used via the IconWrapper component:

```tsx
<IconWrapper 
  src="/assets/icon-name.png" 
  alt="Description" 
  size="md" 
/>
```

Sizes: sm (24px), md (32px), lg (48px), xl (64px)

## Temporary Placeholders

Until you provide the actual PNGs, the app will show placeholder SVGs or fallback to the Next.js default image handling.
