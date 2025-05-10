'use client';

import { motion, Variants } from 'framer-motion';

interface ContactHeaderProps {
  variants?: Variants;
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const title = "Let's Create Something Amazing";
const titleChars = Array.from(title);

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
};

const titleCharVariants: Variants = {
  hidden: { opacity: 0, y: 20, skewX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    skewX: 0,
    transition: { type: 'spring', damping: 15, stiffness: 200 },
  },
};

export default function ContactHeader({ variants = defaultItemVariants }: ContactHeaderProps) {
  return (
    <motion.div variants={variants} className="text-center mb-12">
      <motion.h1 
        className="text-5xl sm:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-red-600 to-yellow-500 dark:from-pink-500 dark:via-red-500 dark:to-yellow-500 flex justify-center flex-wrap"
        variants={titleContainerVariants}
        initial="hidden"
        animate="visible"
        aria-label={title}
      >
        {titleChars.map((char, index) => (
          <motion.span
            key={index}
            variants={titleCharVariants}
            className={`inline-block ${char === ' ' ? 'mx-1 sm:mx-2' : ''}`} // Gradient is on parent h1
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p 
        className="text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
        initial={{ opacity:0, y:10 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay: titleChars.length * 0.03 + 0.4, duration: 0.5 }} // Delay after title animation
      >
        Have a project in mind, a question, or just want to connect? I&apos;m all ears! Fill out the form below or reach out through my socials.
      </motion.p>
    </motion.div>
  );
}
