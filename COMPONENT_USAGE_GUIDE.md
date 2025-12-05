# MoneyWise Frontend Redesign - Component Usage Guide

## Overview
This guide explains how to use the newly redesigned premium UI components and how to integrate PNG assets throughout the app.

---

## 🎨 Component Architecture

### Atoms (Base Building Blocks)
Smallest, reusable UI elements.

#### Button
```tsx
import Button from '@/components/atoms/Button';

<Button variant="primary" size="md">
  Click Me
</Button>

// Variants: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
// Sizes: 'sm' | 'md' | 'lg' | 'xl'
// Props: isLoading, fullWidth, icon, disabled
```

#### Card
```tsx
import Card from '@/components/atoms/Card';

<Card variant="default" padding="md" hover glowEffect>
  Content here
</Card>

// Variants: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal'
// Padding: 'sm' | 'md' | 'lg' | 'xl'
```

#### Input
```tsx
import Input from '@/components/atoms/Input';

<Input 
  label="Email"
  type="email"
  variant="default"
  error="Error message"
  icon={<YourIcon />}
/>

// Variants: 'default' | 'minimal'
```

#### IconWrapper
```tsx
import IconWrapper from '@/components/atoms/IconWrapper';

<IconWrapper 
  src="/assets/check.png" 
  alt="Check"
  size="md"
  animate={true}
  glow={true}
  colorOverlay="#00C46A"
/>

// Sizes: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
```

#### Chip
```tsx
import Chip from '@/components/atoms/Chip';

<Chip variant="primary" size="md" onClose={() => {}}>
  Tag
</Chip>

// Variants: 'default' | 'success' | 'warning' | 'info' | 'primary'
```

#### Tooltip
```tsx
import Tooltip from '@/components/atoms/Tooltip';

<Tooltip content="Help text" side="top">
  <button>Hover me</button>
</Tooltip>

// Sides: 'top' | 'bottom' | 'left' | 'right'
```

#### GlassCard
```tsx
import GlassCard from '@/components/atoms/GlassCard';

<GlassCard padding="md" hover>
  Frosted glass effect
</GlassCard>
```

#### Skeleton
```tsx
import Skeleton from '@/components/atoms/Skeleton';

<Skeleton count={3} />
<Skeleton circle className="h-12 w-12" />
```

---

### Molecules (Composed Components)

#### LessonCard
```tsx
import LessonCard from '@/components/molecules/LessonCard';

<LessonCard
  id="lesson-1"
  title="Introduction to Budgeting"
  description="Learn the basics of personal budgeting"
  difficulty="beginner"
  xpReward={100}
  duration={15}
  icon="/assets/budgeting.png"
  progress={50}
  isCompleted={false}
  onClick={() => router.push('/learn/lesson-1')}
/>
```

#### QuizCard
```tsx
import QuizCard from '@/components/molecules/QuizCard';

<QuizCard
  id="quiz-1"
  title="Banking Basics Quiz"
  description="Test your knowledge"
  questionCount={10}
  difficulty="intermediate"
  xpReward={150}
  timeLimit={20}
  icon="/assets/quiz.png"
  isCompleted={true}
  score={85}
  onClick={() => router.push('/quiz/quiz-1')}
/>
```

#### StatBox
```tsx
import StatBox from '@/components/molecules/StatBox';

<StatBox
  label="Total XP"
  value={1250}
  icon="/assets/xp.png"
  trend={{ value: 10, isPositive: true }}
  variant="gradient"
  size="md"
/>

// Variants: 'default' | 'gradient' | 'glass'
// Sizes: 'sm' | 'md' | 'lg'
```

#### XPBadge
```tsx
import XPBadge from '@/components/molecules/XPBadge';

<XPBadge 
  xp={250} 
  label="XP"
  size="md"
  showAnimation={true}
/>

// Sizes: 'sm' | 'md' | 'lg'
```

#### AnimatedCounter
```tsx
import AnimatedCounter from '@/components/molecules/AnimatedCounter';

<AnimatedCounter
  from={0}
  to={1500}
  duration={2}
  format="currency"
  prefix="$"
  showTooltip="Total earnings"
/>

// Format: 'number' | 'currency' | 'percentage'
```

---

### Organisms (Complex Sections)

#### DashboardHeader
```tsx
import DashboardHeader from '@/components/organisms/DashboardHeader';

<DashboardHeader
  userName="John Doe"
  totalXP={2500}
  currentLevel={5}
  streakDays={7}
  nextMilestone={3000}
  onStartLearning={() => router.push('/learn')}
/>
```

#### LearningPath
```tsx
import LearningPath from '@/components/organisms/LearningPath';

<LearningPath
  lessons={[
    {
      id: '1',
      title: 'Budgeting 101',
      description: 'Learn to budget',
      difficulty: 'beginner',
      xpReward: 100,
      duration: 15,
      icon: '/assets/budgeting.png',
      progress: 0,
      isCompleted: false,
    },
  ]}
  title="Your Learning Path"
  onLessonClick={(lessonId) => console.log(lessonId)}
/>
```

#### BudgetPlanner
```tsx
import BudgetPlanner from '@/components/organisms/BudgetPlanner';

<BudgetPlanner
  categories={[
    { id: '1', name: 'Housing', budget: 1200, spent: 1150, color: '#00C46A', icon: '/assets/budgeting.png' },
  ]}
  totalIncome={3500}
  onSave={(budgets) => console.log(budgets)}
/>
```

