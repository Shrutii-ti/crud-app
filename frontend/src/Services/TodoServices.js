import api from './api';

// Create a new TODO
export const createTodo = async (todoData) => {
  console.log('[POST] Creating new todo:', todoData);
  const res = await api.post('/todos/create', todoData);
  console.log('[POST] Response:', res.data);
  return res;
};

// Get all TODOs for the logged-in user
export const getTodos = async () => {
  console.log('[GET] Fetching all todos...');
  const res = await api.get('/todos');
  console.log('[GET] Response:', res.data);
  return res;
};

// Update a specific TODO by ID
export const updateTodo = async (id, updatedData) => {
  console.log(`[PUT] Updating todo ${id}:`, updatedData);
  const res = await api.put(`/todos/${id}`, updatedData);
  console.log('[PUT] Response:', res.data);
  return res;
};

// Delete a TODO by ID
export const deleteTodo = async (id) => {
  console.log(`[DELETE] Deleting todo with id: ${id}`);
  const res = await api.delete(`/todos/${id}`);
  console.log('[DELETE] Response:', res.data);
  return res;
};
