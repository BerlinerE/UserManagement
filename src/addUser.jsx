import React, { useState } from 'react';
import { addUser } from './utils'; 


const AddUser = ({ onUserAdded, onCancel }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleAddUser = async () => {
    try {
      const response = await addUser(newUser);
      const addedUser = response.data;
      onUserAdded(addedUser);
      onCancel();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setNewUser({
      name: '',
      email: '',
    });
  };


  return (
    <div
      style={{
        border: '2px solid black',
        padding: '16px',
        background: 'transparent',
      }}
    >
      <label htmlFor="searchInput" style={{ color: '#333333', fontSize: '12px' }}>
        Add new user:
      </label>
      <br />
      <div>
        <h3 style={{ fontSize: '12px', margin: '10px 0', fontWeight: 'bold', color: 'black' }}>
          Name:{' '}
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
          />
        </h3>
        <h3 style={{ fontSize: '12px', margin: '15px 0', fontWeight: 'bold', color: 'black' }}>
          Email:{' '}
          <input
            type="text"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ backgroundColor: 'transparent', color: '#333333', fontSize: '12px' }}
          />
        </h3>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleAddUser}
          style={{
            backgroundColor: 'yellow',
            width: '120px',
            height: '30px',
            border: 'none',
            borderRadius: '3px',
            color: 'black',
            fontSize: '12px',
            marginRight: '10px',
          }}
        >
          Add
        </button>
        <button
          onClick={handleCancel}
          style={{
            backgroundColor: 'yellow',
            width: '120px',
            height: '30px',
            border: 'none',
            borderRadius: '3px',
            color: 'black',
            fontSize: '12px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
  
  
  
};


export default AddUser;
