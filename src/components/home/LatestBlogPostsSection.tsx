'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import BlogPostCard from '@/components/blog/BlogPostCard'; // Reusing the existing card
import { useTranslations } from 'next-intl';

// Placeholder for blog posts data - In a real app, you'd fetch this
// For consistency, using the same structure as in blog pages
const allPosts = [
  {
    slug: 'first-post',
    title: 'My First Blog Post',
    date: '2025-06-02',
    excerpt: 'This is a short summary of my first blog post...',
    // content is not needed for the card snippet
  },
  {
    slug: 'second-post',
    title: 'Another Interesting Article',
    date: '2025-06-03',
    excerpt: 'An overview of another interesting topic I wrote about...',
  },
  {
    slug: 'third-post-example', // Add a third post for demonstration
    title: 'The Future of Web Development',
    date: '2025-06-04',
    excerpt: 'Exploring upcoming trends and technologies in the web dev space.',
  },
];

// Display, for example, the latest 2 or 3 posts
const postsToShow = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Card variants can be reused from BlogPostCard or defined here if different
// For simplicity, BlogPostCard handles its own hover, this is for entry of the wrapper

const LatestBlogPostsSection: React.FC = () => {
  const t = useTranslations('homePage.latestBlogPostsSection');

  if (postsToShow.length === 0) {
    return null; // Don't render section if no posts
  }

  return (
    <motion.section 
      className="w-full py-16 md:py-24 bg-slate-100 dark:bg-slate-800/30" // Slightly different bg to distinguish sections
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 md:mb-16 text-slate-800 dark:text-slate-100"
          variants={titleVariants}
        >
          {t('title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 mb-12 md:mb-16">
          {postsToShow.map((post) => (
            // Each card can have its own entry animation if BlogPostCard is wrapped in motion.div
            // For now, the grid itself staggers, and BlogPostCard has hover.
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <motion.div 
          className="text-center"
          variants={titleVariants} // Reusing titleVariants for simple fade-in for the button
        >
          <Link 
            href="/blog" 
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {t('viewAllPostsButton')}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LatestBlogPostsSection;
