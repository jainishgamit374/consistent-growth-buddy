
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number[];
  targetCount?: number;
  reminderTime?: string;
  createdAt: Date;
  completedDates: string[];
  streak: number;
  longestStreak: number;
  notes?: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
  note?: string;
}

interface HabitContextType {
  habits: Habit[];
  completions: HabitCompletion[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'longestStreak'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: string, note?: string) => void;
  getHabitStats: (habitId: string) => {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    totalCompletions: number;
  };
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habit-tracker-habits');
    const savedCompletions = localStorage.getItem('habit-tracker-completions');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    if (savedCompletions) {
      setCompletions(JSON.parse(savedCompletions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habit-tracker-habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('habit-tracker-completions', JSON.stringify(completions));
  }, [completions]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'longestStreak'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      completedDates: [],
      streak: 0,
      longestStreak: 0,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setCompletions(prev => prev.filter(completion => completion.habitId !== id));
  };

  const toggleHabitCompletion = (habitId: string, date: string, note?: string) => {
    const existingCompletion = completions.find(
      c => c.habitId === habitId && c.date === date
    );

    if (existingCompletion) {
      setCompletions(prev => prev.filter(
        c => !(c.habitId === habitId && c.date === date)
      ));
    } else {
      setCompletions(prev => [...prev, {
        habitId,
        date,
        completed: true,
        note
      }]);
    }

    // Update habit streaks
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const habitCompletions = completions.filter(c => c.habitId === habitId);
      const currentStreak = calculateCurrentStreak(habitCompletions, date);
      const longestStreak = Math.max(habit.longestStreak, currentStreak);
      
      updateHabit(habitId, { 
        streak: currentStreak, 
        longestStreak,
        completedDates: [...habit.completedDates, date]
      });
    }
  };

  const calculateCurrentStreak = (completions: HabitCompletion[], currentDate: string): number => {
    const sortedDates = completions
      .map(c => c.date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let streak = 0;
    const today = new Date(currentDate);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getHabitStats = (habitId: string) => {
    const habitCompletions = completions.filter(c => c.habitId === habitId);
    const habit = habits.find(h => h.id === habitId);
    
    const currentStreak = habit?.streak || 0;
    const longestStreak = habit?.longestStreak || 0;
    const totalCompletions = habitCompletions.length;
    
    const daysSinceCreation = habit ? 
      Math.floor((Date.now() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 1;
    const completionRate = totalCompletions / daysSinceCreation * 100;

    return {
      currentStreak,
      longestStreak,
      completionRate: Math.min(completionRate, 100),
      totalCompletions
    };
  };

  return (
    <HabitContext.Provider value={{
      habits,
      completions,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleHabitCompletion,
      getHabitStats
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
