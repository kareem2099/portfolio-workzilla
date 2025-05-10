'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { useEffect, useState } from 'react';

export default function ThemeToggleButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Avoid rendering button until theme is known to prevent mismatch or flash
    // Or render a placeholder. For a small button, null is often fine.
    return <div style={{ width: '40px', height: '40px' }} />; // Placeholder to prevent layout shift
  }

  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    exit: { opacity: 0, rotate: 90, scale: 0.5, transition: { duration: 0.2 } },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-700/50 dark:hover:bg-slate-200/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-opacity-75 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Moon className="h-6 w-6 text-slate-300 dark:text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Sun className="h-6 w-6 text-yellow-500 dark:text-slate-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
