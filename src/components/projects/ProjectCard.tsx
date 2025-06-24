'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Zap } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  category?: string;
  windowsPrice?: number;
  linuxPrice?: number;
  windowsBuyLink?: string;
  linuxBuyLink?: string;
}

interface ProjectCardProps {
  project: Project;
  variants?: Variants;
  locale?: string;
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

export default function ProjectCard({ project, variants = cardVariants, locale }: ProjectCardProps) {

  const linkHref = project.id === 'stocktune' ? `/projects/${project.id}` : `/projects/${project.id}`;

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -10, 
        boxShadow: "0px 20px 35px rgba(0,0,0,0.2)",
        transition: { type: 'spring', stiffness: 180, damping: 12 }
      }}
      className="bg-white dark:bg-slate-800/60 dark:backdrop-blur-md rounded-xl overflow-hidden shadow-lg dark:shadow-xl flex flex-col h-full group border border-slate-200 dark:border-slate-700/50"
    >
      <Link href={linkHref} className="block" aria-label={`View details for ${project.title}`}>
        <div className="relative w-full h-56 relative group-hover:bg-slate-300 dark:group-hover:bg-slate-600/70 transition-colors duration-300" aria-label={`View details for ${project.title}`}>
          <Image
            src={project.imageUrl || '/assets/project-placeholder.png'}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2">
          <span className="text-pink-600 dark:text-pink-400 group-hover:text-pink-500 dark:group-hover:text-pink-300 transition-colors duration-300 hover:underline">
            {project.title}
          </span>
        </h3>
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

        <div className="mt-2">
          {project.windowsPrice && (
            <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">Win: ${project.windowsPrice}</span>
          )}
          {project.windowsBuyLink && locale && (
            <Link href={project.windowsBuyLink.startsWith('http') ? project.windowsBuyLink : `/${locale}${project.windowsBuyLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 px-3 py-1 rounded-md hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all duration-200 group-hover:text-sky-500 dark:group-hover:text-sky-300">
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
              >
                <ExternalLink size={16} className="mr-1.5" /> Buy for Windows
              </motion.span>
            </Link>
          )}
        </div>
        <div className="mt-2">
          {project.linuxPrice && (
            <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">Linux: ${project.linuxPrice}</span>
          )}
          {project.linuxBuyLink && locale && (
            <Link href={project.linuxBuyLink.startsWith('http') ? project.linuxBuyLink : `/${locale}${project.linuxBuyLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 px-3 py-1 rounded-md hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all duration-200 group-hover:text-sky-500 dark:group-hover:text-sky-300">
            <motion.span
              className="flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              <ExternalLink size={16} className="mr-1.5" /> Buy for Linux
            </motion.span>
          </Link>
        )}
        </div>
      </div>
    </motion.div>
  );
}
