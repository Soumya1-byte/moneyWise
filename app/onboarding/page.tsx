'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    ageGroup: '',
    cityType: '',
    moneyExperience: '',
    investingExperience: '',
    goals: [] as string[],
    monthlyIncome: 0,
    monthlyExpenses: 0,
  });
  const router = useRouter();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ onboarding: { ...data, completed: true } }),
    });
    router.push('/dashboard');
  };

  const toggleGoal = (goal: string) => {
    setData({
      ...data,
      goals: data.goals.includes(goal) ? data.goals.filter(g => g !== goal) : [...data.goals, goal],
    });
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="space-y-2">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center font-medium">Step {step} of 4</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-500">Help us personalize your learning experience</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Age Group</label>
                <div className="grid grid-cols-2 gap-3">
                  {['18-25', '26-35', '36-45', '45+'].map(age => (
                    <button
                      key={age}
                      onClick={() => setData({ ...data, ageGroup: age })}
                      className={`p-4 border-2 rounded-xl font-medium transition-all ${
                        data.ageGroup === age 
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">City Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Tier 1', 'Tier 2', 'Tier 3'].map(city => (
                    <button
                      key={city}
                      onClick={() => setData({ ...data, cityType: city })}
                      className={`p-4 border-2 rounded-xl font-medium transition-all ${
                        data.cityType === city 
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Experience</h2>
              <p className="text-gray-500">This helps us recommend the right content</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Money Management Experience</label>
                <div className="space-y-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setData({ ...data, moneyExperience: exp })}
                      className={`w-full p-4 border-2 rounded-xl text-left font-medium transition-all ${
                        data.moneyExperience === exp 
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Investing Experience</label>
                <div className="space-y-3">
                  {['None', 'Little', 'Moderate', 'Experienced'].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setData({ ...data, investingExperience: exp })}
                      className={`w-full p-4 border-2 rounded-xl text-left font-medium transition-all ${
                        data.investingExperience === exp 
                          ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What are your goals?</h2>
              <p className="text-gray-500">Select all that apply</p>
            </div>
            
            <div className="space-y-3">
              {['Learn basics', 'Save more', 'Understand stocks', 'Understand crypto risk', 'Build long-term wealth'].map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`w-full p-4 border-2 rounded-xl text-left font-medium transition-all flex items-center gap-3 ${
                    data.goals.includes(goal) 
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    data.goals.includes(goal) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {data.goals.includes(goal) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Details</h2>
              <p className="text-gray-500">Optional - helps us provide better recommendations</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={data.monthlyIncome || ''}
                  onChange={(e) => setData({ ...data, monthlyIncome: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Expenses (₹)</label>
                <input
                  type="number"
                  value={data.monthlyExpenses || ''}
                  onChange={(e) => setData({ ...data, monthlyExpenses: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="18000"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
            >
              Back
            </button>
          ) : <div />}
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && (!data.ageGroup || !data.cityType)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
