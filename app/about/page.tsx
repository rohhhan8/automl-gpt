'use client';

import { motion } from 'framer-motion';
import { AboutHero } from '@/components/about/about-hero';
import { VisionSection } from '@/components/about/vision-section';
import { ProblemSolution } from '@/components/about/problem-solution';
import { ValuesSection } from '@/components/about/values-section';
import { JourneySection } from '@/components/about/journey-section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function AboutPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden"
    >
      <motion.div variants={sectionVariants}>
        <AboutHero />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <VisionSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <ProblemSolution />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <ValuesSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <JourneySection />
      </motion.div>
    </motion.div>
  );
}