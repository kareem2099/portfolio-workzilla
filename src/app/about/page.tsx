'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/about/HeroSection';
import JourneySection from '@/components/about/JourneySection';
import SkillsSection from '@/components/about/SkillsSection';
import CallToActionSection from '@/components/about/CallToActionSection';

// Animation variants for the main container and individual sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Controls the delay between each section animating in
    },
  },
};

const itemVariants = { // This will be passed to each section component
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection variants={itemVariants} />
        <JourneySection variants={itemVariants} />
        <SkillsSection variants={itemVariants} />
        <CallToActionSection variants={itemVariants} />
      </motion.div>
    </div>
  );
}
