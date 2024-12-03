
 const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

commentSchema.index({ post: 1 });  // Index the post field for faster lookup

module.exports = mongoose.model('Comment', commentSchema);
