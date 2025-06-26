import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Rating from '@/models/Rating';
import BlogPost from '@/models/BlogPost'; // To update average rating on BlogPost

export async function POST(req: Request) {
  try {
    const { postId, userId, score } = await req.json();

    await dbConnect();

    // Check if the user has already rated this post
    const existingRating = await Rating.findOne({ postId, userId });
    if (existingRating) {
      return NextResponse.json({ message: 'User has already rated this post' }, { status: 409 });
    }

    const newRating = new Rating({
      postId,
      userId,
      score,
    });

    await newRating.save();

    // Update average rating on the BlogPost
    const ratings = await Rating.find({ postId });
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageRating = totalScore / ratings.length;

    await BlogPost.findByIdAndUpdate(postId, { averageRating: averageRating });

    return NextResponse.json({ message: 'Rating added successfully', rating: newRating }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add rating' }, { status: 500 });
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

    const ratings = await Rating.find({ postId });
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageRating = ratings.length > 0 ? totalScore / ratings.length : 0;

    return NextResponse.json({ averageRating, totalRatings: ratings.length }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to get ratings' }, { status: 500 });
  }
}
