// client/src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    // Fetch the post data from the backend
    const fetchPostData = async () => {
      try {
        // Fetch the post data using the post ID from the URL
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPostData(res.data); // Set the fetched post data into state
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch the post data on component mount
    fetchPostData();
  }, [id]); // Only re-fetch if the `id` changes

  // Handle form submission for editing the post
  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      // Update the post with the new data
      await axios.put(`http://localhost:5000/api/posts/${id}`, postData);
      navigate('/'); // Redirect to the home page after editing
    } catch (err) {
      console.error(err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="edit-post-container">
      {/* Display the original post before the edit form */}
      <div className="post-card">
        <h3 className="post-title">{postData.title}</h3>
        <p className="post-content">{postData.content}</p>
        <p className="post-author">By: {postData.author}</p>
      </div>

      {/* Editing Form below the post */}
      <div className="edit-form-container">
        <h3>Edit Post</h3>
        <form onSubmit={handleEditPost}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={postData.title || ''} // Ensure the value is set correctly
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              placeholder="Content"
              value={postData.content || ''} // Ensure the value is set correctly
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={postData.author || ''} // Ensure the value is set correctly
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
