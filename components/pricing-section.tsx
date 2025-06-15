'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { MLServicePopup } from '@/components/ml-service-popup';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for getting started with AutoML',
    icon: Zap,
    features: [
      '5 ML models per month',
      'Basic datasets (up to 1GB)',
      'Community support',
      'Standard processing speed',
      'Basic analytics',
      'Public model sharing',
    ],
    cta: 'Get Started',
    href: '/signup',
    popular: false,
    available: true,
  },
  {
    name: 'Professional',
    price: '$15',
    originalPrice: '$20',
    period: 'per month',
    description: 'Ideal for professionals and small teams',
    icon: Crown,
    features: [
      '50 ML models per month',
      'Large datasets (up to 10GB)',
      'Priority email support',
      'Fast processing speed',
      'Advanced analytics',
      'Private model hosting',
      'API access',
      'Custom preprocessing',
    ],
    cta: 'Register for Early Access',
    popular: true,
    available: false,
    planType: 'pro' as const,
  },
  {
    name: 'Enterprise',
    price: 'Contact Sales',
    period: '',
    description: 'Built for teams and organizations',
    icon: Rocket,
    features: [
      'Unlimited ML models',
      'Unlimited dataset size',
      '24/7 dedicated support',
      'Lightning-fast processing',
      'Advanced analytics & reporting',
      'Private cloud deployment',
      'Full API access',
      'Custom integrations',
      'SLA guarantee',
      'On-premise options',
    ],
    cta: 'Register for Enterprise',
    popular: false,
    available: false,
    planType: 'enterprise' as const,
  },
];

export function PricingSection() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (!plan.available) {
      setSelectedPlan(plan.planType!);
      setPopupOpen(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative bg-background/50 backdrop-blur-sm p-8 rounded-2xl border-2 transition-all duration-300 min-h-[600px] ${
              plan.popular
                ? 'border-foreground/50 shadow-lg'
                : 'border-border/50 hover:border-foreground/20'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <span className="bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </motion.div>
            )}

            {/* Early Bird Badge for Pro Plan */}
            {plan.originalPrice && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="absolute -top-4 right-6"
              >
                <span className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                  $5 OFF
                </span>
              </motion.div>
            )}

            <div className="text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <plan.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                {plan.period && (
                  <span className="text-muted-foreground">/{plan.period}</span>
                )}
                {plan.originalPrice && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Early Bird Special - Save $5!
                  </p>
                )}
              </div>
              
              {plan.available ? (
                <Link href={plan.href!}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className={`w-full h-12 text-base ${
                        plan.popular
                          ? 'bg-foreground text-background hover:bg-foreground/90'
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handlePlanClick(plan)}
                    className={`w-full h-12 text-base ${
                      plan.popular
                        ? 'bg-foreground text-background hover:bg-foreground/90'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              )}
            </div>

            <div className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + featureIndex * 0.05,
                  }}
                  className="flex items-center space-x-3"
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ML Service Popup */}
      <MLServicePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        planType={selectedPlan}
      />
    </>
  );
}