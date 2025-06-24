'use client';

import { motion, Variants, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  priceLinux: number;
  priceWindows: number;
  imageUrl: string;
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  windowsBuyLink?: string;
  linuxBuyLink?: string;
}

interface AppsPageProps {
  params: { locale: string };
}

const AppsPage = ({ params }: AppsPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const pageContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const titleText = "My Apps";
  const titleChars = Array.from(titleText);

  const titleContainerAnimVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 },
    },
  };

  const titleCharAnimVariants: Variants = {
    hidden: { opacity: 0, x: -20, y: 10, rotateZ: -15, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      filter: "blur(0px)",
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto"
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400 flex justify-center flex-wrap"
          variants={titleContainerAnimVariants}
          aria-label={titleText}
        >
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              variants={titleCharAnimVariants}
              className={`inline-block ${char === ' ' ? 'mx-1 sm:mx-2' : ''}`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            <motion.div
              key="apps"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ProjectCard
                    project={{
                      id: product._id,
                      title: product.name,
                      description: product.description,
                      imageUrl: product.imageUrl,
                      techStack: product.techStack,
                      liveLink: '#', // You might want to add a liveLink field to your product model
                      codeLink: '#', // You might want to add a codeLink field to your product model
                      category: 'Apps',
                      windowsPrice: product.priceWindows,
                      linuxPrice: product.priceLinux,
                      windowsBuyLink: product.windowsBuyLink,
                      linuxBuyLink: product.linuxBuyLink,
                    }}
                    locale={typeof params?.locale === 'string' ? params.locale : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="no-projects-message"
              className="text-center text-xl text-slate-500 dark:text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              More apps coming soon! Stay tuned.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AppsPage;
