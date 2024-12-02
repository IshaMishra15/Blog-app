// client/src/components/RecentPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/recent-posts');
        setRecentPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecentPosts();
  }, []);

  return (
    <div>
      <h2>Recent Posts with Comment Count</h2>
      {recentPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Comments: {post.commentCount}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
