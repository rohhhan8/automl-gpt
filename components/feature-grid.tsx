'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Zap, 
  Brain, 
  BarChart3, 
  Shield, 
  Cpu,
  Database
} from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'No-Code ML',
    description: 'Build powerful machine learning models without writing a single line of code. Our natural language interface makes AI accessible to everyone.',
  },
  {
    icon: Zap,
    title: 'Prompt-Based Training',
    description: 'Simply describe what you want to achieve in plain English. Our AI understands your intent and creates the optimal model architecture.',
  },
  {
    icon: BarChart3,
    title: 'Model Dashboard',
    description: 'Monitor your models performance with real-time analytics, visualizations, and comprehensive metrics tracking.',
  },
  {
    icon: Brain,
    title: 'Auto Feedback Loop',
    description: 'Continuous learning system that improves your models automatically based on new data and performance feedback.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Connect any data source seamlessly. Support for CSV, JSON, databases, APIs, and cloud storage platforms.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with end-to-end encryption, SOC 2 compliance, and private deployment options.',
  },
  {
    icon: Cpu,
    title: 'AutoML Engine',
    description: 'Advanced automated machine learning that handles feature engineering, model selection, and hyperparameter tuning.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function FeatureGrid() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete platform that handles every aspect of machine learning, 
            from data ingestion to model training and analytics.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 h-full hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-foreground/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-foreground/20 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}