
import React from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Card } from '@/components/ui/card';
import { TrendingUp, Target, Calendar, Flame } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const { habits, completions, getHabitStats } = useHabits();

  const getWeeklyData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayCompletions = completions.filter(c => c.date === dateStr).length;
      
      days.push({
        date: dateStr,
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        completions: dayCompletions,
        total: habits.length,
        percentage: habits.length > 0 ? (dayCompletions / habits.length) * 100 : 0
      });
    }
    
    return days;
  };

  const weeklyData = getWeeklyData();
  const totalCompletions = completions.length;
  const averageCompletion = habits.length > 0 
    ? Math.round((totalCompletions / (habits.length * 30)) * 100) 
    : 0;
  const totalStreaks = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0);

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Progress Overview</h1>
        <p className="text-gray-600">Track your habit completion patterns</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6" />
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">TOTAL</span>
          </div>
          <div className="text-3xl font-bold mb-1">{totalCompletions}</div>
          <div className="text-blue-100">Completions</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-6 h-6" />
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">STREAK</span>
          </div>
          <div className="text-3xl font-bold mb-1">{totalStreaks}</div>
          <div className="text-green-100">Total Days</div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">
                {day.day}
              </div>
              <div className="flex-1 flex items-center space-x-3">
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${day.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-12">
                  {day.completions}/{day.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habit Performance */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Habit Performance</h3>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500">No habits to analyze yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.map(habit => {
              const stats = getHabitStats(habit.id);
              return (
                <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg"
                      style={{ backgroundColor: habit.color + '30' }}
                    >
                      {habit.icon === 'water' ? '💧' : '⭐'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{habit.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Flame className="w-3 h-3 mr-1" />
                        {stats.currentStreak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {Math.round(stats.completionRate)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {stats.totalCompletions} done
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
