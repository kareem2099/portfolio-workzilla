'use client';

import React, { useState } from 'react'; // Import React
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Import Variants
import { ChevronDown } from 'lucide-react';

interface InteractiveSkillCardProps {
  name: string;
  icon: React.ReactNode; 
  level: string;
  experience?: string;
  projects?: string;
  detailsColor?: string; // For specific accent on details text, e.g. gold
  // baseColor prop will be removed, default level color will be theme-aware
  skillVariants: Variants; 
  isPulsing?: boolean; 
}

export default function InteractiveSkillCard({
  name,
  icon,
  level,
  experience,
  projects,
  detailsColor, // Will default to theme-aware color if not provided
  skillVariants,
  isPulsing = false
}: InteractiveSkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotate, setRotate] = useState(0);

  const handleInteraction = () => {
    setIsExpanded(!isExpanded);
    setRotate(rotate + 360); // Rotate on each click
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.div
      variants={skillVariants}
      whileHover="hover"
      className="bg-white dark:bg-gray-800/70 dark:backdrop-blur-md p-6 rounded-xl shadow-lg dark:shadow-xl text-center flex flex-col items-center justify-start cursor-pointer relative overflow-hidden border border-slate-200 dark:border-slate-700/50"
      onClick={experience || projects ? handleInteraction : undefined}
      animate={{ 
        rotateY: rotate,
        scale: isPulsing ? [1, 1.03, 1] : 1 // Pulse animation if isPulsing is true
      }}
      transition={{ 
        rotateY: { duration: 0.6, ease: 'easeInOut' },
        scale: isPulsing ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}
      }}
    >
      {isPulsing && (
        <motion.div 
          className="absolute top-0 left-0 right-0 bottom-0 rounded-xl border-2 border-pink-500 dark:border-pink-400 opacity-0" // Theme-aware pulse border
          animate={{
            opacity: [0, 0.7, 0],
            scale: [1, 1.1, 1.15],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      <div className="mb-3 h-10 w-10 flex items-center justify-center relative z-10">{icon}</div>
      <h3 className="text-xl font-semibold mb-1 text-slate-800 dark:text-gray-100 relative z-10">{name}</h3>
      <p className={`text-sm ${isExpanded && detailsColor ? detailsColor : 'text-slate-600 dark:text-purple-300'} mb-2 relative z-10`}>{level}</p>
      
      {experience || projects ? (
        <motion.div
          className="absolute bottom-2 right-2 text-slate-500 dark:text-gray-400 z-10" /* Removed relative */
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      ) : null}

      <AnimatePresence>
        {isExpanded && (experience || projects) && (
          <motion.div
            className={`mt-3 pt-3 border-t border-slate-300 dark:border-gray-700/50 w-full text-xs ${detailsColor || 'text-slate-600 dark:text-slate-300'} relative z-10`}
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {experience && <motion.p variants={detailsVariants} className="mb-1">{experience}</motion.p>}
            {projects && <motion.p variants={detailsVariants}>{projects}</motion.p>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
