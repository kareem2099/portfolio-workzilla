'use client';

import { motion, Variants } from 'framer-motion';
import ProjectCard, { Project } from '@/components/projects/ProjectCard'; // Assuming ProjectCard is in this path

// Placeholder project data
const placeholderProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform X',
    description: 'A full-featured e-commerce platform with advanced product filtering, user accounts, and a streamlined checkout process.',
    imageUrl: '/assets/project-placeholder-1.png', // Replace with actual or better placeholders
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity.io'],
    liveLink: '#',
    codeLink: '#',
    category: 'Web App',
  },
  {
    id: '2',
    title: 'Portfolio Website v2',
    description: 'My personal portfolio showcasing skills and projects, built with a focus on performance and modern design principles.',
    imageUrl: '/assets/project-placeholder-2.png',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    liveLink: '#',
    // codeLink: '#', // Optional
    category: 'Website',
  },
  {
    id: '3',
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile application for task management, featuring offline support and cloud synchronization.',
    imageUrl: '/assets/project-placeholder-3.png',
    techStack: ['Flutter', 'Dart', 'Firebase', 'Riverpod'],
    // liveLink: '#', // Optional
    codeLink: '#',
    category: 'Mobile App',
  },
  {
    id: '4',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets, providing insights through charts and graphs.',
    imageUrl: '/assets/project-placeholder-4.png',
    techStack: ['React', 'D3.js', 'Node.js', 'Express'],
    liveLink: '#',
    codeLink: '#',
    category: 'Web App',
  },
];

const pageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger animation of title and then the grid
    },
  },
};

const titleText = "My Creative Works";
const titleChars = Array.from(titleText);

const titleContainerAnimVariants: Variants = { // For the h1 container
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
};

const titleCharAnimVariants: Variants = { // For each character
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
      staggerChildren: 0.2, // Stagger animation of each project card
      delayChildren: 0.2, // Delay after title has animated
    },
  },
};


export default function ProjectsPage() {
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
              className={`inline-block ${char === ' ' ? 'mx-1 sm:mx-2' : ''}`} // Gradient is on parent h1
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {placeholderProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
            variants={gridVariants}
            // initial & animate are handled by pageContainerVariants' staggerChildren
          >
            {placeholderProjects.map((project) => (
              <ProjectCard key={project.id} project={project} /> // cardVariants are default in ProjectCard
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="text-center text-xl text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            More projects coming soon! Stay tuned.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
