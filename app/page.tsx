'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

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
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  MoneyWise
                </h1>
                <p className="text-2xl text-gray-700 font-light">
                  Your journey to financial freedom starts here
                </p>
              </div>

              <div className="space-y-6 pt-8">
                {[
                  { emoji: '🎓', text: 'Learn investing basics' },
                  { emoji: '💰', text: 'Track expenses & budget' },
                  { emoji: '🛡️', text: 'Avoid financial mistakes' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <span className="text-3xl">{item.emoji}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {isLogin ? 'Welcome back' : 'Get started'}
                </h2>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  )}

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />

                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create account'}
                  </button>
                </form>

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full mt-6 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  {isLogin ? 'Need an account? Sign up' : 'Have an account? Sign in'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
