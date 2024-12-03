// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/blogApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Route to fetch all posts

mongoose.connect('mongodb://localhost:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('comments');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post); // Send the post data back
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get Recent Posts with Comment Count (Aggregation)

app.get('/api/recent-posts', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'comments', // Collection name in MongoDB
          localField: '_id',
          foreignField: 'post',
          as: 'comments'
        }
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $project: {
          title: 1,
          content: 1,
          author: 1,
          createdAt: 1,
          commentCount: 1
        }
      }
    ]);
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching recent posts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route to create a new post
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  try {
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a post
app.put('/api/posts/:id', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add comment to a post
app.post('/api/posts/comments', async (req, res) => {
  const { content, post, author } = req.body;
  const newComment = new Comment({ content, author, post });
  try {
    await newComment.save();
    const postToUpdate = await Post.findById(post);
    postToUpdate.comments.push(newComment._id);
    await postToUpdate.save();
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
