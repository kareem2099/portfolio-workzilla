import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function POST(req: Request) {
  try {
    const { postId, author, text } = await req.json();

    await dbConnect();

    const newComment = new Comment({
      postId,
      author,
      text,
    });

    await newComment.save();

    return NextResponse.json({ message: 'Comment created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    await dbConnect();

    if (!postId) {
      return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
    }

    const comments = await Comment.find({ postId });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to get comments' }, { status: 500 });
  }
}
