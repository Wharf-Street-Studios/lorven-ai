import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ArrowLeft01Icon, Tick02Icon } from 'hugeicons-react';

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    billing: 'Free Forever',
    tokens: 30,
    features: [
      'Standard quality',
      'Watermarked outputs',
      '5 downloads/day',
      'Access to 3 tools daily',
    ],
    popular: false,
    color: 'gray',
  },
  {
    id: 'creator',
    name: 'Creator',
    monthlyPrice: 19,
    annualPrice: 15,
    tokens: 500,
    features: [
      'HD quality',
      'No watermarks',
      'Unlimited downloads',
      'Priority processing',
      'Early access features',
      '20% token discount',
    ],
    popular: true,
    color: 'blue',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 49,
    annualPrice: 39,
    tokens: 2000,
    features: [
      'Ultra HD quality',
      'Batch processing',
      'Custom backgrounds',
      'API access (1000 calls/mo)',
      'White-label option',
      '40% token discount',
      'Priority support',
    ],
    popular: false,
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    billing: 'Contact Sales',
    tokens: 'Unlimited',
    features: [
      'Unlimited tokens',
      'Custom AI model training',
      'Dedicated support',
      'SLA guarantees',
      'Custom integrations',
      'Team management',
    ],
    popular: false,
    color: 'gold',
  },
];

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleSelectPlan = (planId: string) => {
    if (planId === 'enterprise') {
      alert('Please contact sales@epiko-ai-studios.ai for Enterprise pricing');
    } else if (planId === 'starter') {
      alert('You are already on the free Starter plan');
    } else {
      alert(`Subscription to ${planId} plan would be processed here with Stripe`);
      // In real app: integrate with Stripe
    }
  };

  const getPrice = (plan: any) => {
    if (plan.id === 'starter') return 'Free';
    if (plan.id === 'enterprise') return 'Custom';
    return billingCycle === 'monthly' ? `$${plan.monthlyPrice}/mo` : `$${plan.annualPrice}/mo`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-dark-100 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-dark-100 active:scale-95 transition-all"
          >
            <ArrowLeft01Icon size={24} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white ml-3">Choose Your Plan</h1>
        </div>
      </header>

      {/* Billing Toggle */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-black'
                : 'bg-dark-100 text-white hover:bg-dark-150'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-white text-black'
                : 'bg-dark-100 text-white hover:bg-dark-150'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-dark-100 rounded-3xl p-5 relative ${
                plan.popular ? 'border-2 border-white' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-dark-500 text-sm">
                    {typeof plan.tokens === 'string' ? plan.tokens : `${plan.tokens} tokens/month`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{getPrice(plan)}</p>
                  {plan.id !== 'starter' && plan.id !== 'enterprise' && (
                    <p className="text-sm text-dark-500">
                      {billingCycle === 'annual' ? 'billed annually' : 'billed monthly'}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Tick02Icon size={16} color="#22c55e" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="large"
                fullWidth
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.id === 'starter'
                  ? 'Current Plan'
                  : plan.id === 'enterprise'
                  ? 'Contact Sales'
                  : `Choose ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-8 p-5 bg-dark-100 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-4">All Plans Include:</h3>
          <div className="space-y-2">
            {[
              'All 7 AI tools',
              'Discovery feed & social features',
              'Rewards & missions',
              'Community support',
              'Regular updates',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Tick02Icon size={16} color="#22c55e" />
                <span className="text-white text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
