# 🧩 Component Usage Guide

Quick reference for using the new MoneyWise component library.

## 🎨 Atoms

### Button
```tsx
import Button from '@/components/atoms/Button';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Loading state
<Button variant="primary" isLoading={true}>
  Saving...
</Button>

// Ghost button
<Button variant="ghost" size="sm">
  Cancel
</Button>
```

### IconWrapper
```tsx
import IconWrapper from '@/components/atoms/IconWrapper';

// Basic usage
<IconWrapper 
  src="/assets/money.png" 
  alt="Money icon" 
  size="md" 
/>

// Without animation
<IconWrapper 
  src="/assets/shield.png" 
  alt="Shield" 
  size="lg"
  animate={false}
/>
```

### Card
```tsx
import Card from '@/components/atoms/Card';

// Default card
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>

// Glass morphism
<Card variant="glass" padding="lg">
  Premium content
</Card>

// Gradient card
<Card variant="gradient">
  Highlighted content
</Card>

// No hover effect
<Card hover={false}>
  Static card
</Card>
```

### Input
```tsx
import Input from '@/components/atoms/Input';

// With label
<Input 
  label="Email" 
  type="email" 
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With error
<Input 
  label="Password" 
  type="password"
  error="Password is required"
/>
```

### Badge
```tsx
import Badge from '@/components/atoms/Badge';

<Badge variant="success">Completed</Badge>
<Badge variant="warning">In Progress</Badge>
<Badge variant="info" size="sm">New</Badge>
```

## 🧬 Molecules

### ProgressBar
```tsx
import ProgressBar from '@/components/molecules/ProgressBar';

<ProgressBar 
  value={75} 
  max={100} 
  label="Course Progress"
  color="green"
/>

// Without percentage
<ProgressBar 
  value={3} 
  max={5} 
  label="3/5 lessons"
  showPercentage={false}
/>
```

### StatBox
```tsx
import StatBox from '@/components/molecules/StatBox';

<StatBox
  icon="/assets/level.png"
  label="Your Level"
  value={5}
  trend="up"
  trendValue="+2 this week"
/>

// Without trend
<StatBox
  icon="/assets/xp.png"
  label="Total XP"
  value={1250}
  suffix=" XP"
/>
```

### LessonCard
```tsx
import LessonCard from '@/components/molecules/LessonCard';

<LessonCard
  id="money-basics"
  title="Money Basics"
  description="Learn the fundamentals of money management"
  icon="/assets/money-basics.png"
  difficulty="Beginner"
  xpReward={50}
  progress={3}
  totalLessons={5}
/>

// Locked lesson
<LessonCard
  id="advanced-investing"
  title="Advanced Investing"
  description="Complex investment strategies"
  icon="/assets/investing.png"
  difficulty="Advanced"
  xpReward={200}
  progress={0}
  totalLessons={8}
  isLocked={true}
/>
```

### QuizCard
```tsx
import QuizCard from '@/components/molecules/QuizCard';

<QuizCard
  id="quiz-1"
  title="Money Basics Quiz"
  description="Test your knowledge"
  icon="/assets/quiz.png"
  questions={10}
  xpReward={100}
/>

// Completed quiz
<QuizCard
  id="quiz-1"
  title="Money Basics Quiz"
  description="Test your knowledge"
  icon="/assets/quiz.png"
  questions={10}
  xpReward={100}
  completed={true}
  score={85}
/>
```

### StoryCard
```tsx
import StoryCard from '@/components/molecules/StoryCard';

<StoryCard
  title="FOMO Crypto Loss"
  category="Crypto Warning"
  preview="A young investor lost ₹50,000 by following crypto hype..."
  lesson="Never invest based on social media hype"
  onClick={() => router.push('/stories/crypto-fomo')}
/>
```

## 🎬 Animations

### PageTransition
```tsx
import PageTransition from '@/components/animations/PageTransition';

export default function MyPage() {
  return (
    <PageTransition>
      <div>
        Your page content
      </div>
    </PageTransition>
  );
}
```

