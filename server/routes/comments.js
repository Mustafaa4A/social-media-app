import express, { Router } from 'express';
import {
  getFeedComments,
  getPostComments,
  createComment,
  deleteComment
} from '../controllers/comments.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken, getFeedComments);
router.get('/:postId/comments', verifyToken, getPostComments);

router.post('/', verifyToken, createComment);
router.delete('/:id', verifyToken, deleteComment);

export default router;