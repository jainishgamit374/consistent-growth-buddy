
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to HabitFlow",
      subtitle: "Build better habits, one day at a time",
      description: "Track your daily habits and watch your consistency grow with beautiful visualizations and motivational insights.",
      emoji: "🌟"
    },
    {
      title: "Create Your Habits",
      subtitle: "Define what matters to you",
      description: "Add custom habits with personalized icons, colors, and frequencies that match your lifestyle.",
      emoji: "🎯"
    },
    {
      title: "Track Daily Progress",
      subtitle: "Stay consistent and motivated",
      description: "Mark habits as complete with satisfying animations and see your streaks grow day by day.",
      emoji: "📈"
    },
    {
      title: "Visualize Your Journey",
      subtitle: "Watch your progress unfold",
      description: "Beautiful charts and statistics help you understand your patterns and celebrate your wins.",
      emoji: "🏆"
    }
  ];

  const handleComplete = () => {
    localStorage.setItem('habit-tracker-onboarded', 'true');
    onComplete();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">
            {currentStepData.emoji}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h1>
          <h2 className="text-lg font-medium text-blue-600 mb-4">
            {currentStepData.subtitle}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-blue-500 scale-125' 
                  : index < currentStep 
                    ? 'bg-green-400' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1 py-3 rounded-xl border-2 hover:bg-gray-50"
            >
              Back
            </Button>
          )}
          <Button
            onClick={nextStep}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
          >
            {currentStep === steps.length - 1 ? 'Get Started!' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
