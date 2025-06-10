
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentProcessPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'US'
  });

  const selectedPlan = {
    name: 'Premium',
    price: 19.99,
    period: 'month',
    features: [
      'Unlimited habits',
      'Advanced analytics',
      'Custom reminders',
      'Progress sharing',
      'Priority support'
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing
    console.log('Payment submitted:', formData);
    // Simulate success and redirect
    alert('Payment successful! Welcome to Premium!');
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Complete Your Purchase</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label className="text-white/80">Payment Method</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card', icon: '💳' },
                      { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                      { id: 'apple', label: 'Apple Pay', icon: '🍎' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-lg border transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-400 bg-blue-500/20'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-white text-sm">{method.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Card Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="cardNumber" className="text-white/80">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="glass border-white/20 text-white placeholder:text-white/60"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate" className="text-white/80">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="glass border-white/20 text-white placeholder:text-white/60"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-white/80">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="glass border-white/20 text-white placeholder:text-white/60"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="cardholderName" className="text-white/80">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          name="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="glass border-white/20 text-white placeholder:text-white/60"
                          required
                        />
                      </div>
                    </div>

                    <Separator className="bg-white/20" />

                    {/* Billing Information */}
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Billing Address</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="email" className="text-white/80">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="glass border-white/20 text-white placeholder:text-white/60"
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="billingAddress" className="text-white/80">Address</Label>
                          <Input
                            id="billingAddress"
                            name="billingAddress"
                            placeholder="123 Main Street"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className="glass border-white/20 text-white placeholder:text-white/60"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-white/80">City</Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="New York"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="glass border-white/20 text-white placeholder:text-white/60"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode" className="text-white/80">Postal Code</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            placeholder="10001"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="glass border-white/20 text-white placeholder:text-white/60"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 text-lg"
                    >
                      <Lock className="w-5 h-5 mr-2" />
                      Complete Payment - ${selectedPlan.price}/{selectedPlan.period}
                    </Button>
                  </form>
                )}

                {paymentMethod !== 'card' && (
                  <div className="text-center py-8">
                    <p className="text-white/70 mb-4">You'll be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete your payment</p>
                    <Button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3"
                    >
                      Continue with {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/20 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 glass rounded-lg border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{selectedPlan.name} Plan</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">${selectedPlan.price}</div>
                      <div className="text-sm text-white/60">per {selectedPlan.period}</div>
                    </div>
                  </div>
                  <ul className="space-y-1 text-sm text-white/70">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${selectedPlan.price}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-white/70 text-sm pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessPage;
