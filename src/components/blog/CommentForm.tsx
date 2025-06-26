"use client";

import React, { useState } from 'react';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!author || !text) {
      setError('Author and comment cannot be empty.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, author, text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add comment');
      }

      setAuthor('');
      setText('');
      onCommentAdded(); // Notify parent component to refresh comments
    } catch (err: any) { // Reverted to 'any' due to TypeScript strict mode
      setError((err as Error).message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Add a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your Comment
          </label>
          <textarea
            id="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}
