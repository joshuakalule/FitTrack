import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a Context for the authentication
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (example: check localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const response = await axios.get('http://54.236.43.35:5000/api/v1/protected', config);
      return response.data.logged_in_as;
    } catch (error) {
      console.error('Error getting user profile:', error);
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
