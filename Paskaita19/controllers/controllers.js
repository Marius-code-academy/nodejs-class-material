import Post from '../db/postModel.js';
import dotenv from 'dotenv';

dotenv.config();
const JSON_URI = process.env.JSON_URI;

export async function getAllPosts(req, res) {
  try {
    const mongoRequest = Post.find({}, { __v: false });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([mongoRequest, placeholderRequest]);

    const placeholderPosts = await placeholderResponse.json();

    const serializedMongoPosts = mongoResponse.map((post) => ({
      id: post._id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    }));

    res.json([...serializedMongoPosts, ...placeholderPosts]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getPostWithTitle(req, res) {
  try {
    const mongoRequest = Post.find({}, { title: true, userId: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([mongoRequest, placeholderRequest]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...placeholderPosts, ...mongoResponse];

    const serializedPosts = combinedPosts.map((post) => ({
      title: post.title,
      userId: post.userId,
    }));

    res.json(serializedPosts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getPostsWithBody(req, res) {
  try {
    const mongoRequest = Post.find({}, { body: true, userId: true, _id: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([mongoRequest, placeholderRequest]);
    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...mongoResponse, ...placeholderPosts];
    const serializedPosts = combinedPosts.map((post) => ({
      body: post.body,
      userId: post.userId,
      id: post.id,
    }));

    // const serializedMongoPosts = mongoResponse.map((post) => ({
    //   id: post._id,
    //   body: post.body,
    //   userId: post.userId,
    // }));

    // const serializedPlaceholderPosts = placeholderPosts.map((post) => {
    //   const { title, ...rest } = post;
    //   return rest;
    // });

    // res.json([...serializedMongoPosts, ...serializedPlaceholderPosts]);
    res.json(serializedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const placeholderRes = await fetch(JSON_URI + `/${id}`);
    const placeholderPost = await placeholderRes.json();

    if (Object.keys(placeholderPost).length === 0) {
      if (id.length === 24) {
        const mongoPost = await Post.findById(id);
        if (mongoPost === null) {
          res.status(404).json({ message: `no post found for ${id}` });
        } else {
          res.json(mongoPost);
        }
      } else {
        res.status(404).json({ message: `no post found for ${id}` });
      }
    } else {
      res.json(placeholderPost);
    }

    // if (id.length === 24) {
    //   const mongoPost = await Post.findById(id);

    //   if (mongoPost === null) {
    //     const placeholderRes = await fetch(JSON_URI + `/${id}`);
    //     const placeholderPost = await placeholderRes.json();

    //     if (Object.keys(placeholderPost).length === 0) {
    //       return res.status(404).json({ message: `No post found for ${id}` });
    //     }
    //     res.json(placeholderPost);
    //   } else {
    //     res.json(mongoPost);
    //   }
    // } else {
    //   const placeholderRes = await fetch(JSON_URI + `/${id}`);
    //   const placeholderPost = await placeholderRes.json();

    //   if (Object.keys(placeholderPost).length === 0) {
    //     return res.status(404).json({ message: `No post found for ${id}` });
    //   }
    //   res.json(placeholderPost);
    // }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createNewPost(req, res) {
  try {
    const { userId, title, body } = req.body;

    const post = await Post.create({
      userId,
      title,
      body,
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
