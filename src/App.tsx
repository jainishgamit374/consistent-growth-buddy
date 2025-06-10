
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
import Navigation from "./components/Navigation";
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
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen">
              <BrowserRouter>
                <div className="flex flex-col h-screen">
                  <main className="flex-1 overflow-y-auto pb-20">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/habits" element={<HabitsPage />} />
                      <Route path="/progress" element={<ProgressPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Navigation />
                </div>
              </BrowserRouter>
            </div>
          </div>
        </HabitProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
