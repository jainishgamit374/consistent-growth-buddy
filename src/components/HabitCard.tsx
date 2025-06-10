
import React, { useState } from 'react';
import { useHabits } from '../contexts/HabitContext';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

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
    <div className={`bg-white rounded-2xl p-4 shadow-lg border-l-4 transition-all duration-300 ${
      isCompleted ? 'border-green-400 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
              isAnimating ? 'animate-bounce' : ''
            }`}
            style={{ backgroundColor: habit.color + '20' }}
          >
            {getHabitIcon(habit.icon)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-500">{habit.description}</p>
            )}
            {showStats && (
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-xs text-gray-400 flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  {stats.currentStreak} day streak
                </span>
                <span className="text-xs text-gray-400">
                  {Math.round(stats.completionRate)}% this week
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleToggle}
          variant={isCompleted ? "default" : "outline"}
          size="sm"
          className={`rounded-full w-12 h-12 p-0 transition-all duration-300 ${
            isCompleted 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'hover:bg-green-50 border-green-200'
          } ${isAnimating ? 'scale-125' : ''}`}
        >
          <Check className={`w-5 h-5 transition-all duration-300 ${
            isCompleted ? 'text-white' : 'text-green-500'
          }`} />
        </Button>
      </div>
      
      {isCompleted && (
        <div className="mt-3 p-2 bg-green-100 rounded-lg">
          <p className="text-sm text-green-700 font-medium">
            🎉 Great job! Keep the streak going!
          </p>
        </div>
      )}
    </div>
  );
};

export default HabitCard;
