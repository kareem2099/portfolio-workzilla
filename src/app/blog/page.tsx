'use client'; // Required for framer-motion components

import React from 'react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { motion, Variants } from 'framer-motion';

// Placeholder for blog posts data
const posts = [
  {
    slug: 'first-post',
    title: 'My First Blog Post',
    date: '2025-06-02',
    excerpt: 'This is a short summary of my first blog post...',
  },
  {
    slug: 'second-post',
    title: 'Another Interesting Article',
    date: '2025-06-03',
    excerpt: 'An overview of another interesting topic I wrote about...',
  },
];

const pageContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2, // Delay after title might have animated
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};


const BlogPage = () => {
  return (
    <motion.div 
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8"
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="container mx-auto">
        <motion.h1 
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400"
          variants={titleVariants}
        >
          Blog & Articles
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          variants={gridVariants}
          // initial and animate are handled by pageContainerVariants
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default BlogPage;
