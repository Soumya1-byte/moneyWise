'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { quizzes } from '@/data/quizzes';
import { useStore } from '@/store/useStore';

export default function Quiz() {
  const router = useRouter();
  const { user } = useStore();
  const [activeQuiz, setActiveQuiz] = useState<typeof quizzes[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQ < activeQuiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const submitQuiz = async () => {
    if (!activeQuiz) return;
    const token = localStorage.getItem('token');
    await fetch('/api/user/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ quizId: activeQuiz.id, xp: activeQuiz.xp }),
    });
    router.push('/dashboard');
  };

  if (showResult && activeQuiz) {
    const correct = answers.filter((a, i) => a === activeQuiz.questions[i].correct).length;
    const total = activeQuiz.questions.length;
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Card className="text-center">
            <div className="text-6xl mb-4">{correct === total ? '🎉' : correct >= total/2 ? '👍' : '📚'}</div>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-2xl mb-6">You scored {correct}/{total}</p>
            <Button onClick={submitQuiz}>Continue (+{activeQuiz.xp} XP)</Button>
          </Card>
        </div>
      </div>
    );
  }

  if (activeQuiz) {
    const q = activeQuiz.questions[currentQ];
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="mb-4 flex justify-between items-center">
            <Button variant="secondary" onClick={() => { setActiveQuiz(null); setCurrentQ(0); setAnswers([]); }}>← Back</Button>
            <span className="text-gray-600">Question {currentQ + 1}/{activeQuiz.questions.length}</span>
          </div>
          <Card>
            <h2 className="text-2xl font-bold mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${answers[currentQ] === idx ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {answers[currentQ] !== undefined && (
              <div className="mt-6">
                <div className={`p-4 rounded-lg ${answers[currentQ] === q.correct ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  <p className="font-semibold mb-2">{answers[currentQ] === q.correct ? '✅ Correct!' : '❌ Incorrect'}</p>
                  <p>{q.explanation}</p>
                </div>
                <Button onClick={nextQuestion} className="mt-4">
                  {currentQ < activeQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-2">Quizzes 🧠</h1>
        <p className="text-gray-600 mb-8">Test your knowledge and earn XP</p>
        <div className="grid md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const isCompleted = user?.progress?.completedQuizzes?.includes(quiz.id);
            return (
              <Card key={quiz.id} onClick={() => setActiveQuiz(quiz)} className="hover:scale-105 transition-transform">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{quiz.title}</h3>
                  {isCompleted && <span className="text-2xl">✅</span>}
                </div>
                <p className="text-gray-600 mb-4">{quiz.questions.length} questions</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">+{quiz.xp} XP</span>
                  <span className="text-gray-500">→</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
