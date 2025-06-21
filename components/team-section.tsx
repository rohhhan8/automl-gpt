'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
  {
    name: 'Rohan Mahato',
    role: 'CEO & Co-Founder',
    bio: 'Visionary leader with expertise in Development and AI Tools content Creation, Product Management, and Design. Passionate about democratizing artificial intelligence.',
    avatar: (
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">RM</span>
        </div>
      </div>
    ),
    social: {
      linkedin: 'https://www.linkedin.com/in/rohanmahato',
      twitter: 'https://x.com/notahooman_18',
      github: 'https://github.com',
    },
  },
  {
    name: 'Bharath Bhojana',
    role: 'CTO & Co-Founder',
    bio: 'Technical architect and ML expert. Builds scalable AI systems that transform businesses.',
    avatar: (
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">BB</span>
        </div>
      </div>
    ),
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
    },
  },
];

export function TeamSection() {
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
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate founders dedicated to making AI accessible to everyone through innovative technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {member.avatar}
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-foreground/80 font-medium mb-4 text-lg">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href={member.social.linkedin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={member.social.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}