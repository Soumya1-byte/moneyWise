'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Card from '@/components/atoms/Card';
import IconWrapper from '@/components/atoms/IconWrapper';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);

      if (!data.user.onboarding?.completed) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-money-green/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-yellow/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Hero content */}
        <motion.div
          className="text-center md:text-left"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-navy mb-4 font-heading">
              MoneyWise
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-money-green to-money-green-light rounded-full" />
          </motion.div>

          <motion.p variants={fadeInUp} className="text-xl text-navy/70 mb-8 leading-relaxed">
            Master money management, learn smart investing, and avoid costly financial mistakes
          </motion.p>

          <motion.div variants={fadeInUp} className="space-y-4">
            {[
              { icon: '/assets/check.png', title: 'Beginner Friendly', desc: 'Simple language, no jargon' },
              { icon: '/assets/shield.png', title: 'Safe & Responsible', desc: 'Learn to avoid scams and risks' },
              { icon: '/assets/target.png', title: 'Practical Tools', desc: 'Budget planner, expense tracker, and more' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-xl"
                whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.9)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <IconWrapper src={feature.icon} alt={feature.title} size="md" />
                <div>
                  <h3 className="font-semibold text-lg text-navy">{feature.title}</h3>
                  <p className="text-navy/60 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Auth form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card variant="glass" padding="lg" className="backdrop-blur-xl">
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-navy font-heading"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isLogin ? 'Welcome Back' : 'Start Your Journey'}
            </motion.h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <Input
                  label="Name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              )}

              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />

              <Input
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />

              <Button type="submit" isLoading={loading} className="w-full" size="lg">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-money-green hover:text-money-green-dark font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Don&apos;t have an account? Sign up" : 'Already have an account? Login'}
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
