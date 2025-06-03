'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

// Ensure this Project interface matches the one used by the server component
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  category?: string;
  detailedContent?: string;
}

interface ProjectDetailClientProps {
  project: Project | undefined;
}

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
};

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-lg mb-6">{'Sorry, we couldn\'t find the project you were looking for.'}</p>
        <Link href="/projects" 
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <ArrowLeft size={20} className="mr-2" />
          Back to All Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={contentVariants} className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 group">
            <ArrowLeft size={20} className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to All Projects
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-slate-900 dark:text-slate-50">{project.title}</h1>
          {project.category && (
            <span className="text-sm font-medium bg-pink-100 text-pink-700 dark:bg-pink-700 dark:text-pink-100 px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          )}
        </motion.div>

        {project.imageUrl && (
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl mb-10"
            variants={contentVariants} // Re-using for simplicity, could have its own
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Image might load slightly after text
          />
        )}
        
        <motion.div variants={contentVariants} className="prose prose-lg dark:prose-invert max-w-none mb-10 text-slate-700 dark:text-slate-300">
          <p className="lead text-xl">{project.description}</p>
          {project.detailedContent && (
            <div dangerouslySetInnerHTML={{ __html: project.detailedContent }} />
          )}
        </motion.div>

        <motion.div variants={contentVariants} className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-md text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={contentVariants} className="flex flex-wrap gap-4">
          {project.liveLink && (
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Live Project <ExternalLink size={18} className="ml-2" />
            </Link>
          )}
          {project.codeLink && (
            <Link href={project.codeLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-slate-700 bg-slate-200 rounded-lg shadow-md hover:bg-slate-300 dark:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              View Code <Github size={18} className="ml-2" />
            </Link>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectDetailClient;
