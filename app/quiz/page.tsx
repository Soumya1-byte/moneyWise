'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ProgressBar from '@/components/atoms/ProgressBar';
import PageTransition from '@/components/animations/PageTransition';
import { quizzes } from '@/data/quizzes';
import { useStore } from '@/store/useStore';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

export default function Quiz() {
  const router = useRouter();
  const { user } = useStore();
  const [activeQuiz, setActiveQuiz] = useState<(typeof quizzes)[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

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
      calculateScore();
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    if (!activeQuiz) return;
    const correct = answers.filter((a, i) => a === activeQuiz.questions[i].correct).length;
    setScore(Math.round((correct / activeQuiz.questions.length) * 100));
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

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  if (showResult && activeQuiz) {
    const correct = answers.filter((a, i) => a === activeQuiz.questions[i].correct).length;
    const total = activeQuiz.questions.length;

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-100px)]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card variant="gradient" padding="xl" className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="text-8xl mb-6"
                >
                  {score === 100 ? '🎉' : score >= 70 ? '👏' : score >= 50 ? '👍' : '💪'}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  Quiz Complete!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <p className="text-white/90 text-lg mb-4">You scored</p>
                  <div className="text-6xl font-bold text-white font-mono mb-4">
                    {correct}/{total}
                  </div>
                  <ProgressBar
                    value={score}
                    max={100}
                    variant="gradient"
                    size="lg"
                    showValue={true}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/30"
                >
                  <p className="text-white/90 text-base leading-relaxed">
                    {score === 100 && "Perfect score! You're a financial expert!"}
                    {score >= 80 && score < 100 && "Excellent work! You have strong financial knowledge."}
                    {score >= 60 && score < 80 && "Good job! Keep learning to improve further."}
                    {score < 60 && "Great effort! Review the material and try again."}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={resetQuiz}
                  >
                    Try Another Quiz
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={submitQuiz}
                  >
                    Dashboard (+{activeQuiz.xp} XP)
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (activeQuiz) {
    const q = activeQuiz.questions[currentQ];
    const isAnswered = answers[currentQ] !== undefined;
    const isCorrect = isAnswered && answers[currentQ] === q.correct;

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="ghost"
                  onClick={resetQuiz}
                >
                  ← Back
                </Button>
                <span className="text-sm font-semibold text-navy/70">
                  Question {currentQ + 1} of {activeQuiz.questions.length}
                </span>
              </div>
              <ProgressBar
                value={currentQ + 1}
                max={activeQuiz.questions.length}
                variant="animated"
                showValue={false}
              />
            </motion.div>

            {/* Question Card */}
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card padding="lg" className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
                  {q.question}
                </h2>

                {/* Answer Options */}
                <div className="space-y-3 mb-8">
                  {q.options.map((opt: string, idx: number) => {
                    const isSelected = answers[currentQ] === idx;
                    const optionIsCorrect = idx === q.correct;

                    let bgClass = 'bg-white border-2 border-cream-dark/30 hover:border-money-green/50';
                    if (isAnswered) {
                      if (isSelected && optionIsCorrect) {
                        bgClass = 'bg-money-green/10 border-2 border-money-green';
                      } else if (isSelected && !optionIsCorrect) {
                        bgClass = 'bg-red-100/50 border-2 border-red-500';
                      } else if (!isSelected && optionIsCorrect) {
                        bgClass = 'bg-money-green/10 border-2 border-money-green/50';
                      } else {
                        bgClass = 'bg-cream/30 border-2 border-cream-dark/20';
                      }
                    } else if (isSelected) {
                      bgClass = 'bg-cream/50 border-2 border-money-green';
                    }

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => !isAnswered && handleAnswer(idx)}
                        disabled={isAnswered}
                        whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                        className={`w-full p-4 text-left rounded-xl font-medium transition-all ${bgClass} disabled:cursor-default`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-money-green border-money-green' : 'border-navy/30'}`}>
                            {isSelected && <span className="text-white text-sm font-bold">✓</span>}
                          </div>
                          <span className="text-navy">{opt}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-lg border-l-4 mb-6 ${
                        isCorrect
                          ? 'bg-money-green/10 border-money-green'
                          : 'bg-red-100/50 border-red-500'
                      }`}
                    >
                      <p className="font-semibold text-navy mb-2">
                        {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </p>
                      <p className="text-navy/80 text-sm">{q.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={nextQuestion}
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      {currentQ < activeQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-3 font-heading">
              Quizzes
            </h1>
            <p className="text-lg text-navy/60 font-medium max-w-2xl">
              Test your knowledge and earn XP rewards. Challenge yourself with our carefully designed quizzes.
            </p>
          </motion.div>

          {/* Quizzes Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {quizzes.map((quiz) => {
              const isCompleted = user?.progress?.completedQuizzes?.includes(quiz.id);

              return (
                <motion.div key={quiz.id} variants={fadeInUp}>
                  <Card
                    onClick={() => setActiveQuiz(quiz)}
                    className="cursor-pointer group h-full"
                    hover={true}
                    glowEffect={!isCompleted}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-navy group-hover:text-money-green transition-colors duration-200 flex-1">
                        {quiz.title}
                      </h3>
                      {isCompleted && (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="text-2xl"
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>

                    <p className="text-navy/70 mb-6">{`${quiz.questions.length} questions`}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-cream-dark/20">
                      <div>
                        <p className="text-sm text-navy/60 mb-1">Questions</p>
                        <p className="text-2xl font-bold text-navy font-mono">{quiz.questions.length}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-navy/60 mb-1">Reward</p>
                        <p className="text-2xl font-bold text-money-green font-mono">+{quiz.xp}</p>
                      </div>
                      <motion.div
                        className="text-money-green text-3xl"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
