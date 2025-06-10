import React, { useState, useEffect, useContext } from 'react';
import { Plus, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HabitCard from './HabitCard';
import CreateHabitModal from './CreateHabitModal';
import { HabitContext } from '../contexts/HabitContext';
import StatsOverview from './StatsOverview';

const Dashboard = () => {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabit } = useContext(HabitContext);
  const [todayHabits, setTodayHabits] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    currentStreak: 0,
    completionRate: 0,
    totalHabits: habits.length,
  });

  useEffect(() => {
    // Filter habits for today
    const today = new Date().toLocaleDateString();
    const todayHabits = habits.filter(habit => {
      if (!habit.days) return false;
      const todayIndex = new Date().getDay();
      return habit.days[todayIndex];
    });
    setTodayHabits(todayHabits);

    // Generate recent activity (last 5 completed habits)
    const completedHabits = habits.filter(habit => habit.completed);
    const recent = completedHabits.slice(-5).map(habit => ({
      habitName: habit.name,
      date: new Date().toLocaleDateString(),
      completed: habit.completed,
    }));
    setRecentActivity(recent);

    // Calculate stats
    const calculateStats = () => {
      const totalHabits = habits.length;
      const completedHabits = habits.filter(habit => habit.completed).length;
      const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

      // Calculate current streak (simplified, needs more robust logic)
      const currentStreak = 7;

      setStats({
        currentStreak,
        completionRate,
        totalHabits,
      });
    };

    calculateStats();
  }, [habits]);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Section */}
      <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Welcome back to HabitFlow! 🚀
            </h1>
            <p className="text-white/70 text-sm lg:text-base">
              You're on track to build amazing habits. Keep up the great work!
            </p>
          </div>
          <CreateHabitModal
            trigger={
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg px-6 py-3">
                <Plus className="w-4 h-4 mr-2" />
                Add New Habit
              </Button>
            }
          />
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Today's Habits */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-2xl p-6 lg:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl lg:text-2xl font-bold text-white">Today's Habits</h2>
              <span className="text-white/60 text-sm lg:text-base">{new Date().toLocaleDateString()}</span>
            </div>
            
            {todayHabits.length === 0 ? (
              <div className="text-center py-8 lg:py-12">
                <Target className="w-12 h-12 lg:w-16 lg:h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-base lg:text-lg">No habits for today</p>
                <p className="text-white/40 text-sm lg:text-base mt-2">Create your first habit to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {todayHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={toggleHabit}
                    onEdit={updateHabit}
                    onDelete={deleteHabit}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Stats */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Streak</span>
                <span className="text-2xl font-bold text-white">{stats.currentStreak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Completion Rate</span>
                <span className="text-2xl font-bold text-green-400">{stats.completionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Total Habits</span>
                <span className="text-2xl font-bold text-white">{habits.length}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 glass rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${activity.completed ? 'bg-green-400' : 'bg-red-400'}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.habitName}</p>
                    <p className="text-white/60 text-xs">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
