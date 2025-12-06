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
    <div className="min-h-screen bg-gradient-to-br from-[#E0E1DD] via-[#F8F9FA] to-[#E0E1DD]">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-6xl font-semibold text-[#0D1B2A] tracking-tight">
                  MoneyWise
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Master financial literacy through structured learning, practical tools, and real-world insights
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { text: 'Structured learning paths' },
                  { text: 'Interactive financial tools' },
                  { text: 'Risk-aware education' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2FCF89]"></div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="bg-white/50 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  {isLogin ? 'Welcome back' : 'Get started'}
                </h2>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                    />
                  )}

                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                  />

                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FCF89]/20 focus:border-[#2FCF89] outline-none transition"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#2FCF89] text-white font-medium rounded-xl hover:bg-[#28B879] transition-all shadow-[0_4px_12px_rgba(47,207,137,0.3)] hover:shadow-[0_6px_20px_rgba(47,207,137,0.4)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create account'}
                  </button>
                </form>

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full mt-6 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
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
