# 💰 MoneyWise - Financial Literacy Web Application

MoneyWise is a comprehensive financial literacy platform designed for beginners, especially from tier 2 and tier 3 cities, to learn money management, investing basics, stock market fundamentals, and crypto risks in simple language.

## 🎯 Mission

Help people avoid financial losses due to hype, FOMO, fake gurus, or risky decisions by providing safe, responsible, and beginner-friendly financial education.

## ✨ Features

### 📚 Learning Modules
- **Money Basics**: Income, expenses, saving, budgeting, emergency funds
- **Budgeting & Saving**: 50-30-20 rule, saving habits
- **Banking & Safety**: Common scams, fraud prevention
- **Investing Basics**: Risk vs return, investment fundamentals
- **Stock Market 101**: Understanding stocks, price movements
- **Mutual Funds & SIPs**: Beginner-friendly investing
- **Crypto - High Risk Zone**: Understanding crypto dangers
- **Financial Planning**: Goal setting, long-term planning

### 🧠 Interactive Quizzes
- Multiple-choice questions with instant feedback
- Detailed explanations for each answer
- XP rewards for completion
- Progress tracking

### 🛠️ Practical Tools
- **Budget Planner**: 50-30-20 budget calculator
- **Risk Checker**: Investment risk assessment
- **Expense Tracker**: Track daily expenses
- **Goal Planner**: Set and track financial goals

### 📖 Real Stories
- Learn from others' financial mistakes
- FOMO crypto losses
- Telegram scams
- Panic selling
- Credit card debt traps
- And more...

### 🎮 Gamification
- XP system and levels
- Achievement badges
- Progress tracking
- Daily tips
- Streak system

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Charts**: Recharts

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Soumya1-byte/moneyWise.git
cd moneywise
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to `.env.local` as `MONGODB_URI`

## 📱 Features Overview

### Onboarding Flow
New users complete a 4-step onboarding:
1. Personal info (age, city type)
2. Experience level (money & investing)
3. Financial goals
4. Income & expenses (optional)

### Dashboard
- User level and XP
- Completed lessons count
- Earned badges
- Daily financial tip
- Quick access to all features

### Learning System
- 8 comprehensive modules
- 20+ lessons with real examples
- Progress tracking
- XP rewards

### Quiz System
- 7 quizzes covering all topics
- Instant feedback
- Explanations for each answer
- XP rewards

## 🎨 Design Philosophy

- **Beginner-Friendly**: Simple language, no jargon
- **Mobile-First**: Optimized for all devices
- **Clean UI**: Calming colors, easy navigation
- **Practical**: Real examples from Indian context
- **Safe**: Emphasis on risk awareness

## 🔒 Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- Input validation

## 📈 Future Enhancements

- Expense tracking with charts
- Goal progress visualization
- Community forum
- Expert Q&A section
- Regional language support
- Mobile app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ to help people make better financial decisions.

## 🙏 Acknowledgments

This project was created to prevent others from making the same financial mistakes many beginners make, especially in tier 2 and tier 3 cities where financial literacy resources are limited.

---

**Remember**: The goal is NOT to encourage trading. The goal is to prevent people from losing money due to hype, FOMO, or risky decisions. Learn first, invest later! 🎯
