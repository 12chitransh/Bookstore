import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { apiClient } from '../utils/api';

function AdminUsers() {
  const { adminToken } = useAdmin();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await apiClient.getAdminUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <span className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">
          Total Users: {users.length}
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Purchased Books</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-purple-900 text-purple-200'
                          : 'bg-blue-900 text-blue-200'
                      }`}>
                        {user.role?.toUpperCase() || 'USER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs font-semibold">
                        {user.purchasedBooksCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Regular Users</h3>
          <p className="text-4xl font-bold text-white">
            {users.filter(u => u.role === 'user').length}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Admin Users</h3>
          <p className="text-4xl font-bold text-purple-400">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Active Buyers</h3>
          <p className="text-4xl font-bold text-green-400">
            {users.filter(u => u.purchasedBooksCount > 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;