'use client'; // This component will handle animations

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Define the Post type (can be imported from a shared types file in a larger app)
interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface BlogPostPageClientProps {
  post: Post;
}

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const articleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
  },
};

const BlogPostPageClient: React.FC<BlogPostPageClientProps> = ({ post }) => {
  return (
    <motion.div 
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="container mx-auto">
        <motion.article 
          className="prose lg:prose-xl max-w-3xl mx-auto bg-white dark:bg-slate-800/50 p-6 md:p-10 rounded-lg shadow-xl"
          variants={articleVariants}
          // initial & animate are inherited if this is a direct child of a motion component with staggerChildren,
          // or can be set explicitly if needed. Here, pageVariants handles the overall page load.
        >
          <Link href="/blog" className="text-primary hover:underline mb-8 inline-block text-lg">
            &larr; Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">{post.title}</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 mb-8">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
          <div className="text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>
      </main>
    </motion.div>
  );
};

export default BlogPostPageClient;
