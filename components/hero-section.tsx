'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MLServicePopup } from '@/components/ml-service-popup';

// Typewriter hook
function useTypewriter(text: string, speed: number = 100, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (startDelay > 0 && !started) {
      const delayTimeout = setTimeout(() => {
        setStarted(true);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    } else if (startDelay === 0) {
      setStarted(true);
    }
  }, [startDelay, started]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, started]);

  return { displayText, isComplete: currentIndex >= text.length };
}

export function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Typewriter effect for the main heading
  const line1 = useTypewriter('Transform Ideas', 120, 500);
  const line2 = useTypewriter('Into Intelligence', 120, line1.isComplete ? 800 : 0);

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

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-foreground/80" />
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <div className="relative inline-block">
                  <span className="text-foreground">
                    {line1.displayText}
                  </span>
                  {!line1.isComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block ml-1 text-foreground"
                    >
                      |
                    </motion.span>
                  )}
                </div>
                <br />
                <div className="relative inline-block">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {line2.displayText}
                  </span>
                  {line1.isComplete && !line2.isComplete && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block ml-1 text-foreground"
                    >
                      |
                    </motion.span>
                  )}
                </div>
              </h1>
            </motion.div>

            {/* Reduced Size Tagline with Subtle Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                <span className="text-foreground/90">
                  Describe it.
                </span>
                <span className="mx-3 text-muted-foreground/50">•</span>
                <span className="text-muted-foreground/80">
                  We train it.
                </span>
              </p>
            </motion.div>

            {/* Prompt Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="mb-12"
            >
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Train a classifier to detect plant diseases from leaf images..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-14 px-6 pr-32 text-lg bg-background/50 backdrop-blur-sm border-2 border-border/50 rounded-full focus:border-foreground/50 transition-all duration-300 animate-pulse-glow"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-2 h-10 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Start <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {[
                {
                  icon: Brain,
                  title: 'AI-Powered',
                  description: 'Intelligent automation',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Models in minutes',
                },
                {
                  icon: Sparkles,
                  title: 'No-Code',
                  description: 'Natural language interface',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 3.7 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass p-6 rounded-2xl text-center group cursor-pointer"
                >
                  <feature.icon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-foreground/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ML Service Popup */}
      <MLServicePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        planType="pro"
      />
    </>
  );
}