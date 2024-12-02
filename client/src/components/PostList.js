// // client/src/components/PostList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const PostList = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPostData, setNewPostData] = useState({
//     title: '',
//     content: '',
//     author: '',
//   });

//   // Store individual comment state for each post
//   const [newComments, setNewComments] = useState({});

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/posts');
//         setPosts(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     const newPost = { ...newPostData };
//     try {
//       await axios.post('http://localhost:5000/api/posts', newPost);
//       setNewPostData({ title: '', content: '', author: '' });
//       // Fetch posts again to update the UI
//       const res = await axios.get('http://localhost:5000/api/posts');
//       setPosts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDeletePost = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${id}`);
//       setPosts(posts.filter(post => post._id !== id)); // Update UI after delete
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddComment = async (e, postId) => {
//     e.preventDefault();
//     const commentContent = newComments[postId];
//     if (!commentContent) return;

//     try {
//       await axios.post('http://localhost:5000/api/posts/comments', {
//         content: commentContent,
//         post: postId,
//         author: 'Anonymous',
//       });

//       // Reset the comment input field for the specific post
//       setNewComments({ ...newComments, [postId]: '' });

//       // Fetch posts again to update the comments
//       const res = await axios.get('http://localhost:5000/api/posts');
//       setPosts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCommentChange = (e, postId) => {
//     const { value } = e.target;
//     setNewComments({ ...newComments, [postId]: value });
//   };

//   return (
//     <div>
//       <h2>All Posts</h2>
//       <h3>Create New Post</h3>
//       <form onSubmit={handleCreatePost}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newPostData.title}
//           onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Content"
//           value={newPostData.content}
//           onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={newPostData.author}
//           onChange={(e) => setNewPostData({ ...newPostData, author: e.target.value })}
//           required
//         />
//         <button type="submit">Create Post</button>
//       </form>

//       {posts.length === 0 ? (
//         <p>No posts available.</p>
//       ) : (
//         posts.map((post) => (
//           <div key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p>Author: {post.author}</p>
//             <button>
//               <Link to={`/edit/${post._id}`}>Edit Post</Link>
//             </button>
//             <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>

//             <h4>Comments:</h4>
//             {post.comments && post.comments.length > 0 ? (
//               <ul>
//                 {post.comments.map((comment) => (
//                   <li key={comment._id}>
//                     {comment.content} - {comment.author}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No comments yet.</p>
//             )}

//             <form onSubmit={(e) => handleAddComment(e, post._id)}>
//               <textarea
//                 value={newComments[post._id] || ''}
//                 onChange={(e) => handleCommentChange(e, post._id)}
//                 placeholder="Add a comment..."
//               />
//               <button type="submit">Add Comment</button>
//             </form>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;
// client/src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = { ...newPostData };
    try {
      await axios.post('http://localhost:5000/api/posts', newPost);
      setNewPostData({ title: '', content: '', author: '' });
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    const commentContent = newComments[postId];
    if (!commentContent) return;

    try {
      await axios.post('http://localhost:5000/api/posts/comments', {
        content: commentContent,
        post: postId,
        author: 'Anonymous',
      });

      setNewComments({ ...newComments, [postId]: '' });

      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (e, postId) => {
    const { value } = e.target;
    setNewComments({ ...newComments, [postId]: value });
  };

  return (
    <div>
      <h2>All Posts</h2>
      <h3>Create New Post</h3>
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

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <p className="post-author">By: {post.author}</p>
            <button>
              <Link to={`/edit/${post._id}`}>Edit Post</Link>
            </button>
            <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>

            <div className="comment-section">
              <h4>Comments:</h4>
              {post.comments && post.comments.length > 0 ? (
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment._id}>{comment.content} - {comment.author}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}

              <form className="comment-form" onSubmit={(e) => handleAddComment(e, post._id)}>
                <textarea
                  value={newComments[post._id] || ''}
                  onChange={(e) => handleCommentChange(e, post._id)}
                  placeholder="Add a comment..."
                />
                <button type="submit">Add Comment</button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
