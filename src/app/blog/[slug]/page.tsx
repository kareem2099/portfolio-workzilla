import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = useLocale();
  const t = useTranslations('blogPage');

  const slug = params.slug;

  const titleKey = `myFirstYearInCybersecurityTitle`;
  const contentKey = `myFirstYearInCybersecurityContent`;

  const title = t(titleKey);
  const content = t(contentKey);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}
