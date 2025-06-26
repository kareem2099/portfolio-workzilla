"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import RatingComponent from './RatingComponent';

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
  averageRating?: number; // Add averageRating
}

interface BlogPageContentProps {
  id: string;
}

export default function BlogPageContent({ id }: BlogPageContentProps) {
  const locale = useLocale();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false); // State to trigger comment list refresh

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Could not fetch blog post:", error);
      setPost(null);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentAdded = () => {
    setCommentsUpdated(!commentsUpdated); // Toggle state to trigger re-fetch in CommentList
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8"
    >
      <main className="container mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-600 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400"
        >
          {post.title[locale as keyof typeof post.title]}
        </motion.h1>
        <div className="prose dark:prose-invert">
          <p>{post.content[locale as keyof typeof post.content]}</p>
        </div>
        <div className="mt-8">
          <RatingComponent postId={id} />
          <CommentList postId={id} commentsUpdated={commentsUpdated} />
          <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
        </div>
      </main>
    </motion.div>
  );
}
