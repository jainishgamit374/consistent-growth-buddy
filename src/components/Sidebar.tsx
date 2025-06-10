
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Target, TrendingUp, Settings, User, Bell, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import PaymentPlansModal from './PaymentPlansModal';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Calendar, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/habits', icon: Target, label: 'My Habits', color: 'from-green-500 to-green-600' },
    { path: '/progress', icon: TrendingUp, label: 'Progress', color: 'from-purple-500 to-purple-600' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-600' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div className="w-72 h-screen glass-card border-r border-white/10 flex flex-col shadow-xl">
      {/* Close button for mobile */}
      <div className="flex justify-between items-center p-4 lg:hidden">
        <div></div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white/70 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HabitFlow</h1>
            <p className="text-sm text-white/60">Track your progress</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <AuthModal
            trigger={
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            }
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white">Welcome back!</h3>
            <p className="text-sm text-white/60">Let's build great habits today</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-white/60 hover:text-white">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map(({ path, icon: Icon, label, color }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'glass text-white shadow-lg border border-white/20' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? `bg-gradient-to-r ${color}` : 'bg-white/10 group-hover:bg-white/20'
                } transition-all duration-200 shadow-lg`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/70'}`} />
                </div>
                <span className="font-medium">{label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full shadow-sm"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section - Upgrade */}
      <div className="p-6 border-t border-white/10">
        <div className="glass-card rounded-2xl p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-white/20">
          <h4 className="font-semibold mb-1 text-white">Upgrade to Pro</h4>
          <p className="text-sm text-white/70 mb-3">Unlock advanced analytics and features</p>
          <PaymentPlansModal
            trigger={
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg">
                Upgrade Now
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
