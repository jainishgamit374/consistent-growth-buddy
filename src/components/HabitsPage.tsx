
import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import HabitCard from './HabitCard';
import CreateHabitModal from './CreateHabitModal';
import { Button } from '@/components/ui/button';

const HabitsPage: React.FC = () => {
  const { habits } = useHabits();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Habits</h1>
          <p className="text-gray-600">Manage and track your daily habits</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-4 py-2"
        >
          + Add Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Journey</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Create your first habit and begin building a better version of yourself, one day at a time.
          </p>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl px-8 py-3"
          >
            Create Your First Habit
          </Button>
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
