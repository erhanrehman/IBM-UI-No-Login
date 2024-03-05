import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(id, username)) {
      // Redirect based on user type or show success message
    } else {
      // Show error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID#"
      />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button type="submit">Login</button>
    </form>
  );
};
