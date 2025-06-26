import { NextResponse } from 'next/server';
import { db } from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const { titleAr, titleRu, titleEn, contentAr, contentRu, contentEn, author } = await req.json();

    await mongoose.connect(process.env.MONGODB_URI as string);

    const newBlogPost = new BlogPost({
      title: {
        ar: titleAr,
        ru: titleRu,
        en: titleEn,
      },
      content: {
        ar: contentAr,
        ru: contentRu,
        en: contentEn,
      },
      author,
    });

    await newBlogPost.save();

    return NextResponse.json({ message: 'Blog post created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const blogPosts = await BlogPost.find({});

    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to get blog posts' }, { status: 500 });
  }
}
