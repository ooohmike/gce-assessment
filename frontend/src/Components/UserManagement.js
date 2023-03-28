import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch all users data from API
  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Handle form submission for adding/editing users
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { name, email, employee_id: employeeId };
    const endpoint = editingUserId ? `/api/users/${editingUserId}` : '/api/users';
    const method = editingUserId ? 'PUT' : 'POST';

    axios({
      method,
      url: endpoint,
      data: userData,
    })
      .then(response => {
        const updatedUsers = users.map(user => {
          if (user.id === response.data.id) {
            return response.data;
          }
          return user;
        });
        if (editingUserId) {
          alert(`User ${response.data.id} updated successfully`);
        } else {
          alert(`User ${response.data.id} added successfully`);
        }
        setUsers(updatedUsers);
        setName('');
        setEmail('');
        setEmployeeId('');
        setEditingUserId(null);
      })
      .catch(error => {
        console.error(error);
        alert('Failed to add/update user');
      });
  };

  // Handle form submission for deleting users
  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(response => {
        alert(`User ${id} deleted successfully`);
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error(error);
        alert(`Failed to delete user ${id}`);
      });
  };

  // Handle form submission for editing users
  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setEmployeeId(userToEdit.employee_id);
    setEditingUserId(id);
  };

  return (
    <div>
        <h1>User Management</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>
                Employee ID (format: XY-1234):
                <input type="text" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} required />
            </label>
        </form>
    </div>
    )
}

export default UserManagement