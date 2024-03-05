'use client';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Admin manages this
  const [currentUser, setCurrentUser] = useState(null); // For the current logged-in user

  // Login function to verify ID and username
  const login = (id, username) => {
    const user = users.find((u) => u.id === id && u.username === username);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ users, setUsers, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
