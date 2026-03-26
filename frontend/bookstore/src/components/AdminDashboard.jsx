import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import AdminBooks from './AdminBooks';
import AdminUsers from './AdminUsers';
import AdminStats from './AdminStats';

function AdminDashboard() {
  const { adminToken, adminLogout } = useAdmin();
  const [activeTab, setActiveTab] = useState('stats');

  if (!adminToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Access Required</h1>
          <p className="text-gray-600 text-center">You need admin credentials to access this panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
          <button
            onClick={adminLogout}
            className="bg-red-800 hover:bg-red-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 flex">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === 'stats'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            📈 Dashboard Stats
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === 'books'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            📚 Manage Books
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === 'users'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            👥 Users
          </button>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'books' && <AdminBooks />}
        {activeTab === 'users' && <AdminUsers />}
      </div>
    </div>
  );
}

export default AdminDashboard;