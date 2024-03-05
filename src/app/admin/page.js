'use client';
import React, { useState } from 'react';
import {
  Button,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TextInput,
  ToastNotification,
  Form,
  FormGroup,
  Tile,
} from '@carbon/react';

const initialUsers = [];

function AdminPage() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ id: '', name: '', role: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some((user) => user.id === newUser.id)) {
      setError("Users can't have the same ID");
      return;
    }
    if (users.some((user) => user.name === newUser.name)) {
      setError("Users can't have the same Name");
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ id: '', name: '', role: '' }); // Reset form
    setError(''); // Clear any error messages
  };

  const removeUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Tile>
        <h1 style={{ marginBottom: '1rem' }}>Admin Dashboard</h1>
        <h2 style={{ marginBottom: '2rem' }}>User Management</h2>
        {error && (
          <ToastNotification
            kind="error"
            title="Error"
            subtitle={error}
            caption=""
            lowContrast
            style={{ marginBottom: '1rem' }}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup legendText="Add a New User">
            <TextInput
              id="id"
              name="id"
              labelText="ID"
              value={newUser.id}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
            <TextInput
              id="name"
              name="name"
              labelText="Name"
              value={newUser.name}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
            <TextInput
              id="role"
              name="role"
              labelText="Role"
              value={newUser.role}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
            <Button type="submit">Add User</Button>
          </FormGroup>
        </Form>
      </Tile>
      <TableContainer title="Current Users" style={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    kind="danger"
                    size="small"
                    onClick={() => removeUser(user.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminPage;
