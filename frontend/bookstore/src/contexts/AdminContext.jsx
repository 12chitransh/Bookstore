/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { apiClient } from '../utils/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('admin_token') || null);
  const [adminUser, setAdminUser] = useState(null);

  const adminLogin = (token) => {
    setAdminToken(token);
    localStorage.setItem('admin_token', token);
    setIsAdminLoggedIn(true);
  };

  const adminLogout = () => {
    setAdminToken(null);
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('admin_token');
  };

  const verifyAdminToken = async (token) => {
    try {
      const data = await apiClient.verifyAdmin();
      setAdminUser(data.admin);
      setIsAdminLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Admin token verification failed:', error);
      adminLogout();
      return false;
    }
  };

  const value = {
    isAdminLoggedIn,
    adminToken,
    adminUser,
    adminLogin,
    adminLogout,
    verifyAdminToken
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};