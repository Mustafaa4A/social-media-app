import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    location: String,
    description: String,
    picturePath: {
      type: String,
      default : ''
    },
    likes: {
      type: Object,
      default:{}
    }, 
    comments: {
      type: Object,
      default:{}
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;