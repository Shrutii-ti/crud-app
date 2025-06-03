import React, { useEffect, useState } from 'react';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../Services/TodoServices';
import './DashBoard.css';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
    tags: '',
    recurrence: 'weekly',
  });
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({ ...formData });

  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [showFiltered, setShowFiltered] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (queryParams = '') => {
    const res = await getTodos(queryParams);
    setTodos(res.data.todos || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!formData.title.trim()) return;
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    await createTodo(payload);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending',
      tags: '',
      recurrence: 'weekly',
    });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    const updatedPayload = {
      ...editFormData,
      tags: editFormData.tags.split(',').map((tag) => tag.trim()),
    };
    await updateTodo(id, updatedPayload);
    setEditId(null);
    setEditFormData({ ...formData });
    fetchTodos();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    let query = '';
    if (filter.status) query += `status=${filter.status}`;
    if (filter.priority) query += `${query ? '&' : ''}priority=${filter.priority}`;
    fetchTodos(`?${query}`);
    setShowFiltered(true);
  };

  const clearFilter = () => {
    setFilter({ status: '', priority: '' });
    fetchTodos();
    setShowFiltered(false);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📋 My Todo Dashboard</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <select name="status" value={filter.status} onChange={handleFilterChange}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={filter.priority} onChange={handleFilterChange}>
          <option value="">Filter by Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button className="apply-btn" onClick={applyFilter}>Apply</button>
        {showFiltered && <button className="clear-btn" onClick={clearFilter}>Clear</button>}
      </div>

      {!showFiltered && (
        <div className="form-section">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title *" />
          <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
          <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
          <select name="recurrence" value={formData.recurrence} onChange={handleChange}>
            <option value="weekly">Weekly</option><option value="monthly">Monthly</option>
          </select>
          <button onClick={handleAdd}>Add Todo</button>
        </div>
      )}

      {/* Todo Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Description</th><th>Due</th><th>Priority</th><th>Status</th><th>Tags</th><th>Repeat</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No Todos Found</td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo._id}>
                  {editId === todo._id ? (
                    <>
                      <td><input name="title" value={editFormData.title} onChange={handleEditChange} /></td>
                      <td><input name="description" value={editFormData.description} onChange={handleEditChange} /></td>
                      <td><input name="dueDate" type="date" value={editFormData.dueDate} onChange={handleEditChange} /></td>
                      <td>
                        <select name="priority" value={editFormData.priority} onChange={handleEditChange}>
                          <option>Low</option><option>Medium</option><option>High</option>
                        </select>
                      </td>
                      <td>
                        <select name="status" value={editFormData.status} onChange={handleEditChange}>
                          <option>Pending</option><option>In Progress</option><option>Completed</option>
                        </select>
                      </td>
                      <td><input name="tags" value={editFormData.tags} onChange={handleEditChange} /></td>
                      <td>
                        <select name="recurrence" value={editFormData.recurrence} onChange={handleEditChange}>
                          <option value="weekly">Weekly</option><option value="monthly">Monthly</option>
                        </select>
                      </td>
                      <td>
                        <button className="save" onClick={() => handleUpdate(todo._id)}>Save</button>
                        <button className="cancel" onClick={() => setEditId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.dueDate?.split('T')[0]}</td>
                      <td>{todo.priority}</td>
                      <td>{todo.status}</td>
                      <td>{todo.tags?.join(', ')}</td>
                      <td>{todo.recurrence}</td>
                      <td>
                        <button onClick={() => {
                          setEditId(todo._id);
                          setEditFormData({
                            title: todo.title,
                            description: todo.description,
                            dueDate: todo.dueDate?.split('T')[0],
                            priority: todo.priority,
                            status: todo.status,
                            tags: todo.tags?.join(', '),
                            recurrence: todo.recurrence,
                          });
                        }}>Edit</button>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
