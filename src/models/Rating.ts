import { Schema, model, models } from 'mongoose';

const ratingSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  userId: { type: String, required: true }, // Assuming a simple user ID for now
  score: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
  date: { type: Date, default: Date.now },
});

const Rating = models.Rating || model('Rating', ratingSchema);

export default Rating;
