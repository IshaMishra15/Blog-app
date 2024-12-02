// server/routes/postRoutes.js
const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const router = express.Router();

// Create a new Post
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Recent Posts with Comment Count (Aggregation)
router.get('/recent-posts', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $lookup: { // Lookup comments for each post
        from: 'comments',
        localField: '_id',
        foreignField: 'post',
        as: 'comments',
      }},
      { $project: { // Project the post and count of comments
        title: 1,
        content: 1,
        commentCount: { $size: '$comments' },
        createdAt: 1,
      }},
      { $sort: { createdAt: -1 } } // Sort by createdAt, newest first
    ]);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Post
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
