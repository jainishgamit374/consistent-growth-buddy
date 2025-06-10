
import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Button } from '@/components/ui/button';
import { Check, Star, TrendingUp } from 'lucide-react';

interface HabitCardProps {
  habit: any;
  date: string;
  showStats?: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, date, showStats = true }) => {
  const { completions, toggleHabitCompletion, getHabitStats } = useHabits();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isCompleted = completions.some(
    c => c.habitId === habit.id && c.date === date && c.completed
  );

  const stats = getHabitStats(habit.id);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleHabitCompletion(habit.id, date);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getHabitIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      water: '💧',
      exercise: '🏃‍♂️',
      book: '📚',
      meditation: '🧘‍♀️',
      sleep: '😴',
      food: '🥗',
      work: '💼',
      music: '🎵',
      art: '🎨',
      code: '💻',
      default: '⭐'
    };
    return iconMap[iconName] || iconMap.default;
  };

  return (
    <div className={`bg-white rounded-2xl p-4 border-2 transition-all duration-300 ${
      isCompleted 
        ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm' 
        : 'border-gray-100 hover:border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 ${
              isAnimating ? 'animate-bounce' : ''
            } ${isCompleted ? 'bg-green-100' : 'bg-gray-50'}`}
            style={{ backgroundColor: isCompleted ? undefined : habit.color + '20' }}
          >
            {getHabitIcon(habit.icon)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-500 mt-1">{habit.description}</p>
            )}
            {showStats && (
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-gray-400 flex items-center bg-gray-50 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 mr-1" />
                  {stats.currentStreak} day streak
                </span>
                <span className="text-xs text-gray-400 flex items-center bg-blue-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round(stats.completionRate)}%
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleToggle}
          variant={isCompleted ? "default" : "outline"}
          size="sm"
          className={`rounded-2xl w-14 h-14 p-0 transition-all duration-300 border-2 ${
            isCompleted 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-green-500' 
              : 'hover:bg-green-50 border-green-200 hover:border-green-300'
          } ${isAnimating ? 'scale-110' : ''}`}
        >
          <Check className={`w-6 h-6 transition-all duration-300 ${
            isCompleted ? 'text-white' : 'text-green-500'
          }`} />
        </Button>
      </div>
      
      {isCompleted && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
          <p className="text-sm text-green-700 font-medium flex items-center">
            🎉 <span className="ml-2">Awesome! Keep the momentum going!</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default HabitCard;
