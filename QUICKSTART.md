# ⚡ Quick Start Guide

## 🚀 Get MoneyWise Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` file:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moneywise
JWT_SECRET=your-secret-key-min-32-chars
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open Browser
Visit: [http://localhost:3000](http://localhost:3000)

## 📋 Project Structure

```
moneywise/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── user/         # User data endpoints
│   ├── dashboard/        # Dashboard page
│   ├── learn/            # Learning modules
│   ├── quiz/             # Quiz system
│   ├── tools/            # Financial tools
│   ├── stories/          # Cautionary stories
│   └── onboarding/       # User onboarding
├── components/            # React components
│   ├── ui/               # UI components (Button, Card)
│   └── layout/           # Layout components (Navbar)
├── data/                  # Static data
│   ├── lessons.ts        # Learning content
│   ├── quizzes.ts        # Quiz questions
│   ├── stories.ts        # Real stories
│   └── tips.ts           # Daily tips & badges
├── lib/                   # Utilities
│   ├── models/           # MongoDB models
│   └── mongodb.ts        # Database connection
└── store/                 # State management
    └── useStore.ts       # Zustand store
```

## 🎯 Key Features

### 1. Authentication
- Register/Login with email & password
- JWT-based authentication
- Protected routes

### 2. Onboarding (4 Steps)
- Personal info
- Experience level
- Financial goals
- Income/expenses

### 3. Learning System
- 8 modules with 20+ lessons
- Progress tracking
- XP rewards

### 4. Quiz System
- 7 quizzes
- Instant feedback
- Explanations

### 5. Tools
- Budget Planner (50-30-20 rule)
- Risk Checker
- Expense Tracker (coming soon)
- Goal Planner (coming soon)

### 6. Stories
- 6 real cautionary tales
- Learn from mistakes
- Practical lessons

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB + Mongoose
- **Auth**: JWT
- **State**: Zustand
- **Charts**: Recharts

## 🎨 Color Palette

- Primary Green: `#4CAF50`
- Yellow: `#FFD54F`
- White: `#FFFFFF`
- Gray: `#F5F5F5`
- Black: `#212121`

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly UI

## 🔐 Security

- Passwords hashed with bcrypt
- JWT tokens (7-day expiry)
- Protected API routes
- Input validation

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
```bash
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📝 Adding New Content

### Add a New Lesson
Edit `data/lessons.ts`:
```typescript
{
  id: 'new-lesson',
  title: 'Lesson Title',
  content: 'Lesson content...',
  xp: 15,
}
```

### Add a New Quiz
Edit `data/quizzes.ts`:
```typescript
{
  id: 'new-quiz',
  moduleId: 'module-id',
  title: 'Quiz Title',
  questions: [...],
  xp: 25,
}
```

### Add a New Story
Edit `data/stories.ts`:
```typescript
{
  id: 'new-story',
  title: 'Story Title',
  category: 'Category',
  icon: '😰',
  story: 'Story content...',
  whatWentWrong: [...],
  howToAvoid: [...],
  keyRule: 'Key takeaway',
}
```

## 🐛 Common Issues

### MongoDB Connection Error
- Check connection string
- Verify network access in Atlas
- Ensure cluster is running

### Build Errors
- Delete `.next` folder
- Run `npm install` again
- Check Node.js version (18+)

### Authentication Not Working
- Clear browser cookies
- Check JWT_SECRET is set
- Verify token in localStorage

## 📞 Support

For issues or questions:
- Check existing GitHub issues
- Create new issue with details
- Include error messages and logs

## 🎉 You're Ready!

Start building financial literacy for everyone! 💰
