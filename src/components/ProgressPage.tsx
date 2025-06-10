
import React from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Card } from '@/components/ui/card';

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

  return (
    <div className="p-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Progress Overview</h1>
        <p className="text-gray-600">Track your habit completion patterns</p>
      </div>

      {/* Weekly Chart */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week</h3>
        <div className="space-y-3">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 w-8">
                  {day.day}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${day.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {day.completions}/{day.total}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalCompletions}</div>
          <div className="text-sm text-gray-600">Total Completions</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{averageCompletion}%</div>
          <div className="text-sm text-gray-600">Monthly Average</div>
        </Card>
      </div>

      {/* Habit Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Habit Performance</h3>
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
                <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ backgroundColor: habit.color + '30' }}
                    >
                      {habit.icon === 'water' ? '💧' : '⭐'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{habit.name}</div>
                      <div className="text-sm text-gray-500">
                        {stats.currentStreak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">
                      {Math.round(stats.completionRate)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {stats.totalCompletions} completions
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProgressPage;
