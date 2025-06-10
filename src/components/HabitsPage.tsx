
import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import CreateHabitModal from './CreateHabitModal';
import { Button } from '@/components/ui/button';
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react';

const HabitsPage: React.FC = () => {
  const { habits, completions } = useHabits();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const totalCompletions = completions.length;
  const activeHabits = habits.length;
  const todayCompletions = completions.filter(c => c.date === today).length;

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
          <p className="text-gray-600">Build better habits, one day at a time</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-4 py-3 shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Habit
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{activeHabits}</div>
          <div className="text-sm text-gray-500">Active Habits</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{todayCompletions}</div>
          <div className="text-sm text-gray-500">Done Today</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCompletions}</div>
          <div className="text-sm text-gray-500">Total Done</div>
        </div>
      </div>

      {/* Habits List */}
      {habits.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Journey</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Create your first habit and begin building a better version of yourself, one day at a time.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl px-8 py-3 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Habit
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              date={today}
              showStats={true}
            />
          ))}
        </div>
      )}

      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default HabitsPage;
