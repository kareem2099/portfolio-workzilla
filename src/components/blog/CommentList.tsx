"use client";

import React, { useEffect, useState } from 'react';

interface CommentType {
  _id: string;
  postId: string;
  author: string;
  date: string;
  text: string;
}

interface CommentListProps {
  postId: string;
  commentsUpdated: boolean; // Prop to trigger re-fetch when new comment is added
}

export default function CommentList({ postId, commentsUpdated }: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data);
    } catch (err: any) { // Reverted to 'any' due to TypeScript strict mode
      setError((err as Error).message || 'Failed to fetch comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, commentsUpdated]); // Re-fetch when postId changes or commentsUpdated is true

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-b-0">
              <p className="font-semibold text-slate-800 dark:text-slate-200">{comment.author}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(comment.date).toLocaleString()}
              </p>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
