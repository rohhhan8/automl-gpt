'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, TrendingUp } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    quarter: 'Q1',
    title: 'The Vision',
    description: 'Rohan and Bharath identified the need for democratized AI and began developing the core concept.',
    icon: MapPin,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    year: '2023',
    quarter: 'Q2',
    title: 'First Prototype',
    description: 'Built the initial natural language to ML model prototype, proving the concept works.',
    icon: TrendingUp,
    color: 'from-green-400 to-emerald-500'
  },
  {
    year: '2023',
    quarter: 'Q3',
    title: 'Platform Development',
    description: 'Developed the full-stack platform with real-time processing and user-friendly interface.',
    icon: Trophy,
    color: 'from-purple-400 to-violet-500'
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Beta Launch',
    description: 'Launched beta version with select users, gathering feedback and refining the platform.',
    icon: Calendar,
    color: 'from-orange-400 to-red-500'
  },
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Public Release',
    description: 'Official launch of AutoML Pro, making AI accessible to everyone worldwide.',
    icon: Trophy,
    color: 'from-teal-400 to-cyan-500'
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: 'Global Expansion',
    description: 'Scaling globally with enterprise features and advanced AI capabilities.',
    icon: TrendingUp,
    color: 'from-green-400 to-emerald-500'
  }
];

export function JourneySection() {
  return (
    <section className="py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-8"
            >
              <Calendar className="w-16 h-16 text-green-500" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="text-foreground">Our </span>
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From a simple idea to a revolutionary platform that's changing how the world interacts with AI.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 via-emerald-500 to-teal-600 rounded-full opacity-30" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${milestone.quarter}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-background/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-500"
                    >
                      <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`px-4 py-2 bg-gradient-to-r ${milestone.color} text-white rounded-full text-sm font-bold`}>
                          {milestone.year} {milestone.quarter}
                        </div>
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                        {milestone.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: 'easeInOut',
                        delay: index * 0.3
                      }}
                      className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center shadow-lg border-4 border-background relative z-10`}
                    >
                      <milestone.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20"
          >
            <div className="bg-background/50 backdrop-blur-sm p-12 rounded-3xl border border-border/50 hover:border-foreground/20 transition-all duration-500 max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-foreground">The Future is </span>
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Bright
                </span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're just getting started. Our roadmap includes advanced AI capabilities, 
                global expansion, and partnerships that will make AI even more accessible 
                and powerful for everyone, everywhere.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}