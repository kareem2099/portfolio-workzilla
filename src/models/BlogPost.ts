import { Schema, model, models } from 'mongoose';

const blogPostSchema = new Schema({
  title: {
    ar: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  content: {
    ar: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
});

const BlogPost = models.BlogPost || model('BlogPost', blogPostSchema);

export default BlogPost;
