'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu

import { t } from '@/lib/utils';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header({ locale = 'en' }: { locale?: string }) {
  const router = useRouter();

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${locale};path=/`;
  }, [locale]);
  const navItems = [
    { name: t('common.welcome', locale), href: '/' },
    { name: t('common.about', locale), href: '/about' },
    { name: t('common.projects', locale), href: '/projects' },
    { name: t('common.blog', locale), href: '/blog' },
    { name: t('common.contact', locale), href: '/contact' },
  ];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // isMobileMenuOpen is not needed in deps here, as we only care about pathname changes

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: 'backOut' } },
    hover: { scale: 1.05 } 
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
              {t('common.siteTitle', locale)}
            </Link>
          </motion.div>
          {/* Desktop Navigation */}
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
                  variants={navItemVariants}
                  className="relative"
                  whileHover="hover" // This refers to navItemVariants.hover if defined, or can be direct object
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? 'text-slate-900 dark:text-white bg-slate-200/70 dark:bg-white/25 ring-1 ring-slate-300 dark:ring-white/60 shadow-sm dark:shadow-lg'
                          : 'text-slate-600 dark:text-purple-200 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    {item.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 dark:bg-white"
                      layoutId="underline" 
                      initial={false} 
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 dark:bg-pink-300"
                    variants={{ hover: { scaleX: 1, originX: 0 }, hidden: { scaleX: 0, originX: 0 } }}
                    initial="hidden"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.div>
              );
            })}
          </motion.nav>
          {/* Right side items: Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <Globe size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <div className="py-1">
                  <button 
                    onClick={() => router.push(`/en${pathname.replace(/^\/(en|ru|ar)/, '')}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {t('common.languages.en', locale)}
                  </button>
                  <button 
                    onClick={() => router.push(`/ru${pathname.replace(/^\/(en|ru|ar)/, '')}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {t('common.languages.ru', locale)}
                  </button>
                  <button 
                    onClick={() => router.push(`/ar${pathname.replace(/^\/(en|ru|ar)/, '')}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {t('common.languages.ar', locale)}
                  </button>
                </div>
              </div>
            </div>
            <ThemeToggleButton />
            <div className="md:hidden ml-2"> {/* Mobile menu button container */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
                aria-label="Toggle mobile menu"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-800 shadow-lg py-2 border-t border-slate-200 dark:border-slate-700 z-40 overflow-hidden"
          >
            <nav className="flex flex-col space-y-1 px-4 pt-2 pb-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                    className={`block px-3 py-2 rounded-md text-base font-medium 
                      ${
                        isActive
                          ? 'bg-pink-100 dark:bg-pink-500/30 text-pink-700 dark:text-pink-300'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      } transition-colors`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
