'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle, Zap } from 'lucide-react';

export function ProblemSolution() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Reduced Size and Less Green */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
              <span className="text-foreground">The </span>
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Problem
              </span>
              <span className="text-foreground"> & Our </span>
              <span className="text-foreground">
                Solution
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Problem Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-background/50 backdrop-blur-sm p-10 rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-300">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-8"
                >
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                    The Challenge
                  </span>
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Machine learning has incredible potential, but it's locked behind 
                  complex barriers that prevent most people from accessing its power.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Technical Complexity',
                      description: 'Requires years of programming and mathematics expertise'
                    },
                    {
                      title: 'Resource Intensive',
                      description: 'Expensive infrastructure and specialized hardware needed'
                    },
                    {
                      title: 'Time Consuming',
                      description: 'Months of development for a single working model'
                    },
                    {
                      title: 'Limited Accessibility',
                      description: 'Only available to large tech companies and research institutions'
                    }
                  ].map((problem, index) => (
                    <motion.div
                      key={problem.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{problem.title}</h4>
                        <p className="text-sm text-muted-foreground">{problem.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Arrow Transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"
              >
                <ArrowRight className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Solution Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-background/50 backdrop-blur-sm p-10 rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-300">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-8"
                >
                  <Zap className="w-12 h-12 text-green-500" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Our Solution
                  </span>
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  AutoML Pro eliminates these barriers with natural language processing 
                  and intelligent automation, making AI accessible to everyone.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Natural Language Interface',
                      description: 'Simply describe what you want - no coding required'
                    },
                    {
                      title: 'Cloud-Based Infrastructure',
                      description: 'Powerful computing resources available on-demand'
                    },
                    {
                      title: 'Instant Results',
                      description: 'Get working models in minutes, not months'
                    },
                    {
                      title: 'Universal Access',
                      description: 'Available to individuals, startups, and enterprises alike'
                    }
                  ].map((solution, index) => (
                    <motion.div
                      key={solution.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">{solution.title}</h4>
                        <p className="text-sm text-muted-foreground">{solution.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}