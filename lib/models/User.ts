import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  onboarding: {
    completed: { type: Boolean, default: false },
    ageGroup: String,
    cityType: String,
    moneyExperience: String,
    investingExperience: String,
    goals: [String],
    monthlyIncome: Number,
    monthlyExpenses: Number,
  },
  progress: {
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String],
    completedLessons: [String],
    completedQuizzes: [String],
    streak: { type: Number, default: 0 },
    lastActive: Date,
  },
  expenses: [{
    category: String,
    amount: Number,
    description: String,
    date: Date,
  }],
  goals: [{
    title: String,
    targetAmount: Number,
    currentAmount: { type: Number, default: 0 },
    deadline: Date,
    type: String,
  }],
  createdAt: { type: Date, default: Date.now },
});

export default models.User || mongoose.model('User', UserSchema);
