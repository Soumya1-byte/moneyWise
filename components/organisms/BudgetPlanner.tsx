'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon?: string;
}

interface BudgetPlannerProps {
  categories?: BudgetCategory[];
  totalIncome?: number;
  onSave?: (budgets: BudgetCategory[]) => void;
}

export default function BudgetPlanner({
  categories = [
    { id: '1', name: 'Housing', budget: 1200, spent: 1150, color: '#00C46A', icon: '/assets/budgeting.png' },
    { id: '2', name: 'Food', budget: 400, spent: 320, color: '#FFE28A', icon: '/assets/budgeting.png' },
    { id: '3', name: 'Transportation', budget: 300, spent: 280, color: '#FF6B6B', icon: '/assets/budgeting.png' },
    { id: '4', name: 'Entertainment', budget: 200, spent: 180, color: '#4ECDC4', icon: '/assets/budgeting.png' },
    { id: '5', name: 'Savings', budget: 500, spent: 500, color: '#45B7D1', icon: '/assets/budgeting.png' },
  ],
  totalIncome = 3500,
  onSave,
}: BudgetPlannerProps) {
  const [budgets, setBudgets] = useState(categories);
  const [editing, setEditing] = useState(false);

  const totalBudgeted = budgets.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgets.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalIncome - totalSpent;
  const chartData = budgets.map((cat) => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

  const handleCategoryChange = (id: string, field: string, value: number) => {
    setBudgets(
      budgets.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleSave = () => {
    onSave?.(budgets);
    setEditing(false);
  };

  return (
    <motion.div
      className="space-y-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-navy font-heading">
            Budget Planner
          </h2>
          {!editing && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
        <p className="text-navy/60">
          Plan your spending and track your financial goals
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Monthly Income', value: totalIncome, color: 'money-green' },
          {
            label: 'Total Budgeted',
            value: totalBudgeted,
            color: 'accent-yellow',
          },
          { label: 'Total Spent', value: totalSpent, color: 'red-500' },
          {
            label: 'Remaining',
            value: remaining,
            color: remaining > 0 ? 'money-green' : 'red-500',
          },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="glass" padding="md" className="text-center">
              <p className="text-xs font-semibold text-navy/70 uppercase mb-2">
                {metric.label}
              </p>
              <p className={`text-2xl font-bold font-mono text-${metric.color}`}>
                ${metric.value.toLocaleString()}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart and Categories Grid */}
      <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <Card variant="default" padding="lg" className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'rgba(10, 26, 47, 0.9)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: '20px',
                }}
                formatter={(value) => (
                  <span className="text-xs text-navy/70">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Categories List */}
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
        >
          {budgets.map((category, i) => {
            const percentage = Math.round((category.spent / category.budget) * 100);
            const isOverBudget = category.spent > category.budget;

            return (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  variant="minimal"
                  padding="md"
                  className={`${isOverBudget ? 'border-red-300' : 'border-navy/10'}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {category.icon && (
                          <Image
                            src={category.icon}
                            alt={category.name}
                            width={20}
                            height={20}
                          />
                        )}
                        <span className="font-semibold text-navy">
                          {category.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          isOverBudget ? 'text-red-600' : 'text-money-green'
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>

                    {editing ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          type="number"
                          value={category.budget}
                          onChange={(e) =>
                            handleCategoryChange(
                              category.id,
                              'budget',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="Budget"
                          variant="minimal"
                        />
                        <Input
                          type="number"
                          value={category.spent}
                          onChange={(e) =>
                            handleCategoryChange(
                              category.id,
                              'spent',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          placeholder="Spent"
                          variant="minimal"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-between text-xs text-navy/60 mb-2">
                        <span>${category.spent.toLocaleString()} spent</span>
                        <span>Budget: ${category.budget.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="w-full h-2 bg-cream-dark/20 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          isOverBudget
                            ? 'bg-red-500'
                            : 'bg-gradient-to-r from-money-green to-money-green-light'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      {editing && (
        <motion.div
          variants={fadeInUp}
          className="flex gap-4 justify-end"
        >
          <Button
            variant="ghost"
            size="md"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
