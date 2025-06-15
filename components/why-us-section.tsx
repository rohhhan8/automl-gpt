'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Award, Zap } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Proven Results',
    description: 'Over 10,000 successful ML models deployed across industries.',
    stat: '10,000+',
    label: 'Models Deployed',
  },
  {
    icon: Users,
    title: 'Trusted by Leaders',
    description: 'Fortune 500 companies rely on our platform for their AI initiatives.',
    stat: '500+',
    label: 'Enterprise Clients',
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Winner of multiple AI innovation awards and industry recognition.',
    stat: '15+',
    label: 'Awards Won',
  },
  {
    icon: Zap,
    title: '10x Faster',
    description: 'Reduce ML development time from months to hours with our platform.',
    stat: '10x',
    label: 'Faster Development',
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Why Choose AutoML Pro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another ML platform. We're your AI transformation partner, 
            delivering results that matter to your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="bg-muted/50 p-8 rounded-2xl border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-foreground/20 transition-colors duration-300"
                >
                  <benefit.icon className="w-8 h-8" />
                </motion.div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold mb-1">{benefit.stat}</div>
                  <div className="text-sm text-muted-foreground">{benefit.label}</div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}