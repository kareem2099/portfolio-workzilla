'use client'; // Required for Framer Motion components at the page level

import { motion, Variants } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import AboutSnippetSection from '@/components/home/AboutSnippetSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import SkillsHighlightSection from '@/components/home/SkillsHighlightSection';

// Overall page container variants for staggering sections if needed,
// though individual sections also have their own entry animations.
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      // delayChildren: 0.1, // Delay before the first section starts (Hero has its own complex sequence)
      // staggerChildren: 0.5 // Stagger between major sections if Hero wasn't full screen
    } 
  },
};

export default function Home() {
  return (
    <motion.main
      className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100" // Theme-aware background and text
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSection /> 
      {/* HeroSection is min-h-screen, subsequent sections will appear on scroll */}
      
      <AboutSnippetSection />
      <FeaturedProjectsSection />
      <SkillsHighlightSection />

      {/* Optional: A final Call To Action or Footer specific to home might go here */}
      {/* For now, the global footer from layout.tsx will apply */}
      
    </motion.main>
  );
}
