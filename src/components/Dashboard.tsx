
import React from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Target, Flame, Star, Plus, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { habits, completions } = useHabits();
  const today = new Date().toISOString().split('T')[0];
  
  const todayCompletions = completions.filter(c => c.date === today);
  const completedToday = todayCompletions.length;
  const totalHabits = habits.length;

  const getWeeklyProgress = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayCompletions = completions.filter(c => c.date === dateStr).length;
      days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        date: date.getDate(),
        completion: totalHabits > 0 ? (dayCompletions / totalHabits) * 100 : 0,
        isToday: dateStr === today
      });
    }
    return days;
  };

  const weeklyProgress = getWeeklyProgress();
  const totalStreaks = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0);

  return (
    <div className="space-y-6">
      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Today's Progress - Large Card */}
        <div className="col-span-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-blue-100 font-medium mb-2">Your Progress Today</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold">{completedToday}</span>
                  <span className="text-2xl text-blue-100">/ {totalHabits}</span>
                </div>
              </div>
              <Calendar className="w-12 h-12 text-blue-200" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-blue-100">Completion Rate</span>
                <span className="font-semibold text-lg">{totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-700 shadow-lg"
                  style={{ width: totalHabits > 0 ? `${(completedToday / totalHabits) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full"></div>
        </div>

        {/* Calendar Widget */}
        <div className="col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">This Week</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    day.isToday 
                      ? 'bg-blue-500 text-white' 
                      : day.completion === 100 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {day.date}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{day.day}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        day.completion === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${day.completion}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{Math.round(day.completion)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Counter */}
        <div className="col-span-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8" />
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">STREAK</span>
          </div>
          <div className="text-3xl font-bold mb-2">{totalStreaks}</div>
          <div className="text-orange-100">Total streak days</div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Quick Actions */}
        <div className="col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl h-12 font-medium justify-start">
              <Plus className="w-5 h-5 mr-3" />
              Add New Habit
            </Button>
            <Button variant="outline" className="w-full border-2 border-gray-200 rounded-2xl h-12 font-medium hover:bg-gray-50 justify-start">
              <TrendingUp className="w-5 h-5 mr-3" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full border-2 border-gray-200 rounded-2xl h-12 font-medium hover:bg-gray-50 justify-start">
              <Target className="w-5 h-5 mr-3" />
              Set Goals
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Today's Habits</h3>
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">Start your journey!</h4>
              <p className="text-gray-500 mb-6">Create your first habit to get started</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Habit
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {habits.slice(0, 4).map(habit => (
                <HabitCard 
                  key={habit.id} 
                  habit={habit} 
                  date={today}
                  showStats={false}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
