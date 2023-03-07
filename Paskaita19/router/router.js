import express from 'express';
import { createNewPost, getAllPosts } from '../controllers/controllers.js';
const router = express.Router();

router.get('/posts', getAllPosts);
router.get('/posts/title');
router.get('/posts/body');
router.post('/posts', createNewPost);

export default router;
