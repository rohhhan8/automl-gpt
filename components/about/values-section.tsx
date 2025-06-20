'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Rocket, Users, Lightbulb, Globe } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'We put people first, designing AI that enhances human capabilities rather than replacing them.',
    color: 'from-red-400 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Ethical AI',
    description: 'We build responsible AI systems with transparency, fairness, and privacy at their core.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push the boundaries of what\'s possible, constantly evolving and improving our technology.',
    color: 'from-purple-400 to-violet-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of community and work together to solve complex challenges.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Lightbulb,
    title: 'Simplicity',
    description: 'We make complex technology simple and accessible, removing barriers to innovation.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'We strive to create positive change that benefits people and communities worldwide.',
    color: 'from-teal-400 to-cyan-500',
  }
];

export function ValuesSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="text-foreground">Our </span>
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do and shape the future we're building together.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-background/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-500 hover:shadow-xl h-full">
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: index * 0.2
                    }}
                    className="mb-6"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative Element */}
                  <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: index * 0.3
                    }}
                    className={`h-1 bg-gradient-to-r ${value.color} rounded-full mt-6 opacity-50`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}