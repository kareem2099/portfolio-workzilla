'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggleButton from './ThemeToggleButton'; // Import ThemeToggleButton

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: 'backOut' } },
    // Hover effect will be handled by Tailwind's group-hover or direct CSS for theme-awareness if needed,
    // or by conditional styling if Framer Motion's variants are preferred for complex theme changes.
    // For simplicity, direct text color is handled by Tailwind dark: variant.
    // The textShadow for hover can be tricky with Tailwind's dark: variant directly in Framer Motion variants.
    // Let's rely on scale for now and potentially add theme-specific shadow via CSS if complex.
    hover: { scale: 1.05 } 
    // To make textShadow theme-aware within Framer's variants, you'd typically need JS logic to pick the shadow color
    // or use CSS custom properties that change with the theme.
    // Example for theme-aware shadow (more complex, not implemented here for brevity):
    // hover: theme === 'dark' ? { scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.5)" } : { scale: 1.05, textShadow: "0px 0px 8px rgba(0,0,0,0.2)" }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
    // hover and tap will be handled slightly differently with the underline
    // hover: { scale: 1.1, y: -3, color: '#ffffff' },
    // tap: { scale: 0.95 },
  };

  const lightHeaderBase = "bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200";
  const darkHeaderBase = "dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-500 dark:to-red-500 dark:shadow-md";
  const lightHeaderScrolled = "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-300";
  const darkHeaderScrolled = "dark:bg-gradient-to-r dark:from-purple-700 dark:via-pink-600 dark:to-red-600 dark:shadow-xl dark:backdrop-blur-sm dark:bg-opacity-90";

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
        ${scrolled ? `${lightHeaderScrolled} ${darkHeaderScrolled}` : `${lightHeaderBase} ${darkHeaderBase}`}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link href="/" className="text-2xl font-bold text-slate-800 dark:text-white">
              MyPortfolio
            </Link>
          </motion.div>
          <motion.nav
            className="hidden md:flex md:space-x-1 lg:space-x-2"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  variants={navItemVariants} // Initial animation for the item itself
                  className="relative" // For positioning the underline
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? 'text-slate-900 dark:text-white bg-slate-200/70 dark:bg-white/25 ring-1 ring-slate-300 dark:ring-white/60 shadow-sm dark:shadow-lg' // Active link text color & bg
                          : 'text-slate-600 dark:text-purple-200 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    {item.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 dark:bg-white" // Underline color
                      layoutId="underline" 
                      initial={false} 
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 dark:bg-pink-300" // Hover underline color
                    variants={{ hover: { scaleX: 1, originX: 0 }, hidden: { scaleX: 0, originX: 0 } }}
                    initial="hidden"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              );
            })}
          </motion.nav>
          <div className="flex items-center">
            <ThemeToggleButton />
            {/* Placeholder for Mobile Menu Button - can be added later */}
            <div className="md:hidden ml-3"> 
              {/* Example: <button className="text-white">Menu</button> */}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
