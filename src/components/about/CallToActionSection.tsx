'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const defaultItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface CallToActionSectionProps {
  variants?: typeof defaultItemVariants;
}

export default function CallToActionSection({ variants = defaultItemVariants }: CallToActionSectionProps) {
  return (
    <motion.section variants={variants} className="text-center pb-12">
      <h2 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-300">Interested in my work?</h2>
      <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
        Check out some of the projects I&apos;ve brought to life.
      </p>
      <Link
        href="/projects"
        className="inline-block px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 hover:from-pink-600 hover:via-red-600 hover:to-yellow-500 dark:from-pink-600 dark:via-red-500 dark:to-yellow-500 dark:hover:from-pink-700 dark:hover:via-red-600 dark:hover:to-yellow-600 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
      >
        View My Projects
      </Link>
    </motion.section>
  );
}
