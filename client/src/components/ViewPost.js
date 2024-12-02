// client/src/components/ViewPost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <div>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By: {post.author}</p>
          <h3>Comments:</h3>
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p>{comment.content}</p>
              <p>By: {comment.author}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewPost;
