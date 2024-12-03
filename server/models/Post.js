


const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });  // This will add createdAt and updatedAt automatically

module.exports = mongoose.model('Post', postSchema, 'posts');  // 'posts' explicitly specified

