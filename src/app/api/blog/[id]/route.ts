import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await dbConnect();

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to get blog post' }, { status: 500 });
  }
}
