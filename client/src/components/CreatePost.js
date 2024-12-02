// client/src/components/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [newPostData, setNewPostData] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', newPostData);
      navigate('/'); // Redirect to the homepage after creating the post
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title"
          value={newPostData.title}
          onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newPostData.content}
          onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newPostData.author}
          onChange={(e) => setNewPostData({ ...newPostData, author: e.target.value })}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
