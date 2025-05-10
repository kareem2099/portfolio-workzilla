'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import ProjectCard, { Project } from '@/components/projects/ProjectCard'; // Re-use ProjectCard
import { ArrowRight } from 'lucide-react';

// Placeholder data - in a real app, this would come from a CMS or API, filtered for "featured"
const featuredProjectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform X',
    description: 'A full-featured e-commerce platform with advanced product filtering and user accounts.',
    imageUrl: '/assets/project-placeholder-1.png',
    techStack: ['Next.js', 'TypeScript', 'Stripe'],
    liveLink: '#',
    codeLink: '#',
    category: 'Web App',
  },
  {
    id: '2',
    title: 'Portfolio Website v2',
    description: 'My personal portfolio showcasing skills and projects, built with modern design principles.',
    imageUrl: '/assets/project-placeholder-2.png',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    liveLink: '#',
    category: 'Website',
  },
  // Add a third if desired, or make it dynamic
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2, delayChildren: 0.2 } 
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const gridVariants: Variants = {
  hidden: {}, // Parent handles initial opacity for the section
  visible: {
    transition: {
      staggerChildren: 0.25, // Stagger animation of each project card
    },
  },
};

export default function FeaturedProjectsSection() {
  return (
    <motion.section 
      className="py-20 sm:py-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-500"
          variants={titleVariants}
        >
          Featured Projects
        </motion.h2>
        
        {featuredProjectsData.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10 max-w-5xl mx-auto" // Max 2 for featured, or adjust grid
            variants={gridVariants}
          >
            {featuredProjectsData.slice(0, 2).map((project) => ( // Displaying only 2 featured projects
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-xl text-slate-400">No featured projects to display currently.</p>
        )}

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: featuredProjectsData.length * 0.2 + 0.5 }} // Delay after cards
        >
          <Link href="/projects" className="inline-block">
            <motion.span // Changed from motion.a to motion.span
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-sky-600 border-2 border-sky-500 rounded-lg shadow-md hover:bg-sky-500 hover:text-white dark:text-sky-300 dark:border-sky-400 dark:hover:bg-sky-400 dark:hover:text-slate-900 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(56, 189, 248, 0.3)" /* sky-400 with opacity */}} // Box shadow might need theme adjustment too
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <ArrowRight size={20} className="ml-2" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
