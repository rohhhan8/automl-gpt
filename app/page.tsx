'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/hero-section';
import { FeatureGrid } from '@/components/feature-grid';
import { WhyUsSection } from '@/components/why-us-section';
import { TeamSection } from '@/components/team-section';
import { CTASection } from '@/components/cta-section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
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

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <FeatureGrid />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <WhyUsSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <TeamSection />
      </motion.div>
      
      <motion.div variants={sectionVariants}>
        <CTASection />
      </motion.div>
    </motion.div>
  );
}