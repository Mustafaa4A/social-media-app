import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  replies:[]
},
{ timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;