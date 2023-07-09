import React, { useState } from 'react';
import { addTodo } from './utils';

const AddTodo = ({ addTodo, onCancel, userId }) => {
  const currentTime = new Date().toTimeString().split(' ')[0];
  const [newTodo, setNewTodo] = useState({
    userId: userId,
    id: currentTime.replace(/:/g, ''),
    title: "",
    completed: false,
  });


  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
    });
  };

  const handleAddTodo = () => {
    addTodo(newTodo);
    console.log("ya hzin",newTodo)

    onCancel();
  };
  

  const handleCancel = () => {
    onCancel && onCancel();
    setNewTodo({
      ...newTodo,
      title: "",
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
        value={newTodo.title}
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
        onClick={handleAddTodo}
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

export default AddTodo;
