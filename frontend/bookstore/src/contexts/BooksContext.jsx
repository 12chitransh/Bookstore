/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

const BooksContext = createContext();

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      const data = await apiClient.getBooks(params);

      const normalizedBooks = data.books.map((book) => ({
        ...book,
        book: book.book || book.title || '',
        title: book.title || book.book || '',
        description: book.description || '',
        author: book.author || ''
      }));

      setBooks(normalizedBooks);
      setError(null);
    } catch (err) {
      console.warn('Error fetching books from backend, using local fallback:', err.message);
      try {
        const localData = await import('../list.json');
        const fallback = localData.default.map((book) => ({
          ...book,
          title: book.book,
          book: book.book
        }));
        setBooks(fallback);
        setError(null);
      } catch (fallbackErr) {
        setError(err.message);
        console.error('Error loading local fallback books:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const getBookById = async (id) => {
    try {
      const data = await apiClient.getBook(id);
      return data.book;
    } catch (err) {
      console.error('Error fetching book:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    getBookById
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};