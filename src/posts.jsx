import React, { useState, useEffect } from 'react';
import { updatePost , getAllPosts} from './utils';

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  const fetchPosts = async (userId) => {
    try {
      const postsData = await getAllPosts(); // Call the getAllTodos function from utilities
      const filteredPosts = postsData.filter((post) => post.userId === userId);
      const limitedPosts = filteredPosts.slice(0, 3); // Limit to 3 todos
      setPosts(limitedPosts);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };


  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '2px solid purple',
            padding: '10px',
            marginBottom: '10px',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 style={{ fontSize: '14px', margin: '0', fontWeight: 'bold' }}>
              Title: <span style={{ fontWeight: 'normal' }}>{post.title}</span>
            </h3>
            <p style={{ fontSize: '14px', margin: '0', fontWeight: 'bold' }}>
              Body: <span style={{ fontWeight: 'normal' }}>{post.body}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Posts;
