"use client";

import BlogPostCard from '@/components/blog/BlogPostCard';
import { useRouter } from 'next/navigation';
import React from 'react';

const BlogPage = () => {
  const router = useRouter();

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px:6 lg:px-8"
    >
      <main className="container mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          
              <BlogPostCard
                post={{
                  slug: 'my-first-year-in-cybersecurity',
                  title: 'Мой первый год в кибербезопасности (2017) - RU',
                  date: '2017-01-01',
                  excerpt: 'Это был мой первый раз, когда я использовал kali linux, я интересовался хакерством в детстве, чтобы взломать свой Wi-Fi... - RU',
                }}
                onClick={() => handlePostClick('my-first-year-in-cybersecurity')}
              />
            
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
