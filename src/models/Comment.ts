import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
});

const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;
