'use client';

import { motion } from 'framer-motion';
import { Eye, Lightbulb, Globe } from 'lucide-react';

export function VisionSection() {
  return (
    <section className="py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #059669 0%, transparent 50%)`,
        }} />
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
              <Eye className="w-16 h-16 text-green-500" />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black mb-8">
              <span className="text-foreground">Our </span>
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A world where artificial intelligence is accessible to everyone, 
              regardless of technical expertise or background.
            </p>
          </motion.div>

          {/* Vision Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-teal-600/10 p-12 rounded-3xl border border-green-400/20 backdrop-blur-sm">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-8"
                >
                  <Lightbulb className="w-12 h-12 text-green-500" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Democratizing AI
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We envision a future where creating sophisticated machine learning models 
                  is as simple as having a conversation. No coding, no complex mathematics, 
                  just pure human creativity meeting artificial intelligence.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Natural language interfaces for everyone',
                    'Instant model deployment and scaling',
                    'Real-time collaboration and sharing',
                    'Ethical AI with built-in safeguards'
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Global Impact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="inline-block mb-6"
                >
                  <Globe className="w-16 h-16 text-emerald-500" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-foreground">Global </span>
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Impact
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: 'Education Revolution',
                    description: 'Empowering students and educators with AI tools that enhance learning and research capabilities.',
                    color: 'from-green-400 to-emerald-500'
                  },
                  {
                    title: 'Healthcare Innovation',
                    description: 'Accelerating medical breakthroughs through accessible AI for diagnosis and treatment.',
                    color: 'from-emerald-400 to-teal-500'
                  },
                  {
                    title: 'Business Transformation',
                    description: 'Enabling companies of all sizes to leverage AI for growth and competitive advantage.',
                    color: 'from-teal-400 to-green-500'
                  }
                ].map((impact, index) => (
                  <motion.div
                    key={impact.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-green-400/30 transition-all duration-300"
                  >
                    <h4 className={`text-xl font-bold mb-3 bg-gradient-to-r ${impact.color} bg-clip-text text-transparent`}>
                      {impact.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {impact.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}