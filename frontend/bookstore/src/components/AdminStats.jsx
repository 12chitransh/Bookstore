import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { apiClient } from '../utils/api';

function AdminStats() {
  const { adminToken } = useAdmin();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiClient.getAdminStats();
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading stats...</div>;
  if (!stats) return <div className="text-center py-8">Failed to load stats</div>;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-200 text-sm font-semibold mb-2">Total Books</h3>
          <p className="text-4xl font-bold text-white">{stats.totalBooks}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-200 text-sm font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-200 text-sm font-semibold mb-2">Total Reviews</h3>
          <p className="text-4xl font-bold text-white">{stats.totalReviews}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-200 text-sm font-semibold mb-2">Avg Rating</h3>
          <p className="text-4xl font-bold text-white">⭐ {stats.averageBookRating}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Book Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Free Books</span>
              <span className="text-green-400 font-bold">{stats.freeBooks}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${(stats.freeBooks / stats.totalBooks * 100) || 0}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-400">Paid Books</span>
              <span className="text-blue-400 font-bold">{stats.paidBooks}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${(stats.paidBooks / stats.totalBooks * 100) || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recent Books */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Recent Books Added</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats.recentBooks.length > 0 ? (
              stats.recentBooks.map((book) => (
                <div key={book._id} className="bg-gray-700 p-3 rounded flex items-start gap-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{book.title}</p>
                    <p className="text-sm text-gray-400">{book.author}</p>
                    <span className={`inline-block text-xs mt-1 px-2 py-1 rounded ${
                      book.category === 'free'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-blue-900 text-blue-200'
                    }`}>
                      {book.category === 'free' ? 'FREE' : `$${book.price}`}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No books yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStats;