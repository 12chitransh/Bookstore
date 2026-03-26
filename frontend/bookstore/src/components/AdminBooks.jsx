import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { apiClient } from '../utils/api';

function AdminBooks() {
  const { adminToken } = useAdmin();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: 0,
    category: 'paid',
    image: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await apiClient.getAdminBooks();
      setBooks(data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleAddBook = async () => {
    try {
      const data = await apiClient.createAdminBook(formData);
      setBooks([...books, data.book]);
      setShowForm(false);
      setFormData({
        title: '',
        author: '',
        description: '',
        price: 0,
        category: 'paid',
        image: ''
      });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await apiClient.deleteAdminBook(id);
      setBooks(books.filter(b => b._id !== id));
      alert('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book');
    }
  };

  if (loading) return <div className="text-center py-8">Loading books...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Book Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingBook(null);
          }}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
        >
          {showForm ? '✕ Cancel' : '+ Add New Book'}
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleInputChange}
              className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
            >
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Book Description (min 10 characters)"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-green-500 outline-none"
          />

          <button
            onClick={handleAddBook}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition"
          >
            Add Book
          </button>
        </div>
      )}

      {/* Books Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {books.length > 0 ? (
                books.map(book => (
                  <tr key={book._id} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4 text-sm">{book.title || book.book}</td>
                    <td className="px-6 py-4 text-sm">{book.author}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        book.category === 'free'
                          ? 'bg-green-900 text-green-200'
                          : 'bg-blue-900 text-blue-200'
                      }`}>
                        {book.category === 'free' ? 'FREE' : `$${book.price}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">${book.price}</td>
                    <td className="px-6 py-4 text-sm">
                      ⭐ {(book.averageRating || 0).toFixed(1)} ({book.totalReviews || 0})
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;