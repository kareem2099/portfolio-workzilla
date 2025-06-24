import React from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface BlogPostCardProps {
  post: Post;
  onClick?: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground" onClick={onClick}>
      <h2 className="text-2xl font-semibold mb-2">
          {post.title}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
    </div>
  );
};

export default BlogPostCard;
