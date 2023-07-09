import React, { useState } from 'react';
import { addPost } from './utils'; 

const AddPost = ({ addPost, onCancel, userId }) => {
  const currentTime = new Date().toTimeString().split(' ')[0];
  const [newPost, setNewPost] = useState({
    userId: userId,
    id: currentTime.replace(/:/g, ''),
    title: "",
    body: "",
  });

/*
  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      body: e.target.value,
      title: e.target.value,
    });
  };
  */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleAddPost = () => {
    addPost(newPost);
    console.log("ya hzin",newPost)

    onCancel();
  };
  

  const handleCancel = () => {
    onCancel && onCancel();
    setNewPost({
      ...newPost,
      body: "",
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid black',
        padding: '16px',
        background: 'transparent',
      }}
    >
      <h3 style={{ fontSize: '12px', margin: '0', color: 'black' }}>Title:</h3>
      <input
        type="text"
        name="title" 
        value={newPost.title}
        onChange={handleInputChange}
        style={{
          border: '1px solid black',
          borderBottom: '1px solid black',
          background: 'transparent',
          color: 'black',
          fontSize: '12px',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      />
        <h3 style={{ fontSize: '12px', margin: '0', color: 'black' }}>Body:</h3>
      <input
        type="text"
        name="body" 
        value={newPost.body}
        onChange={handleInputChange}
        style={{
          border: '1px solid black',
          borderBottom: '1px solid black',
          background: 'transparent',
          color: 'black',
          fontSize: '12px',
          marginBottom: '15px',
          textAlign: 'center',
        }}
      />
      <button
        onClick={handleAddPost}
        style={{
          backgroundColor: 'yellow',
          width: '120px',
          height: '30px',
          border: 'none',
          borderRadius: '3px',
          color: 'black',
          fontSize: '12px',
          marginBottom: '10px',
        }}
      >
        Add
      </button>
      <button
        onClick={handleCancel}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid black',
          width: '120px',
          height: '30px',
          borderRadius: '3px',
          color: 'black',
          fontSize: '12px',
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default AddPost;
