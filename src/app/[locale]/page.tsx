'use client'; // Required for Framer Motion components at the page level

import { motion, Variants } from 'framer-motion';
import HeroSection from '@/components/home/HeroSection';
import AboutSnippetSection from '@/components/home/AboutSnippetSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import SkillsHighlightSection from '@/components/home/SkillsHighlightSection';
import LatestBlogPostsSection from '@/components/home/LatestBlogPostsSection';

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      // delayChildren: 0.1,
      // staggerChildren: 0.5
    } 
  },
};

import { PageProps } from '@/lib/localeUtils';

export default function Home({
  locale,
}: PageProps) {
  return (
    <motion.main
      className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)] bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100" // Theme-aware background and text
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSection locale={locale} /> 
      {/* HeroSection is min-h-screen, subsequent sections will appear on scroll */}
      
      <AboutSnippetSection />
      <FeaturedProjectsSection />
      <SkillsHighlightSection />
      <LatestBlogPostsSection /> {/* Add the new section here */}

      {/* Optional: A final Call To Action or Footer specific to home might go here */}
      {/* For now, the global footer from layout.tsx will apply */}
      
    </motion.main>
  );
}
