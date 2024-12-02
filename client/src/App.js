// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import './App.css'
function App() {
  return (
    <Router>
      <div className="App">
        <h1>Blog App</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
