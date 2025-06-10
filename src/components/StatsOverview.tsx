
import React from 'react';
import { useHabits } from '../contexts/HabitContext';

const StatsOverview: React.FC = () => {
  const { habits, completions } = useHabits();
  
  const calculateWeeklyStats = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekCompletions = completions.filter(c => {
      const date = new Date(c.date);
      return date >= oneWeekAgo && date <= today;
    });
    
    const totalPossible = habits.length * 7;
    const completionRate = totalPossible > 0 ? (weekCompletions.length / totalPossible) * 100 : 0;
    
    return {
      completions: weekCompletions.length,
      totalPossible,
      rate: Math.round(completionRate)
    };
  };

  const getTotalStreak = () => {
    return habits.reduce((total, habit) => total + habit.streak, 0);
  };

  const getLongestStreak = () => {
    return Math.max(...habits.map(h => h.longestStreak), 0);
  };

  const weeklyStats = calculateWeeklyStats();

  const statCards = [
    {
      title: 'Active Habits',
      value: habits.length,
      icon: '🎯',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Weekly Rate',
      value: `${weeklyStats.rate}%`,
      icon: '📊',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Total Streaks',
      value: getTotalStreak(),
      icon: '🔥',
      color: 'from-orange-400 to-orange-600'
    },
    {
      title: 'Best Streak',
      value: getLongestStreak(),
      icon: '🏆',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Progress</h2>
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 text-white`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm opacity-90">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
