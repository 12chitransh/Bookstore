/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('bookstore_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMyBooksOpen, setIsMyBooksOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('bookstore_theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update UI theme on darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('bookstore_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const login = (email) => {
    // Mock authentication - in real app, this would call an API
    const mockUser = { id: 1, email, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('bookstore_user', JSON.stringify(mockUser));
    setIsLoginOpen(false);
    return true;
  };

  const signup = (name, email) => {
    // Mock registration - in real app, this would call an API
    const mockUser = { id: Date.now(), email, name };
    setUser(mockUser);
    localStorage.setItem('bookstore_user', JSON.stringify(mockUser));
    setIsSignupOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookstore_user');
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('bookstore_theme', newTheme ? 'dark' : 'light');

    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    user,
    isLoginOpen,
    setIsLoginOpen,
    isSignupOpen,
    setIsSignupOpen,
    isMyBooksOpen,
    setIsMyBooksOpen,
    isDarkMode,
    login,
    signup,
    logout,
    toggleTheme
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
