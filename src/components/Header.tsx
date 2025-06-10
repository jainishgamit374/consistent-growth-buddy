
import React from 'react';
import { Search, Bell, User, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthModal from './AuthModal';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="glass-card border-b border-white/10 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden rounded-full hover:bg-white/10 text-white/60 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-white">
              {greeting()}! 👋
            </h1>
            <p className="text-white/70 text-sm lg:text-base">Let's check your progress today</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Search - hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input 
              placeholder="Search habits, progress..." 
              className="pl-10 w-64 lg:w-80 glass border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          {/* Mobile search button */}
          <Button variant="ghost" size="sm" className="md:hidden rounded-full hover:bg-white/10 text-white/60 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>

          {/* Actions */}
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-white/60 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-white/60 hover:text-white">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <AuthModal
            trigger={
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
