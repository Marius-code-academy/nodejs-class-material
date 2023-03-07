import Post from '../db/postModel.js';
import dotenv from 'dotenv';

dotenv.config();
const JSON_URI = process.env.JSON_URI;

// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// },

// {
//   "_id": "640766b14598b9be7338ddce",
//   "userId": 9,
//   "title": "My first post",
//   "body": "body of my post",
//   "__v": 0
// },

export async function getAllPosts(req, res) {
  try {
    const mongoPosts = await Post.find({}, { __v: false });

    const resp = await fetch(JSON_URI);
    const placeholderPosts = await resp.json();

    const serializedMongoPosts = mongoPosts.map((post) => ({
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
