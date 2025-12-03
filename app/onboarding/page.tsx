'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-2 flex-1 mx-1 rounded ${s <= step ? 'bg-green-500' : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">Step {step} of 4</p>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Age Group</label>
                <div className="grid grid-cols-2 gap-3">
                  {['18-25', '26-35', '36-45', '45+'].map(age => (
                    <button
                      key={age}
                      onClick={() => setData({ ...data, ageGroup: age })}
                      className={`p-4 border-2 rounded-lg ${data.ageGroup === age ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">City Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Tier 1', 'Tier 2', 'Tier 3'].map(city => (
                    <button
                      key={city}
                      onClick={() => setData({ ...data, cityType: city })}
                      className={`p-4 border-2 rounded-lg ${data.cityType === city ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
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
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Experience</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Money Management Experience</label>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setData({ ...data, moneyExperience: exp })}
                      className={`w-full p-4 border-2 rounded-lg text-left ${data.moneyExperience === exp ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Investing Experience</label>
                <div className="space-y-2">
                  {['None', 'Little', 'Moderate', 'Experienced'].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setData({ ...data, investingExperience: exp })}
                      className={`w-full p-4 border-2 rounded-lg text-left ${data.investingExperience === exp ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
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
          <div>
            <h2 className="text-2xl font-bold mb-6">What are your goals?</h2>
            <p className="text-gray-600 mb-4">Select all that apply</p>
            <div className="space-y-2">
              {['Learn basics', 'Save more', 'Understand stocks', 'Understand crypto risk', 'Build long-term wealth'].map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`w-full p-4 border-2 rounded-lg text-left ${data.goals.includes(goal) ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                >
                  <span className="mr-2">{data.goals.includes(goal) ? '✅' : '⬜'}</span>
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Financial Details (Optional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Monthly Income (₹)</label>
                <input
                  type="number"
                  value={data.monthlyIncome || ''}
                  onChange={(e) => setData({ ...data, monthlyIncome: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="25000"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Monthly Expenses (₹)</label>
                <input
                  type="number"
                  value={data.monthlyExpenses || ''}
                  onChange={(e) => setData({ ...data, monthlyExpenses: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
                  placeholder="18000"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Get Started</Button>
          )}
        </div>
      </div>
    </div>
  );
}
