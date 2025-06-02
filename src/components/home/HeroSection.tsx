'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Eye, MessageSquare } from 'lucide-react'; // Removed ArrowRight

const name = "Mohamed Ehab";
const role = "Full-Stack Developer";

const nameChars = Array.from(name);
const roleChars = Array.from(role);

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.8, rotateX: -45 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  }),
};

const taglineVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: (nameChars.length + roleChars.length) * 0.04 + 0.5, // After name and role
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const buttonContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: (nameChars.length + roleChars.length) * 0.04 + 1.0, // After tagline
      staggerChildren: 0.2,
      type: 'spring',
      stiffness: 100,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Optional: Animated background shapes */}
      <motion.div 
        className="absolute inset-0 z-0" // Opacity will be controlled by individual shapes for theme
        initial={{ opacity: 0}} // Overall container opacity for initial fade-in
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Example shapes - can be replaced with more complex SVGs or canvas */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full filter blur-2xl opacity-10 dark:opacity-20"
          animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-600 rounded-full filter blur-2xl opacity-10 dark:opacity-20"
          animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
        />
         <motion.div 
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-sky-500 rounded-lg filter blur-xl opacity-10 dark:opacity-20"
          animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      <div className="relative z-10">
        <motion.h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-3">
          {nameChars.map((char, index) => (
            <motion.span
              key={`name-${index}`}
              custom={index}
              variants={charVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block ${char === ' ' ? 'mx-1 sm:mx-2' : ''} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sky-700 dark:text-sky-300 mb-8">
          {roleChars.map((char, index) => (
            <motion.span
              key={`role-${index}`}
              custom={nameChars.length + index} // Continue delay sequence
              variants={charVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block ${char === ' ' ? 'mx-0.5 sm:mx-1' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p 
          className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
          variants={taglineVariants}
          initial="hidden"
          animate="visible"
        >
          Crafting seamless digital experiences with cutting-edge technology and creative design.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <motion.span // Changed from motion.a to motion.span, Link handles the <a>
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-pink-600 dark:via-red-600 dark:to-yellow-600 rounded-lg shadow-lg flex items-center justify-center cursor-pointer" /* Removed block */
            >
              <Eye size={20} className="mr-2" /> View My Work
            </motion.span>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.span // Changed from motion.a to motion.span
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 text-lg font-semibold text-pink-600 border-2 border-pink-500 rounded-lg shadow-md hover:bg-pink-500 hover:text-white dark:text-pink-300 dark:border-pink-400 dark:hover:bg-pink-400 dark:hover:text-slate-900 transition-colors duration-300 flex items-center justify-center cursor-pointer" /* Removed block */
            >
              <MessageSquare size={20} className="mr-2" /> Get In Touch
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
