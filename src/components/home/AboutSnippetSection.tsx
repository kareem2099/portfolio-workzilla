'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { UserCircle, ArrowRight } from 'lucide-react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } 
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, delay: 0.6 } },
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(192, 132, 252, 0.3)" /* purple-300 with opacity */ },
  tap: { scale: 0.95 },
};

export default function AboutSnippetSection() {
  return (
    <motion.section 
      className="py-20 sm:py-28 bg-slate-100 dark:bg-slate-800/30 dark:backdrop-blur-sm" // Theme-aware background
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when it comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of it is visible
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div 
          className="inline-block mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.3 }}
        >
          <UserCircle size={64} className="text-purple-600 dark:text-purple-400" />
        </motion.div>
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 mb-6"
          variants={textVariants} // Re-use textVariants or create specific ones
        >
          A Little About Me
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto"
          variants={textVariants}
          transition={{ delay: 0.5 }} // Slightly later delay for paragraph
        >
          I&apos;m a passionate Full-Stack Developer dedicated to building intuitive, performant, and visually appealing web applications. With a strong foundation in modern web technologies, I love bringing ideas to life and solving complex challenges.
        </motion.p>
        <motion.div
          // initial, animate, whileHover, whileTap will be on the Link/motion.span
        >
          <Link href="/about" className="inline-block">
            <motion.span // Changed from motion.a to motion.span
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg shadow-lg transition-colors duration-300 cursor-pointer"
              variants={buttonVariants} 
              initial="hidden" // These will be controlled by the parent's whileInView
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Learn More <ArrowRight size={20} className="ml-2" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
