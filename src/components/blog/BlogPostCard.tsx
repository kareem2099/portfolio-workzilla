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
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground">
      <h2 className="text-2xl font-semibold mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="text-sm text-muted-foreground mb-3">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-medium">
        Read more &rarr;
      </Link>
    </div>
  );
};

export default BlogPostCard;
