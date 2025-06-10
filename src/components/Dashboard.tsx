
import React from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import StatsOverview from './StatsOverview';
import { Button } from '@/components/ui/button';
import { Calendar, User, TrendingUp, Target, Flame, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { habits, completions } = useHabits();
  const today = new Date().toISOString().split('T')[0];
  
  const todayCompletions = completions.filter(c => c.date === today);
  const completedToday = todayCompletions.length;
  const totalHabits = habits.length;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning!';
    if (hour < 17) return 'Good afternoon!';
    return 'Good evening!';
  };

  const getWeeklyProgress = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayCompletions = completions.filter(c => c.date === dateStr).length;
      days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }).charAt(0),
        completion: totalHabits > 0 ? (dayCompletions / totalHabits) * 100 : 0
      });
    }
    return days;
  };

  const weeklyProgress = getWeeklyProgress();
  const totalStreaks = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0);

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting()}
          </h1>
          <p className="text-gray-600">Let's check your progress today</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {/* Main Progress Card - Spans 4 columns */}
        <div className="col-span-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm font-medium">Today's Progress</p>
                <p className="text-3xl font-bold">{completedToday}/{totalHabits}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-100">Completion Rate</span>
                <span className="font-semibold">{totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-700"
                  style={{ width: totalHabits > 0 ? `${(completedToday / totalHabits) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>

        {/* Streak Counter - Spans 2 columns */}
        <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="text-xs font-medium text-gray-500 bg-orange-50 px-2 py-1 rounded-full">STREAK</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{totalStreaks}</div>
          <div className="text-sm text-gray-500">Total days</div>
        </div>

        {/* Weekly Chart - Spans 3 columns */}
        <div className="col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">This Week</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-end justify-between h-16 space-x-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                  style={{ height: `${Math.max(day.completion, 8)}%` }}
                />
                <span className="text-xs text-gray-500 mt-2 font-medium">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Achievement - Spans 3 columns */}
        <div className="col-span-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-6 h-6" />
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">TODAY</span>
          </div>
          <div className="text-2xl font-bold mb-1">
            {Math.round((completedToday / Math.max(totalHabits, 1)) * 100)}%
          </div>
          <div className="text-green-100 text-sm">Achievement rate</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <Star className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl h-12 font-medium"
            onClick={() => {/* Navigate to create habit */}}
          >
            + Add Habit
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-gray-200 rounded-2xl h-12 font-medium hover:bg-gray-50"
            onClick={() => {/* Navigate to progress */}}
          >
            View Progress
          </Button>
        </div>
      </div>

      {/* Today's Habits */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Habits</h2>
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Start your journey!</h3>
            <p className="text-gray-500 mb-4">Create your first habit to get started</p>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-6 py-3">
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
