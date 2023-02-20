import Post from "../models/Post.js";
import User from "../models/User.js";
import { findUser } from "./users.js";

//* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = await req.body;

    if (!picturePath) {
      picturePath = '';
    }


    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Invalid user ID' });
    const newPost = new Post({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        picturePath: user.picturePath,
      },
      description,
      picturePath,
      likes: {
        count: 0,
        liked:[]
      },
      comments: {
        count: 0,
        commented:[]
      }
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

//* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ "createdAt": -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// export const getAllPosts = async (req,res) => {
//   try {
//     let allPosts = [];
//     const posts = await Post.find().sort({ "createdAt": 1 });
    
//     posts.map(async (post) => {
//       let user = await findUser(post.userId); 
//       const { _id, firstName, lastName, picturePath } = user;
//       const customized = {
//         _id: post._id,
//         user: { _id, firstName, lastName, picturePath },
//         description: post.description,
//         picturePath:post.picturePath,
//         likes: post.likes || {},
//         comments: post.comments || []
//       };
//       console.log(customized);
//       return allPosts.push(customized);
//     })

//     console.log(allPosts);

//     res.status(200).json(allPosts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }


export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;


    const post = await Post.findById(id);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'Invalid user ID' });
    if (!post) return res.status(404).json({ error: 'Invalid post ID' });

    const isLiked = post.likes.liked.includes(userId);

    if (isLiked) {
      post.likes.liked.pop(userId);
      post.likes.count = post.likes.count - 1;
    } else {
      post.likes.liked.push(userId);
      post.likes.count = post.likes.count + 1;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// * Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPost = Post.findByIdAndDelete(id, { new: true });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// * Comment post
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;


    const post = await Post.findById(id);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'Invalid user ID' });
    if (!post) return res.status(404).json({ error: 'Invalid post ID' });

    post.comments.count = post.comments.count + 1;
    post.comments.commented.push({
      userId,
      comment
    })

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// * READ POST COMMENTS
export const getPostComments = async (req,res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: 'Invalid post ID' });

    const comments = post.comments.commented;
    const formattedComments = await Promise.all(
        comments.map(async (comment) => {
        const user = await findUser(comment.userId);
          
          if (!user) return;
          
          const { _id, firstName, lastName, username, picturePath } = user;
          const newComment = {
            user: {
              _id,firstName, lastName, username, picturePath
            },
            comment: comment.comment
          }
          return newComment;
      })
    )

    res.json(formattedComments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}