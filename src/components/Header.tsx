
import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="glass-card border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {greeting()}! 👋
          </h1>
          <p className="text-white/70">Let's check your progress today</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input 
              placeholder="Search habits, progress..." 
              className="pl-10 w-80 glass border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>

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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
