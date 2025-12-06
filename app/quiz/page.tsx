'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PremiumNavbar from '@/components/premium/PremiumNavbar';
import { quizzes } from '@/data/quizzes';
import { useStore } from '@/store/useStore';

export default function Quiz() {
  const router = useRouter();
  const { user } = useStore();
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQ < activeQuiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const submitQuiz = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quizId: activeQuiz.id, xp: activeQuiz.xp }),
    });
    router.push('/dashboard');
  };

  if (showResult) {
    const correct = answers.filter((a, i) => a === activeQuiz.questions[i].correct).length;
    const total = activeQuiz.questions.length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2FCF89]/10 to-[#2FCF89]/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#2FCF89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">Quiz Complete</h2>
            <p className="text-5xl font-semibold text-gray-900 mb-8">{correct}/{total}</p>
            <button
              onClick={submitQuiz}
              className="px-8 py-3 rounded-xl bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium shadow-[0_4px_12px_rgba(47,207,137,0.3)] hover:shadow-[0_6px_20px_rgba(47,207,137,0.4)] transition-all"
            >
              Continue (+{activeQuiz.xp} XP)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const q = activeQuiz.questions[currentQ];
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
        <PremiumNavbar />
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => { setActiveQuiz(null); setCurrentQ(0); setAnswers([]); }}
              className="px-4 py-2 rounded-xl bg-white/50 hover:bg-white/70 text-gray-700 font-medium transition-all text-sm"
            >
              ← Back
            </button>
            <span className="text-sm text-gray-500">Question {currentQ + 1}/{activeQuiz.questions.length}</span>
          </div>
          
          <div className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">{q.question}</h2>
            
            <div className="space-y-3">
              {q.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 text-left border rounded-xl font-medium transition-all text-sm ${
                    answers[currentQ] === idx 
                      ? 'border-[#2FCF89] bg-[#2FCF89]/5 text-gray-900' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            
            {answers[currentQ] !== undefined && (
              <div className="space-y-4 pt-4">
                <div className={`p-5 rounded-xl border ${
                  answers[currentQ] === q.correct 
                    ? 'bg-[#2FCF89]/5 border-[#2FCF89]/20' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className="font-semibold text-sm mb-2 text-gray-900">
                    {answers[currentQ] === q.correct ? 'Correct' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-gray-600">{q.explanation}</p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full px-6 py-3 rounded-xl bg-[#2FCF89] hover:bg-[#28B879] text-white font-medium shadow-[0_4px_12px_rgba(47,207,137,0.3)] hover:shadow-[0_6px_20px_rgba(47,207,137,0.4)] transition-all"
                >
                  {currentQ < activeQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <PremiumNavbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Quizzes</h1>
          <p className="text-sm text-gray-500">Test your knowledge and earn experience</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const isCompleted = user?.progress?.completedQuizzes?.includes(quiz.id);
            return (
              <button
                key={quiz.id}
                onClick={() => setActiveQuiz(quiz)}
                className="bg-white/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all text-left"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {quiz.title}
                  </h3>
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-[#2FCF89]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#2FCF89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">{quiz.questions.length} questions</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">+{quiz.xp} XP</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
