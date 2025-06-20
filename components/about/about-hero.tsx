'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Target } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.05, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-green-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center items-center space-x-8 mb-12"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 0
              }}
              className="p-4 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl backdrop-blur-sm border border-green-400/30"
            >
              <Brain className="w-8 h-8 text-green-500" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 0.5
              }}
              className="p-4 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl backdrop-blur-sm border border-emerald-400/30"
            >
              <Sparkles className="w-8 h-8 text-emerald-500" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: 1
              }}
              className="p-4 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-2xl backdrop-blur-sm border border-teal-400/30"
            >
              <Target className="w-8 h-8 text-teal-500" />
            </motion.div>
          </motion.div>

          {/* Main Heading - Reduced Size and Less Green */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
              <span className="block text-foreground">About</span>
              <span className="block text-foreground">
                AutoML Pro
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Democratizing artificial intelligence through 
              <span className="text-foreground"> natural language</span> and 
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> intelligent automation</span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '10,000+', label: 'Models Trained', color: 'from-green-400 to-emerald-500' },
              { number: '500+', label: 'Happy Customers', color: 'from-emerald-400 to-teal-500' },
              { number: '99.9%', label: 'Uptime', color: 'from-teal-400 to-green-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-green-400/30 transition-all duration-300"
              >
                <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}