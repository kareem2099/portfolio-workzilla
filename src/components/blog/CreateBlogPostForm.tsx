"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateBlogPostForm = () => {
  const [titleAr, setTitleAr] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [contentRu, setContentRu] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [author, setAuthor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titleAr,
          titleRu,
          titleEn,
          contentAr,
          contentRu,
          contentEn,
          author,
        }),
      });

      if (response.ok) {
        console.log('Blog post created successfully');
        setTitleAr('');
        setTitleRu('');
        setTitleEn('');
        setContentAr('');
        setContentRu('');
        setContentEn('');
        setAuthor('');
        router.push('/en/blog');
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Failed to create blog post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="titleAr" className="block text-gray-700 text-sm font-bold mb-2">
          Title (Arabic)
        </label>
        <input
          type="text"
          id="titleAr"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={titleAr}
          onChange={(e) => setTitleAr(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="titleRu" className="block text-gray-700 text-sm font-bold mb-2">
          Title (Russian)
        </label>
        <input
          type="text"
          id="titleRu"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={titleRu}
          onChange={(e) => setTitleRu(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="titleEn" className="block text-gray-700 text-sm font-bold mb-2">
          Title (English)
        </label>
        <input
          type="text"
          id="titleEn"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={titleEn}
          onChange={(e) => setTitleEn(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contentAr" className="block text-gray-700 text-sm font-bold mb-2">
          Content (Arabic)
        </label>
        <textarea
          id="contentAr"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={contentAr}
          onChange={(e) => setContentAr(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contentRu" className="block text-gray-700 text-sm font-bold mb-2">
          Content (Russian)
        </label>
        <textarea
          id="contentRu"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={contentRu}
          onChange={(e) => setContentRu(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contentEn" className="block text-gray-700 text-sm font-bold mb-2">
          Content (English)
        </label>
        <textarea
          id="contentEn"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
          Author
        </label>
        <input
          type="text"
          id="author"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreateBlogPostForm;
