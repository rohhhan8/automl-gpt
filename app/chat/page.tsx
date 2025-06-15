'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MLServicePopup } from '@/components/ml-service-popup';
import { 
  ArrowRight, 
  Sparkles, 
  Brain
} from 'lucide-react';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/signin');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    // Show ML service popup since service isn't ready yet
    setPopupOpen(true);
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    setIsEnhancing(true);
    
    try {
      // Simulate prompt enhancement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedPrompts = [
        `Create a comprehensive machine learning model to ${prompt.toLowerCase()}. Include data preprocessing, feature engineering, model selection, hyperparameter tuning, and performance evaluation with detailed metrics.`,
        `Build an advanced AI system that can ${prompt.toLowerCase()}. Implement automated data validation, cross-validation, ensemble methods, and provide interpretability analysis with feature importance rankings.`,
        `Develop a production-ready ML pipeline to ${prompt.toLowerCase()}. Include data quality checks, automated retraining capabilities, model monitoring, and deployment-ready API endpoints with comprehensive documentation.`
      ];
      
      const randomEnhanced = enhancedPrompts[Math.floor(Math.random() * enhancedPrompts.length)];
      setPrompt(randomEnhanced);
      toast.success('Prompt enhanced successfully!');
    } catch (error) {
      toast.error('Failed to enhance prompt');
    } finally {
      setIsEnhancing(false);
    }
  };

  const examplePrompts = [
    "Train a classifier to detect plant diseases from leaf images",
    "Predict house prices based on location and property features", 
    "Build a sentiment analysis model for customer reviews",
    "Create a recommendation system for e-commerce products"
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Clean Header */}
        <div className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Chat</h1>
              <p className="text-muted-foreground">
                Describe your ML task and let AI build it for you
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Prompt Input Box - Fixed Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center space-x-3 p-4 bg-background/50 backdrop-blur-sm border-2 border-border/50 rounded-2xl focus-within:border-foreground/50 transition-all duration-300">
                <Input
                  type="text"
                  placeholder="Train a classifier to detect plant diseases from leaf images..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
                />
                
                {/* Enhance Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={enhancePrompt}
                  disabled={isEnhancing}
                  className="px-3 py-2 h-auto rounded-lg hover:bg-foreground/10 flex-shrink-0"
                >
                  {isEnhancing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" />
                      Enhance
                    </>
                  )}
                </Button>
                
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                  className="px-4 py-2 h-auto rounded-lg flex-shrink-0"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Start <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Try Examples Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-lg font-medium mb-6 text-center text-muted-foreground">
              Try these examples:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examplePrompts.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => setPrompt(example)}
                >
                  <Card className="border border-border/50 hover:border-foreground/30 transition-all duration-300 bg-background/50 hover:bg-background/80">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="w-3 h-3" />
                        </div>
                        <p className="text-sm flex-1 text-left">{example}</p>
                        <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ML Service Popup */}
      <MLServicePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        planType="pro"
      />
    </>
  );
}