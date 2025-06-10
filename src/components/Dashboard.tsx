
import React from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import StatsOverview from './StatsOverview';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { habits, completions } = useHabits();
  const today = new Date().toISOString().split('T')[0];
  
  const todayCompletions = completions.filter(c => c.date === today);
  const completedToday = todayCompletions.length;
  const totalHabits = habits.length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! ☀️';
    if (hour < 17) return 'Good afternoon! 🌤️';
    return 'Good evening! 🌙';
  };

  const motivationalQuotes = [
    "Small steps lead to big changes! 🌱",
    "Consistency is the key to success! 🔑",
    "Every habit completed is a victory! 🎉",
    "You're building a better version of yourself! ✨",
    "Progress, not perfection! 📈"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {greeting()}
          </h1>
          <p className="text-gray-600 mt-1">{randomQuote}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 mb-1">Today's Progress</p>
            <p className="text-3xl font-bold">
              {completedToday}/{totalHabits}
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ 
                width: totalHabits > 0 ? `${(completedToday / totalHabits) * 100}%` : '0%' 
              }}
            />
          </div>
          <p className="text-sm text-green-100 mt-2">
            {totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}% completed
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Today's Habits */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Habits</h2>
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No habits yet!</h3>
            <p className="text-gray-500 mb-4">Create your first habit to get started</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-6 py-3">
              Create Your First Habit
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                date={today}
                showStats={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
