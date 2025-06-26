import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();

    await dbConnect();

    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    blogPost.likes += 1;
    await blogPost.save();

    return NextResponse.json({ message: 'Blog post liked successfully', likes: blogPost.likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to like blog post' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();

    await dbConnect();

    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    blogPost.likes -= 1;
    await blogPost.save();

    return NextResponse.json({ message: 'Blog post unliked successfully', likes: blogPost.likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to unlike blog post' }, { status: 500 });
  }
}
