import React, { useState, useEffect } from 'react';
import { updateTodo, getAllTodos } from './utils';


const Todos = ({ userId }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos(userId);
  }, [userId]);

  const fetchTodos = async (userId) => {
    try {
      const todosData = await getAllTodos(userId);
      const filteredTodos = todosData.filter((todo) => todo.userId === userId);
      const limitedTodos = filteredTodos.slice(0, 3); // Limit to 3 todos

      setTodos(limitedTodos);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  const handleMarkCompleted = async (todoId) => {
    // Update the completed field locally
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: true } : todo
      )
    );

    try {
      // Update the completed field on the server
      const response = await updateTodo(todoId, { completed: true });
      console.log('Todo updated:', response.data);
    } catch (error) {
      // Handle errors if any
      console.error('Error updating todo:', error);
    }
  };
 



  return (
    <div>
      
      {todos.map((todo) => (
        <div
          key={todo.id}
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
              Title: <span style={{ fontWeight: 'normal' }}>{todo.title}</span>
            </h3>
            <p style={{ fontSize: '14px', margin: '0', fontWeight: 'bold' }}>
              Completed:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {todo.completed ? 'true' : 'false'}
              </span>
            </p>
          </div>
          {!todo.completed && (
            <button
              onClick={() => handleMarkCompleted(todo.id)}
              style={{
                backgroundColor: 'yellow',
                width: '120px',
                height: '30px',
                border: 'none',
                borderRadius: '3px',
                color: 'black',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Mark Completed
            </button>
          )}
        </div>
      ))}

    </div>
  );
};

export default Todos;
