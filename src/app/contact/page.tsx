'use client';

import { motion, Variants } from 'framer-motion';
// import ContactHeader from '@/components/contact/ContactHeader';
// import ContactForm from '@/components/contact/ContactForm';
// import SocialLinks from '@/components/contact/SocialLinks';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Stagger between major sections
      delayChildren: 0.1,   // Small delay before first child starts
    },
  },
};

const itemVariants: Variants = { // Passed to each section
  hidden: { opacity: 0, y: 30, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.7
    }
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center">
      <motion.div
        className="container mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200"
          variants={itemVariants}
        >
          If you want to contact me, please contact me in Workzilla.
        </motion.p>
      </motion.div>
    </div>
  );
}
