
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
import PaymentProcessPage from "./components/PaymentProcessPage";
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

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HabitProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <BrowserRouter>
              <div className="flex h-screen overflow-hidden">
                {/* Mobile overlay */}
                {isSidebarOpen && (
                  <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
                
                {/* Sidebar */}
                <div className={`${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 fixed lg:relative z-50 transition-transform duration-300 ease-in-out`}>
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
                  <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                  <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/habits" element={<HabitsPage />} />
                        <Route path="/progress" element={<ProgressPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/payment" element={<PaymentProcessPage />} />
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
