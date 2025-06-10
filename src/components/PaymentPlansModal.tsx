
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentPlansModalProps {
  trigger: React.ReactNode;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

const PaymentPlansModal: React.FC<PaymentPlansModalProps> = ({ trigger }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const navigate = useNavigate();

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      description: 'Perfect for getting started with habit tracking',
      features: [
        'Up to 5 habits',
        'Basic analytics',
        'Mobile app access',
        'Email support'
      ],
      icon: <Star className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      period: 'month',
      description: 'Advanced features for serious habit builders',
      features: [
        'Unlimited habits',
        'Advanced analytics',
        'Custom reminders',
        'Progress sharing',
        'Priority support',
        'Habit templates'
      ],
      icon: <Zap className="w-6 h-6" />,
      popular: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 39.99,
      period: 'month',
      description: 'Complete solution for teams and organizations',
      features: [
        'Everything in Premium',
        'Team collaboration',
        'Admin dashboard',
        'Custom integrations',
        'Dedicated support',
        'White-label options'
      ],
      icon: <Crown className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProceedToPayment = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      // Store selected plan in localStorage for the payment page
      localStorage.setItem('selectedPlan', JSON.stringify(plan));
      navigate('/payment');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="glass-card border-white/20 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl lg:text-3xl font-bold text-center text-white mb-2">
            Choose Your Plan
          </DialogTitle>
          <p className="text-white/70 text-center">
            Unlock the full potential of your habit tracking journey
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass-card rounded-2xl p-4 lg:p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-blue-400 bg-white/10' 
                  : 'hover:bg-white/5'
              } ${plan.popular ? 'border-2 border-purple-400' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 lg:px-4 py-1 rounded-full text-xs lg:text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4 lg:mb-6">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  ${plan.price}
                  <span className="text-sm lg:text-lg text-white/60">/{plan.period}</span>
                </div>
                <p className="text-white/70 text-xs lg:text-sm">{plan.description}</p>
              </div>
              
              <ul className="space-y-2 lg:space-y-3 mb-4 lg:mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-white/80">
                    <Check className="w-3 h-3 lg:w-4 lg:h-4 text-green-400 mr-2 lg:mr-3 flex-shrink-0" />
                    <span className="text-xs lg:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  selectedPlan === plan.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'bg-white/10 hover:bg-white/20'
                } text-white font-semibold transition-all duration-300 text-sm lg:text-base`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectPlan(plan.id);
                }}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>
        
        {selectedPlan && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleProceedToPayment}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 lg:px-8 py-2 lg:py-3 text-base lg:text-lg"
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPlansModal;
