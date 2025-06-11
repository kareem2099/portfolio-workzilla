'use client';

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import ProjectCard, { Project } from '@/components/projects/ProjectCard';

// Placeholder project data
const placeholderProjects: Project[] = [
  {
    id: '1',
    title: 'Wood Line Market',
    description: 'An online marketplace for wood products, built with HTML, CSS, JavaScript, Node.js, and ASP.NET.',
    imageUrl: '/assets/project-placeholder-1.png',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'ASP.NET'],
    liveLink: 'https://wood-line-web.vercel.app/',
    codeLink: 'https://github.com/kareem2099/WoodLine.Web',
    category: 'E-commerce',
  },
  {
    id: '2',
    title: 'Rose & Gold E-commerce',
    description: 'A full-featured e-commerce website for jewelry, built with PHP and SQLite, and containerized with Docker.',
    imageUrl: '/assets/project-placeholder-2.png',
    techStack: ['PHP', 'SQLite', 'Docker', 'Apache', 'HTML', 'CSS', 'JavaScript'],
    liveLink: '#',
    codeLink: 'https://github.com/kareem2099/RoseAndGold',
    category: 'E-commerce',
  },
  {
    id: '3',
    title: 'Lambo Site',
    description: 'A showcase website for Lambo.',
    imageUrl: '/assets/project-placeholder-3.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://lambo-website.vercel.app/',
    codeLink: 'https://github.com/kareem2099/lambo-website',
    category: 'Website',
  },
  {
    id: '4',
    title: 'Pisa Prep',
    description: 'A preparatory platform for Pisa.',
    imageUrl: '/assets/project-placeholder-4.png',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://pisa-prep.vercel.app/',
    codeLink: 'https://github.com/kareem2099/PisaPrep--2-',
    category: 'Website',
  },
  {
    id: '5',
    title: 'Personal Portfolio Website',
    description: "The Next.js & Tailwind CSS portfolio you're currently viewing, showcasing my skills and projects.",
    imageUrl: '/assets/project-placeholder-5.png', // Using an available placeholder
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveLink: 'https://portfolio-workzilla.vercel.app/',
    codeLink: 'https://github.com/kareem2099/portfolio-workzilla',
    category: 'Portfolio',
  },
];

const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const titleText = "My Creative Works";
const titleChars = Array.from(titleText);

const titleContainerAnimVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const titleCharAnimVariants: Variants = {
  hidden: { opacity: 0, x: -20, y:10, rotateZ: -15, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateZ: 0,
    filter: "blur(0px)",
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};


const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};


const filterButtonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const filterButtonVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(placeholderProjects.map(p => p.category).filter((value): value is string => Boolean(value)))];

  const filteredProjects = selectedCategory === 'All'
    ? placeholderProjects
    : placeholderProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto"
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400 flex justify-center flex-wrap"
          variants={titleContainerAnimVariants}
          aria-label={titleText}
        >
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              variants={titleCharAnimVariants}
              className={`inline-block ${char === ' ' ? 'mx-1 sm:mx-2' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-16"
          variants={filterButtonContainerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ease-out
                ${selectedCategory === category 
                  ? 'bg-pink-600 text-white shadow-lg scale-105' 
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 shadow'
                }`}
              variants={filterButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="no-projects-message"
              className="text-center text-xl text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            More projects coming soon! Stay tuned.
          </motion.p>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
