'use client';

import { motion, Variants } from 'framer-motion';
// import Image from 'next/image'; // Temporarily removed
import Link from 'next/link';
import { Github, ExternalLink, Zap } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Placeholder, ideally from CMS
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  category?: string; // For future filtering
}

interface ProjectCardProps {
  project: Project;
  variants?: Variants;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotateX: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15, duration: 0.8 }
  },
};

// cardVariants already defines hidden and visible for entry animation.
// Hover effects will be applied directly via whileHover or within cardVariants if preferred.

export default function ProjectCard({ project, variants = cardVariants }: ProjectCardProps) {
  return (
    <motion.div 
      variants={variants} // For entry animation (hidden, visible)
      initial="hidden"   // Use keys from cardVariants
      animate="visible"  // Use keys from cardVariants
      whileHover={{ 
        y: -10, 
        boxShadow: "0px 20px 35px rgba(0,0,0,0.2)", // Simplified shadow for broader compatibility
        transition: { type: 'spring', stiffness: 180, damping: 12 }
      }}
      className="bg-white dark:bg-slate-800/60 dark:backdrop-blur-md rounded-xl overflow-hidden shadow-lg dark:shadow-xl flex flex-col h-full group border border-slate-200 dark:border-slate-700/50" // Adjusted dark shadow
    >
      {/* The inner motion.div for hover is removed; hover effects are on the parent now. */}
        <div className="relative w-full h-56 bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300 dark:group-hover:bg-slate-600/70 transition-colors duration-300"> {/* Theme-aware placeholder bg */}
          {/* Image component temporarily removed to avoid 404s and focus on hydration. Will be added back. */}
          {/* <Image
            src={project.imageUrl || '/assets/placeholder-project.png'}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2 group-hover:text-pink-500 dark:group-hover:text-pink-300 transition-colors duration-300">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow min-h-[60px]">{project.description}</p>
          
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Technologies Used:</h4>
            <motion.div className="flex flex-wrap gap-2" variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren:0.7 } } }} initial="hidden" animate="visible" >
              {project.techStack.map((tech) => (
                <motion.span 
                  key={tech} 
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-700/50 dark:text-purple-300 rounded-full flex items-center"
                  variants={{ hidden: {opacity:0, y:10}, visible: {opacity:1, y:0, transition: {type: 'spring', stiffness:100}} }}
                >
                  <Zap size={12} className="mr-1 opacity-70" /> {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="mt-auto flex justify-start space-x-3 sm:space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
            {project.liveLink && (
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 px-3 py-1 rounded-md hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all duration-200 group-hover:text-sky-500 dark:group-hover:text-sky-300">
                <motion.span 
                  className="flex items-center"
                  whileHover={{ scale: 1.05, y:-2 }}
                  whileTap={{ scale: 0.95, y:0 }}
                >
                  <ExternalLink size={16} className="mr-1.5" /> Live Demo
                </motion.span>
              </Link>
            )}
            {project.codeLink && (
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                <motion.span 
                  className="flex items-center"
                  whileHover={{ scale: 1.05, y:-2 }}
                  whileTap={{ scale: 0.95, y:0 }}
                >
                  <Github size={16} className="mr-1.5" /> View Code
                </motion.span>
              </Link>
            )}
          </div>
        </div>
    </motion.div>
  );
}
