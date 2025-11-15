import express from 'express';
import {
  createPost,
  getFeed,
  getPost,
  likePost,
  savePost,
  addComment,
  deletePost,
  getUserPosts,
} from '../controllers/postController.js';
import { protect, optional } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/feed', optional, getFeed);
router.get('/user/:username', getUserPosts);
router.get('/:id', getPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/save', protect, savePost);
router.post('/:id/comments', protect, addComment);
router.delete('/:id', protect, deletePost);

export default router;
