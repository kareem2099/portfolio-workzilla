import React from 'react';
// Link import removed as it's no longer used in this server component
import { notFound } from 'next/navigation';
import BlogPostPageClient from '@/components/blog/BlogPostPageClient'; // Import the new client component
// Removed motion and Variants from framer-motion

// Placeholder for blog posts data - In a real app, you'd fetch this from a CMS or database
const posts = [
  {
    slug: 'first-post',
    title: 'My First Blog Post',
    date: '2025-06-02',
    excerpt: 'This is a short summary of my first blog post...',
    content: `
      <p>This is the full content of my first blog post. It's a bit longer than the excerpt and contains much more detail.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>A Subheading</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `,
  },
  {
    slug: 'second-post',
    title: 'Another Interesting Article',
    date: '2025-06-03',
    excerpt: 'An overview of another interesting topic I wrote about...',
    content: `
      <p>Welcome to the second article. This one delves into another fascinating subject.</p>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
        <li>Point three</li>
      </ul>
      <p>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
    `,
  },
];

// This function can be used by Next.js to generate static pages at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const getPostBySlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};

// Removed pageVariants and articleVariants definitions

// Changed component definition to a direct function (removed async)
interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: Promise<PostPageProps>) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageClient post={post} />;
}

