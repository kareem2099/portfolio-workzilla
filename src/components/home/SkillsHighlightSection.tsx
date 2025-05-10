'use client';

import React from 'react'; // Import React
import { motion, Variants } from 'framer-motion';
import { Zap, Code, Smartphone, Palette } from 'lucide-react'; // Example icons

interface SkillHighlight {
  name: string;
  icon: React.ReactNode; // Changed from JSX.Element
  color: string; // e.g., "text-pink-400"
  bgColor: string; // e.g., "bg-pink-500/10"
}

const skillsToHighlight: SkillHighlight[] = [
  { name: 'Next.js', icon: <Zap size={40} />, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  { name: 'JavaScript', icon: <Code size={40} />, color: 'text-sky-400', bgColor: 'bg-sky-500/10' },
  { name: 'Flutter', icon: <Smartphone size={40} />, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { name: 'UI/UX Design', icon: <Palette size={40} />, color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.2 } 
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 10,
      delay: i * 0.15 // Stagger individual items
    }
  }),
  hover: {
    scale: 1.1,
    y: -10,
    boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
    transition: { type: 'spring', stiffness: 200, damping: 8 }
  }
};

export default function SkillsHighlightSection() {
  return (
    <motion.section 
      className="py-20 sm:py-28 bg-slate-100 dark:bg-slate-900" // Theme-aware background
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 dark:from-pink-500 dark:via-purple-500 dark:to-sky-500"
          variants={titleVariants}
        >
          Technologies I Excel In
        </motion.h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          // Staggering is handled by individual item delays
        >
          {skillsToHighlight.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              variants={skillItemVariants}
              whileHover="hover"
              // Adjusting classes for theme. skill.bgColor and skill.color were for dark theme.
              // Light theme will use lighter bg and darker text.
              className={`p-6 sm:p-8 rounded-xl shadow-xl text-center cursor-default 
                         bg-white dark:${skill.bgColor} 
                         border border-slate-200 dark:border-slate-700/50`}
            >
              <div className={`inline-block p-4 rounded-full mb-4 
                             ${skill.color.replace('text-', 'text-')} dark:${skill.color} 
                             bg-slate-200 dark:bg-slate-800`}> 
                {/* Assuming skill.color was like 'text-purple-400', this attempts to use purple-400 for light text too. 
                    This might need more specific light theme text colors if the contrast isn't good.
                    For example, text-purple-600 for light, dark:text-purple-400 for dark.
                    Let's simplify for now and use the same base color, relying on background for contrast.
                */}
                {skill.icon}
              </div>
              <h3 className={`text-xl sm:text-2xl font-semibold ${skill.color.replace('text-','text-')} dark:${skill.color}`}>{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
