"use client";

import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingComponentProps {
  postId: string;
}

export default function RatingComponent({ postId }: RatingComponentProps) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchRatings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/ratings?postId=${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAverageRating(data.averageRating);
      setTotalRatings(data.totalRatings);
    } catch (err: any) { // Reverted to 'any' due to TypeScript strict mode
      setError((err as Error).message || 'Failed to fetch ratings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [postId]);

  const handleRatingClick = async (score: number) => {
    // For simplicity, assuming a static userId for now. In a real app, this would come from auth.
    const userId = 'anonymousUser123'; 
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit rating');
      }

      setUserRating(score);
      setMessage('Your rating has been submitted!');
      fetchRatings(); // Re-fetch to update average rating
    } catch (err: any) { // Reverted to 'any' due to TypeScript strict mode
      setError((err as Error).message || 'An unexpected error occurred.');
    }
  };

  if (loading) {
    return <div>Loading ratings...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Rate this Blog Post</h3>
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100 mr-2">
          {averageRating.toFixed(1)}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  (hoverRating || averageRating) >= starValue
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                onClick={() => handleRatingClick(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                size={24}
              />
            );
          })}
        </div>
        <span className="ml-2 text-slate-600 dark:text-slate-400">({totalRatings} ratings)</span>
      </div>
      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      {userRating > 0 && (
        <p className="text-slate-600 dark:text-slate-400">You rated this post: {userRating} stars.</p>
      )}
    </div>
  );
}
