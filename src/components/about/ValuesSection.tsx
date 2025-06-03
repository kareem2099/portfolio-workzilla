'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, Zap, Users, Lightbulb } from 'lucide-react'; // Example icons

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: CheckCircle,
    title: 'Quality First',
    description: 'Delivering high-quality, robust, and maintainable code is my top priority. I believe in attention to detail and thorough testing.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Learning',
    description: 'The tech world is ever-evolving, and I am committed to lifelong learning to stay updated with the latest technologies and best practices.',
  },
  {
    icon: Users,
    title: 'User-Centric Approach',
    description: 'I strive to build applications that are intuitive, accessible, and provide a seamless experience for the end-user.',
  },
  {
    icon: Zap, // Represents efficiency or proactivity
    title: 'Proactive Problem-Solving',
    description: 'I enjoy tackling challenges head-on and proactively seeking efficient solutions to complex problems.',
  },
];

interface ValuesSectionProps {
  variants?: Variants; // For entry animation from the parent page
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
};

const ValuesSection: React.FC<ValuesSectionProps> = ({ variants }) => {
  return (
    <motion.section 
      className="py-16 md:py-20" // Consistent padding with other sections
      variants={variants} // Apply variants passed from AboutPage
      // initial, animate are handled by parent stagger in AboutPage
    >
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100">
          My Core Values
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          These principles guide my approach to every project and collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {values.map((value, index) => (
          <motion.div 
            key={index}
            className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            // Staggering for cards can be handled by a parent motion.div if sectionVariants has staggerChildren,
            // or apply a delay based on index if needed here. For now, simple entry.
          >
            <div className="flex items-center mb-4">
              <value.icon className="w-8 h-8 text-pink-500 dark:text-pink-400 mr-4" />
              <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">{value.title}</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ValuesSection;
