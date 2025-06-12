
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useHabits } from '../contexts/HabitContext';

const SettingsPage: React.FC = () => {
  const { habits, completions } = useHabits();

  const exportData = () => {
    const data = {
      habits,
      completions,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('habit-tracker-onboarded');
    window.location.reload();
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all your habit data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Customize your habit tracking experience</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">👤</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">Habit Tracker User</div>
            <div className="text-sm text-gray-500">
              {habits.length} active habits • {completions.length} total completions
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Daily Reminders</div>
              <div className="text-sm text-gray-500">Get notified about your habits</div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">Achievement Alerts</div>
              <div className="text-sm text-gray-500">Celebrate your streaks and milestones</div>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button
            onClick={exportData}
            variant="outline"
            className="w-full justify-start rounded-xl"
          >
            📁 Export Your Data
          </Button>
          <Button
            onClick={resetOnboarding}
            variant="outline"
            className="w-full justify-start rounded-xl"
          >
            🔄 View Onboarding Again
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div>Version 1.0.0</div>
          <div>Built with ❤️ for better habits</div>
          <div>© 2024 HabitFlow</div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <Button
          onClick={clearAllData}
          variant="destructive"
          className="w-full rounded-xl"
        >
          🗑️ Delete All Data
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This will permanently delete all your habits and progress data
        </p>
      </Card>
    </div>
  );
};

export default SettingsPage;
