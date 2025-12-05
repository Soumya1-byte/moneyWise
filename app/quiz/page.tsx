'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="text-7xl mb-6">{correct === total ? '🎉' : correct >= total/2 ? '👍' : '📚'}</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <p className="text-3xl text-gray-700 mb-8">You scored {correct}/{total}</p>
            <button
              onClick={submitQuiz}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => { setActiveQuiz(null); setCurrentQ(0); setAnswers([]); }}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
            >
              ← Back
            </button>
            <span className="text-gray-600 font-medium">Question {currentQ + 1}/{activeQuiz.questions.length}</span>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">{q.question}</h2>
            
            <div className="space-y-3">
              {q.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-5 text-left border-2 rounded-xl font-medium transition-all ${
                    answers[currentQ] === idx 
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            
            {answers[currentQ] !== undefined && (
              <div className="space-y-4 pt-4">
                <div className={`p-5 rounded-xl ${
                  answers[currentQ] === q.correct 
                    ? 'bg-green-50 border-2 border-green-300' 
                    : 'bg-red-50 border-2 border-red-300'
                }`}>
                  <p className="font-semibold text-lg mb-2">
                    {answers[currentQ] === q.correct ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  <p className="text-gray-700">{q.explanation}</p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quizzes</h1>
          <p className="text-gray-600 text-lg">Test your knowledge and earn XP</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const isCompleted = user?.progress?.completedQuizzes?.includes(quiz.id);
            return (
              <button
                key={quiz.id}
                onClick={() => setActiveQuiz(quiz)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {quiz.title}
                  </h3>
                  {isCompleted && <span className="text-3xl">✅</span>}
                </div>
                <p className="text-gray-600 mb-4">{quiz.questions.length} questions</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold text-lg">+{quiz.xp} XP</span>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
