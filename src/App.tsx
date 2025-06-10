
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import HabitsPage from "./components/HabitsPage";
import ProgressPage from "./components/ProgressPage";
import SettingsPage from "./components/SettingsPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import OnboardingFlow from "./components/OnboardingFlow";
import { HabitProvider } from "./contexts/HabitContext";
import React from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [isOnboarded, setIsOnboarded] = React.useState(
    localStorage.getItem('habit-tracker-onboarded') === 'true'
  );

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HabitProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <BrowserRouter>
              <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/habits" element={<HabitsPage />} />
                        <Route path="/progress" element={<ProgressPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </BrowserRouter>
          </div>
        </HabitProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
