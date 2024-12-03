

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);


 

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const res = await axios.get('http://localhost:5000/api/recent-posts');
        console.log('Fetched posts:', res.data);  // Log the fetched posts
        setRecentPosts(res.data); // Save the fetched posts
      } catch (error) {
        console.error('Error fetching posts:', error); // Log detailed error
      }
    }
    fetchRecentPosts();
  }, []);
  
  return (
    <div>
      <h2>Recent Posts with Comment Count</h2>
      {recentPosts.length > 0 ? (
        recentPosts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Comments: {post.commentCount}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default RecentPosts;
