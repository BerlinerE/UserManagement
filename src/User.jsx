import React, { useState } from 'react';
import Todos from './todos';
import Posts from './posts';
import { addTodo, addPost } from './utils';
import AddTodo from './addTodo';
import AddPost from './addPost';

const User = ({ user, deleteUser, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showOtherData, setShowOtherData] = useState(false);
  const [street, setStreet] = useState(user.address?.street || '');
  const [city, setCity] = useState(user.address?.city || '');
  const [zipcode, setZipcode] = useState(user.address?.zipcode || '');
  const [isIDClicked, setIsIDClicked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleAddTodo = (newTodo) => {
    try {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleAddPost = async (postText) => {
    try {
      const response = await addPost(postText);
      const addedPost = response.data;
      setPosts((prevPosts) => [...prevPosts, addedPost]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
    setIsAddingPost(false);
  };

  const handleMouseEnter = () => {
    if (!showOtherData) {
      setShowOtherData(true);
    }
  };

  const handleMouseLeave = () => {
    if (showOtherData) {
      setShowOtherData(false);
    }
  };

  const handleToggleOtherData = () => {
    setShowOtherData(!showOtherData);
  };

  const handleToggleUserID = () => {
    setIsIDClicked(!isIDClicked);
  };

  const handleUpdateUser = () => {
    updateUser(user.id, name, email, street, city, zipcode);
  };

  const handleDeleteUser = () => {
    deleteUser(user.id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: 'fit-content' }}>
        <div
          style={{
            backgroundColor: isIDClicked ? '#FFE299' : 'white',
            border: user.completed ? '1px solid green' : '1px solid red',
            marginBottom: '10px',
            padding: '10px',
            color: '#333333',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div>
            <h2 style={{ margin: '0', cursor: 'pointer', fontSize: '14px' }} onClick={handleToggleUserID}>
              User ID: {user.id}
            </h2>
            <h3 style={{ fontSize: '12px', margin: '0', fontWeight: 'bold' }}>
              User name:{' '}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
              />
            </h3>
            <h3 style={{ fontSize: '12px', margin: '0', fontWeight: 'bold' }}>
            User email:{' '}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
              />
            </h3>
            <button
              onClick={handleToggleOtherData}
              style={{ backgroundColor: '#CCCCCC', color: '#333333', fontSize: '12px' }}
            >
              Other data
            </button>
            {showOtherData && (
              <div
                style={{
                  backgroundColor: '#F1F1F1',
                  padding: '10px',
                  borderRadius: '5px',
                  marginTop: '10px',
                }}
              >
                <h3 style={{ fontSize: '14px', color: '#333333' }}>Other Data</h3>
                <h3 style={{ fontSize: '12px', margin: '0', fontWeight: 'bold' }}>
                  Street:{' '}
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
                  />
                </h3>
                <h3 style={{ fontSize: '12px', margin: '0', fontWeight: 'bold' }}>
                  City:{' '}
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
                  />
                </h3>
                <h3 style={{ fontSize: '12px', margin: '0', fontWeight: 'bold' }}>
                  Zipcode:{' '}
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
                  />
                </h3>
              </div>
            )}
            <button
              onClick={handleUpdateUser}
              style={{ backgroundColor: '#33CC33', color: '#FFFFFF', fontSize: '12px' }}
            >
              Update User
            </button>
            <button
              onClick={handleDeleteUser}
              style={{ backgroundColor: '#FF0000', color: '#FFFFFF', fontSize: '12px' }}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>

      {isIDClicked && (
        <div>
          <div
            style={{
              width: '50%',
              marginLeft: '20px',
              border: '1px solid black',
              padding: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ color: 'black', fontSize: '12px' }}>Todos - User {user.id}</div>
              <div></div>
              <button
                style={{
                  marginTop: '10px',
                  backgroundColor: 'yellow',
                  color: 'black',
                  fontSize: '12px',
                  marginRight: '10px',
                }}
                onClick={() => setIsAddingTodo(true)}
              >
                Add Todo
              </button>
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '5px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
                            <h3 style={{ color: '#FFFFFF', marginBottom: '12px' }}></h3>
              <div style={{ width: '100%', marginLeft: '20px' }}>
                {isAddingTodo ? (
                  <AddTodo addTodo={handleAddTodo} onCancel={() => setIsAddingTodo(false)} userId={user.id} />
                ) : (
                  <>
                    <h3 style={{ color: '#FFFFFF', marginBottom: '12px' }}></h3>
                    <Todos userId={user.id} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              width: '50%',
              marginLeft: '20px',
              border: '1px solid black',
              padding: '10px',
              marginTop: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ color: 'black', fontSize: '12px' }}>Posts - User {user.id}</div>
              <div></div>
              <button
                style={{
                  marginTop: '10px',
                  backgroundColor: 'yellow',
                  color: 'black',
                  fontSize: '12px',
                  marginRight: '10px',
                }}
                onClick={() => setIsAddingPost(true)}
              >
                Add Post
              </button>
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '5px',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ color: '#FFFFFF', marginBottom: '12px' }}></h3>
              <div style={{ width: '100%', marginLeft: '20px' }}>
                {isAddingPost ? (
                  <AddPost addPost={handleAddPost} onCancel={() => setIsAddingPost(false)} userId={user.id} />
                ) : (
                  <Posts userId={user.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;


