import React from 'react';

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
}

interface BlogPostCardProps {
  post: BlogPostType;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const locale = 'en'; // TODO: Get the current locale

  return (
    <div className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card text-card-foreground">
      <h2 className="text-2xl font-semibold mb-2">
        {post.title[locale]}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">{new Date(post.date).toLocaleDateString()}</p>
    </div>
  );
};

export default BlogPostCard;
