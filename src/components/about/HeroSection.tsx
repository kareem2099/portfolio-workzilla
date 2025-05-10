'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, MessageSquare } from 'lucide-react';

const name = "Kareem Ehab";
const nameChars = Array.from(name);

const nameContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: i * 0.02 + 0.5 },
  }),
};

const nameCharVariants = {
  hidden: { opacity: 0, y: 20, x: -10, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    transition: { type: 'spring', damping: 12, stiffness: 200 },
  },
};

// General item variant, can be passed as prop or defined if specific needs arise
const defaultItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface HeroSectionProps {
  variants?: typeof defaultItemVariants;
}

export default function HeroSection({ variants = defaultItemVariants }: HeroSectionProps) {
  return (
    <motion.section variants={variants} className="text-center mb-16">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'backOut', delay: 0.2 }}
        className="inline-block p-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-purple-600 dark:via-pink-600 dark:to-red-600 mb-6"
      >
        <User className="h-24 w-24 text-slate-700 dark:text-white bg-white/80 dark:bg-gray-800 rounded-full p-4" />
      </motion.div>
      
      {/* The h1's text color is handled by spans inside, which need updating */}
      <motion.h1 
        className="text-5xl font-extrabold mb-4 flex justify-center flex-wrap"
        variants={nameContainerVariants}
        aria-label={name}
      >
        {nameChars.map((char, index) => (
          <motion.span 
            key={index} 
            variants={nameCharVariants} 
            className={`${char === ' ' ? 'mx-1' : ''} bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-400 dark:via-pink-400 dark:to-red-400`}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p variants={variants} className="text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        A passionate Full-Stack Developer with a knack for creating dynamic, responsive, and user-friendly web applications. I thrive on turning complex problems into elegant solutions.
      </motion.p>
      <motion.div variants={variants}>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 dark:from-purple-500 dark:via-pink-500 dark:to-red-500 dark:hover:from-purple-600 dark:hover:via-pink-600 dark:hover:to-red-600 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          Let&apos;s Connect <MessageSquare className="inline ml-2 h-5 w-5" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
