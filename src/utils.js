import axios from "axios";

const API_URLS = {
  getAllUsers: "https://jsonplaceholder.typicode.com/users",
  getAllTodos: "https://jsonplaceholder.typicode.com/todos",
  getAllPosts: "https://jsonplaceholder.typicode.com/posts",
};

export const getAllUsers = () => {
  try {
    return axios.get(API_URLS.getAllUsers);
  } catch (error) {
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_URLS.getAllTodos);
    const todosData = response.data; // limit to 3
    return todosData;
  } catch (error) {
    throw error;
  }
};
/*
export const getAllTodos = async () => {
  try {
    const response = await axios.get(API_URLS.getAllTodos);
    const todosData = response.data.slice(0, 3); // limit to 3
    return todosData;
  } catch (error) {
    throw error;
  }
};
*/
export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URLS.getAllPosts);
    const postsData = response.data// limit to 3
    return postsData;
  } catch (error) {
    throw error;
  }
};
export const updateTodo = (todoId, updatedTodo) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;
    return axios.put(url, updatedTodo);
  } catch (error) {
    throw error;
  }
};

export const updatePost = (postId, updatedPost) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    return axios.put(url, updatedPost);
  } catch (error) {
    throw error;
  }
};



export const addTodo = async (userId, newTodo) => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    console.log("bbb",newTodo)
    const response = await axios.post(url, {
      ...newTodo,
      userId: userId
    });
    alert('Todo successfully added!');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addPost = (userId,post) => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return axios.post(url, post);
  } catch (error) {
    throw error;
  }
};



export const addUser = (user) => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return axios.post(url, user);
  } catch (error) {
    throw error;
  }
};