### Animation Variants
```tsx
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/utils/animations';

// Single element
<motion.div 
  variants={fadeInUp}
  initial="initial"
  animate="animate"
>
  Content
</motion.div>

// Staggered list
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeInUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Custom Animations
```tsx
import { motion } from 'framer-motion';
import { springConfig } from '@/lib/utils/animations';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={springConfig}
>
  Interactive element
</motion.div>
```

## 🪝 Custom Hooks

### useAnimatedCounter
```tsx
import { useAnimatedCounter } from '@/lib/hooks/useAnimatedCounter';

function StatDisplay({ value }: { value: number }) {
  const animatedValue = useAnimatedCounter(value, 1500);
  
  return <div>{animatedValue}</div>;
}
```

### useScrollAnimation
```tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

function ScrollSection() {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      Content appears on scroll
    </motion.div>
  );
}
```

## 🛠️ Utility Functions

### Class Name Merger
```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'another-class'
)}>
  Content
</div>
```

### Number Formatting
```tsx
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage,
  abbreviateNumber 
} from '@/lib/utils/formatters';

formatCurrency(50000)        // ₹50,000
formatNumber(1234567)        // 12,34,567
formatPercentage(75.5)       // 75.5%
abbreviateNumber(1500000)    // 1.5L
abbreviateNumber(25000000)   // 2.5Cr
```

## 📋 Complete Page Example

```tsx
'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/animations/PageTransition';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import LessonCard from '@/components/molecules/LessonCard';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function LearningPage() {
  const lessons = [
    {
      id: 'money-basics',
      title: 'Money Basics',
      description: 'Learn fundamentals',
      icon: '/assets/money-basics.png',
      difficulty: 'Beginner' as const,
      xpReward: 50,
      progress: 3,
      totalLessons: 5,
    },
    // ... more lessons
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream to-white p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-navy mb-8 font-heading">
            Learning Modules
          </h1>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {lessons.map((lesson) => (
              <motion.div key={lesson.id} variants={fadeInUp}>
                <LessonCard {...lesson} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
```

## 🎨 Styling Tips

### Consistent Spacing
```tsx
// Use Tailwind spacing scale
<div className="p-4">      // 16px
<div className="p-6">      // 24px
<div className="p-8">      // 32px
<div className="gap-4">    // 16px gap
<div className="space-y-6"> // 24px vertical spacing
```

### Color Usage
```tsx
// Text colors
className="text-navy"           // Primary text
className="text-navy/60"        // Secondary text
className="text-money-green"    // Success/primary action

// Background colors
className="bg-cream"            // Page background
className="bg-white"            // Card background
className="bg-money-green"      // Primary button

// Gradients
className="bg-gradient-to-br from-cream to-white"
className="bg-gradient-to-r from-money-green to-money-green-light"
```

### Responsive Design
```tsx
<div className="
  text-2xl md:text-4xl        // Responsive text
  grid md:grid-cols-2         // Responsive grid
  p-4 md:p-8                  // Responsive padding
">
```

## 🚀 Performance Tips

1. **Lazy load heavy components**:
```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});
```

2. **Memoize expensive calculations**:
```tsx
const expensiveValue = useMemo(() => calculateSomething(), [dependency]);
```

3. **Debounce user input**:
```tsx
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);
```

## 📱 Mobile Optimization

```tsx
// Touch-friendly sizes
<Button size="lg">Mobile Button</Button>  // Larger tap target

// Simplified mobile layouts
<div className="grid grid-cols-1 md:grid-cols-3">
  // Single column on mobile, 3 on desktop
</div>

// Hide on mobile
<div className="hidden md:block">Desktop only</div>

// Show only on mobile
<div className="block md:hidden">Mobile only</div>
```

---

**Need help?** Check `FRONTEND_REDESIGN.md` for detailed documentation.
