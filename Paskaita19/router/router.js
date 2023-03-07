import express from 'express';
import { createNewPost, getAllPosts, getPostWithTitle, getPostsWithBody, getPostById } from '../controllers/controllers.js';
const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/title', getPostWithTitle);
router.get('/posts/body', getPostsWithBody);
router.get('/posts/:id', getPostById);
router.post('/posts', createNewPost);

export default router;
