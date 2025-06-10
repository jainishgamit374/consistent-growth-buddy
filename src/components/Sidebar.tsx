
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Target, TrendingUp, Settings, User, Bell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Calendar, label: 'Dashboard', color: 'bg-blue-500' },
    { path: '/habits', icon: Target, label: 'My Habits', color: 'bg-green-500' },
    { path: '/progress', icon: TrendingUp, label: 'Progress', color: 'bg-purple-500' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' }
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">HabitFlow</h1>
            <p className="text-sm text-gray-500">Track your progress</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Welcome back!</h3>
            <p className="text-sm text-gray-500">Let's build great habits today</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label, color }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? color : 'bg-gray-100 group-hover:bg-gray-200'
                } transition-colors duration-200`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
          <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
          <p className="text-sm text-blue-100 mb-3">Unlock advanced analytics and features</p>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
