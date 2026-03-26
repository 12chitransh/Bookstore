import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { apiClient } from '../utils/api';

function AdminLogin() {
  const { adminLogin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiClient.login({ email, password });
      adminLogin(data.token);
    } catch (err) {
      setError('Invalid admin credentials');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-purple-600 to-red-800 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">🔐 Admin Panel</h1>
        <p className="text-gray-400 text-center mb-6">Login with admin credentials</p>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-500 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400 mb-2"><strong>Demo Credentials:</strong></p>
          <p className="text-xs text-gray-300">Email: admin@example.com</p>
          <p className="text-xs text-gray-300">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;