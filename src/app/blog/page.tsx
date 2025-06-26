'use client'; // Required for framer-motion components
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Link from 'next/link';
import { useLocale } from 'next-intl'; // Import useLocale

interface BlogPostType {
  _id: string;
  title: {
    ar: string;
    ru: string;
    en: string;
  };
  content: {
    ar: string;
    ru: string;
    en: string;
  };
  author: string;
  date: string;
  likes: number;
  averageRating?: number; // Add averageRating as it's now part of the model
}

const BlogPage = () => {
  const t = useTranslations('blogPage');
  const locale = useLocale(); // Get the current locale

  const [posts, setPosts] = useState<BlogPostType[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/blog');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8"
    >
      <main className="container mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400"
        >
          {t('title')}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {posts.map((post) => (
            <motion.div key={post._id}>
              <Link href={`/${locale}/blog/${post._id}`}> {/* Use locale in the href */}
                <BlogPostCard post={post} />
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default BlogPage;
