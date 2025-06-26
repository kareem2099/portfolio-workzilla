"use client";

import BlogPageContent from '@/components/blog/BlogPageContent';

interface Props {
  params: { id: string };
}

export default function BlogPostPage({ params }: Props) {
  const { id } = params;

  return <BlogPageContent id={id} />;
}
