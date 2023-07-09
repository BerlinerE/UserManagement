import { getAllUsers } from './utils';
import User from './User';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUser from './addUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      const userData = response.data;
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (userId, newName, newEmail) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        name: newName,
        email: newEmail,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              name: newName,
              email: newEmail,
            };
          }
          return user;
        })
      );
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleUserAdded = (addedUser) => {
    setUsers((prevUsers) => [...prevUsers, addedUser]);
  };

  const handleCancelAddUser = () => {
    setAddingUser(false);
  };

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', marginBottom: '15px' }}>
      <div style={{ flex: 1 }}>
        <div>
          <button
            style={{
              marginTop: '10px',
              backgroundColor: 'yellow',
              color: 'black',
              fontSize: '12px',
              marginRight: '10px',
            }}
            onClick={() => setAddingUser(true)}
          >
            Add User
          </button>
          <label htmlFor="searchInput" style={{ color: '#333333', fontSize: '12px' }}>
            Search:
          </label>
          <input
            type="text"
            id="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              color: '#333333',
              fontSize: '10px',
              border: '1px solid #CCCCCC',
              borderRadius: '5px',
              padding: '5px',
              marginLeft: '8px',
            }}
            placeholder="Search by name or email"
          />
        </div>
  
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <User key={user.id} user={user} deleteUser={deleteUser} updateUser={updateUser} />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
  
      {addingUser && (
         <div style={{ flex: '1', marginLeft: '20px' }}>
          <AddUser onUserAdded={handleUserAdded} onCancel={handleCancelAddUser} />
        </div>
      )}
    </div>
  );
      };

export default Users;
