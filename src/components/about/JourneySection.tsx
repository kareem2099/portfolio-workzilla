'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const defaultItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface JourneySectionProps {
  variants?: typeof defaultItemVariants;
}

export default function JourneySection({ variants = defaultItemVariants }: JourneySectionProps) {
  return (
    <motion.section variants={variants} className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-600 dark:text-purple-300 flex items-center justify-center">
        <Briefcase className="mr-3 h-10 w-10" /> My Journey
      </h2>
      <div className="bg-slate-100 dark:bg-gray-800/50 dark:backdrop-blur-md p-8 rounded-xl shadow-xl dark:shadow-2xl space-y-6 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-transparent">
        <p>
          My fascination with web development started years ago, tinkering with HTML and CSS. This curiosity quickly evolved into a full-blown passion as I delved into JavaScript and modern frameworks. I believe in continuous learning and staying updated with the latest industry trends to deliver cutting-edge solutions.
        </p>
        <p>
          I specialize in the Next.js ecosystem, leveraging its power for server-side rendering, static site generation, and seamless API integration. My goal is to build not just functional, but also performant and aesthetically pleasing digital experiences.
        </p>
        <p>
          When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or [mention a hobby].
        </p>
      </div>
    </motion.section>
  );
}
