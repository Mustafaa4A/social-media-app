import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// * get all comments
export const getFeedComments = async (req,res) => {
  try {
    const comments = Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// * 
export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params();
    const comments = Comment.find({ postId });
    
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//* Create post
export const createComment = async (req, res) => {
  try {
    const { userId, postId, description } = req.body;
    
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    
    if (!user) return res.status(404).json({ error: 'Invalid user ID' });
    if (!post) return res.status(404).json({ error: 'Invalid post ID' });

    const newComment = Comment({
      userId,
      postId,
      description,
      replies: []
    })

    res.status(201).json(newComment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//* delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = Comment.findByIdAndDelete(id, { new: true });
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json({error:error.message})
  }
}