#### RiskChecker
```tsx
import RiskChecker from '@/components/organisms/RiskChecker';

<RiskChecker
  riskScore={45}
  volatility={23.5}
  historicalData={[
    { month: 'Jan', volatility: 18 },
  ]}
/>
```

---

## 🖼️ PNG Asset System

### Using ImageAssets
```tsx
import { getAsset, assetExists } from '@/lib/utils/imageAssets';

// Get asset path
const checkIcon = getAsset('icons', 'check');
// Returns: '/assets/check.png'

// Check if asset exists
if (assetExists('icons', 'check')) {
  // Safe to use
}
```

### Asset Categories
- **icons**: Check, shield, target, warning, lightbulb, trophy, xp, level, badge
- **categories**: Budgeting, banking, investing, stocks, crypto, mutual funds, money basics, planning
- **tools**: Budget planner, expense tracker, risk checker, goal planner
- **learning**: Lesson, quiz, correct, incorrect, mistake
- **status**: Success, error

### Adding New Assets
1. Place PNG in `/public/assets/`
2. Add mapping to `imageAssets` object in `/lib/utils/imageAssets.ts`
3. Use via `getAsset()` function

### Example: Adding a New Icon
```tsx
// Step 1: Place your-icon.png in /public/assets/

// Step 2: Update imageAssets.ts
export const imageAssets = {
  icons: {
    // ...existing
    yourIcon: '/assets/your-icon.png',
  },
};

// Step 3: Use in component
<IconWrapper src={getAsset('icons', 'yourIcon')} alt="Your Icon" />
```

---

## 🎯 Animation System

### Pre-built Animation Variants
```tsx
import { staggerContainer, fadeInUp, slideUp } from '@/lib/utils/animations';

// Stagger container for child animations
<motion.div
  initial="initial"
  animate="animate"
  variants={staggerContainer}
>
  {/* Children with fadeInUp will animate sequentially */}
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

### Common Animations Used
- `staggerContainer`: Parent wrapper for sequential animations
- `fadeInUp`: Fade in + slide up
- `slideUp`: Simple slide up
- Spring animations for interactive elements

---

## 🎨 Color Palette & Theme

### Primary Colors
```tsx
// Use with Tailwind classes or inline styles
const colors = {
  moneyGreen: '#00C46A',
  deepNavy: '#0A1A2F',
  softCream: '#F8F6F0',
  silverGrey: '#D9D9D9',
  accentYellow: '#FFE28A',
};
```

### Typography
```tsx
// Headings: font-heading (Poppins)
<h1 className="text-5xl font-bold font-heading">Title</h1>

// Body: font-sans (Inter)
<p className="text-base font-sans">Body text</p>

// Numbers: font-mono (JetBrains Mono)
<span className="font-mono">1,250</span>
```

---

## 📱 Responsive Design

All components are fully responsive using Tailwind breakpoints:
- Mobile-first approach
- `md:` for tablets (768px+)
- `lg:` for desktops (1024px+)

### Example
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
</div>
```

---

## ⚡ Performance Tips

1. **Use Skeleton for Loading States**
   ```tsx
   {isLoading ? <Skeleton count={3} /> : <Content />}
   ```

2. **Optimize Images**
   - Use Next.js Image component (already done)
   - Images are auto-optimized via `next/image`

3. **Code Splitting**
   - Components are automatically code-split in Next.js

4. **Animations**
   - Prefer transform/opacity (GPU-accelerated)
   - Avoid animating layout properties
   - Use `will-change` CSS for complex animations

---

## 🚀 Integration Checklist

When using these components in new pages:

- [ ] Import required components
- [ ] Use `PageTransition` wrapper for page animations
- [ ] Include `Navbar` at the top
- [ ] Use `staggerContainer` + `fadeInUp` for enter animations
- [ ] Replace any emoji/text icons with PNG via `IconWrapper`
- [ ] Test on mobile (use responsive design)
- [ ] Verify all assets load correctly
- [ ] Check animations run at 60fps
- [ ] Validate accessibility (aria labels, keyboard nav)

---

## 📚 Example: Complete Page Structure

```tsx
'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import PageTransition from '@/components/animations/PageTransition';
import Card from '@/components/atoms/Card';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function MyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl font-bold text-navy font-heading">
                Page Title
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card padding="lg">
                Your content here
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
```

---

## 🔗 File Structure Reference

```
components/
├── atoms/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Chip.tsx
│   ├── GlassCard.tsx
│   ├── IconWrapper.tsx
│   ├── Input.tsx
│   ├── Skeleton.tsx
│   ├── Tooltip.tsx
│   └── ... (other atoms)
│
├── molecules/
│   ├── AnimatedCounter.tsx
│   ├── LessonCard.tsx
│   ├── QuizCard.tsx
│   ├── StatBox.tsx
│   ├── XPBadge.tsx
│   └── ... (other molecules)
│
└── organisms/
    ├── BudgetPlanner.tsx
    ├── DashboardHeader.tsx
    ├── LearningPath.tsx
    ├── RiskChecker.tsx
    └── ... (other organisms)

lib/utils/
├── animations.ts (animation variants)
├── imageAssets.ts (PNG asset mapping)
├── cn.ts (classname merger)
└── formatters.ts (data formatting)
```

---

## 🎓 Next Steps

1. **Test all components** in each page
2. **Replace remaining emoji icons** with PNG assets
3. **Add more teaching tools** as needed
4. **Gather user feedback** on UX/animations
5. **Optimize performance** based on metrics
6. **Expand asset library** with designer

---

## 📞 Questions?

For component-specific questions, check the component file directly - each has JSDoc comments explaining props and usage.
