'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, Bell, Gift, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MLServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'pro' | 'enterprise';
}

export function MLServicePopup({ isOpen, onClose, planType }: MLServicePopupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !name.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log(`🚀 Starting ${planType} registration for: ${email}`);
      
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ Registration completed for: ${email}`);
      setIsSubmitted(true);
      toast.success('Registration successful! We will contact you soon.');
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const planDetails = {
    pro: {
      title: 'Professional Plan',
      originalPrice: '$20',
      discountedPrice: '$15',
      discount: '$5 Early Bird Discount',
      features: [
        '50 ML models per month',
        'Large datasets (up to 10GB)',
        'Priority email support',
        'Fast processing speed',
        'Advanced analytics',
        'Private model hosting',
        'API access',
        'Custom preprocessing'
      ]
    },
    enterprise: {
      title: 'Enterprise Plan',
      originalPrice: 'Contact Sales',
      discountedPrice: 'Special Pricing',
      discount: 'Custom Enterprise Discount',
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
        'On-premise options'
      ]
    }
  };

  const plan = planDetails[planType];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-2 border-border/50 shadow-2xl">
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-2 top-2 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-12 h-12 mx-auto text-foreground/80" />
              </motion.div>
              
              <CardTitle className="text-2xl mb-2">
                {isSubmitted ? 'Registration Complete!' : 'ML Service Coming Soon'}
              </CardTitle>
              
              {!isSubmitted ? (
                <CardDescription className="text-base">
                  Our advanced ML service is in development. Register now for early access and exclusive pricing!
                </CardDescription>
              ) : (
                <CardDescription className="text-base text-green-600">
                  Thank you for registering! We will contact you soon with more details.
                </CardDescription>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <>
                {/* Plan Details */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{plan.title}</h3>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <Gift className="w-3 h-3 mr-1" />
                      Early Bird
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold">{plan.discountedPrice}</span>
                    {planType === 'pro' && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                        <Badge variant="outline" className="text-green-600 border-green-500/20">
                          {plan.discount}
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-2">
                      +{plan.features.length - 4} more features...
                    </p>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Bell className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Registering...' : 'Register for Early Access'}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    {planType === 'pro' && (
                      <>
                        🚀 We'll contact you when the service is ready
                        <br />
                        💳 Payment details will be shared soon
                      </>
                    )}
                    {planType === 'enterprise' && (
                      <>
                        📞 Our team will contact you for custom pricing
                        <br />
                        🏢 Enterprise solutions tailored for you
                      </>
                    )}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </motion.div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You're all set! We've saved your spot for the {plan.title}.
                  </p>
                  <p className="text-sm font-medium">
                    {planType === 'pro' && (
                      <>
                        🚀 We'll contact you when ready
                        <br />
                        💳 Payment details coming soon
                      </>
                    )}
                    {planType === 'enterprise' && (
                      <>
                        📞 Our team will contact you
                        <br />
                        🏢 Custom pricing discussion
                      </>
                    )}
                  </p>
                </div>
                
                <Button onClick={onClose} className="w-full">
                  Got it!
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}