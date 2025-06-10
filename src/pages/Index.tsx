
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import HabitsPage from '../components/HabitsPage';
import ProgressPage from '../components/ProgressPage';
import SettingsPage from '../components/SettingsPage';
import Navigation from '../components/Navigation';
import OnboardingFlow from '../components/OnboardingFlow';
import { HabitProvider } from '../contexts/HabitContext';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = React.useState(
    localStorage.getItem('habit-tracker-onboarded') === 'true'
  );

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <HabitProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
          <Router>
            <div className="flex flex-col h-screen">
              <main className="flex-1 overflow-y-auto pb-20">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/habits" element={<HabitsPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
              <Navigation />
            </div>
          </Router>
        </div>
      </div>
    </HabitProvider>
  );
};

export default Index;
