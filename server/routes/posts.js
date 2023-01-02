import express from "express";
import { getFeedPosts,getSinglePost, getUserPosts, likePost, deletePost, commentPost,getPostComments } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get('/', verifyToken, verifyToken, getFeedPosts);
router.get('/:id', verifyToken, getSinglePost);

router.get('/:userId/posts', verifyToken, getUserPosts);

router.get('/:postId/comments', verifyToken, getPostComments);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);
router.patch('/:id/comment', verifyToken, commentPost);

router.delete('/:id', verifyToken, deletePost);

export default router;