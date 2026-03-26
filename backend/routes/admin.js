const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (books, users) => {
  const router = express.Router();

  // Helper function to get user from token and check admin
  const getAdminFromToken = (req) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return null;

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      const user = users.find(u => u.id === decoded.userId);

      if (!user || user.role !== 'admin') return null;
      return user;
    } catch (error) {
      return null;
    }
  };

  // Get all books with stats (admin only)
  router.get('/books', (req, res) => {
    try {
      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const stats = {
        totalBooks: books.length,
        freeBooks: books.filter(b => b.category === 'free').length,
        paidBooks: books.filter(b => b.category === 'paid').length,
        averageRating: books.length > 0
          ? (books.reduce((sum, b) => sum + (b.averageRating || 0), 0) / books.length).toFixed(2)
          : 0
      };

      res.json({
        books,
        stats
      });
    } catch (error) {
      console.error('Get admin books error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Create new book (admin only)
  router.post('/books', [
    body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('author').trim().isLength({ min: 1 }).withMessage('Author is required'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['free', 'paid']).withMessage('Category must be free or paid'),
    body('image').trim().isLength({ min: 1 }).withMessage('Image URL is required')
  ], (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const newBook = {
        _id: Date.now().toString(),
        ...req.body,
        reviews: [],
        averageRating: 0,
        totalReviews: 0,
        createdAt: new Date()
      };

      books.push(newBook);

      res.status(201).json({
        message: 'Book created successfully',
        book: newBook
      });
    } catch (error) {
      console.error('Create book error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update book (admin only)
  router.put('/books/:id', [
    body('title').optional().trim().isLength({ min: 1 }).withMessage('Title is required'),
    body('author').optional().trim().isLength({ min: 1 }).withMessage('Author is required'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().isIn(['free', 'paid']).withMessage('Category must be free or paid')
  ], (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const bookIndex = books.findIndex(b => b._id === req.params.id);
      if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
      }

      books[bookIndex] = {
        ...books[bookIndex],
        ...req.body,
        _id: books[bookIndex]._id,
        reviews: books[bookIndex].reviews,
        updatedAt: new Date()
      };

      res.json({
        message: 'Book updated successfully',
        book: books[bookIndex]
      });
    } catch (error) {
      console.error('Update book error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Delete book (admin only)
  router.delete('/books/:id', (req, res) => {
    try {
      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const bookIndex = books.findIndex(b => b._id === req.params.id);
      if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const deletedBook = books.splice(bookIndex, 1);

      res.json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
      });
    } catch (error) {
      console.error('Delete book error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get users (admin only)
  router.get('/users', (req, res) => {
    try {
      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        purchasedBooksCount: (u.purchasedBooks || []).length
      }));

      res.json({ users: safeUsers });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get dashboard stats (admin only)
  router.get('/stats', (req, res) => {
    try {
      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const stats = {
        totalBooks: books.length,
        totalUsers: users.length,
        totalReviews: books.reduce((sum, b) => sum + (b.reviews?.length || 0), 0),
        averageBookRating: books.length > 0
          ? (books.reduce((sum, b) => sum + (b.averageRating || 0), 0) / books.length).toFixed(2)
          : 0,
        freeBooks: books.filter(b => b.category === 'free').length,
        paidBooks: books.filter(b => b.category === 'paid').length,
        recentBooks: books.slice(-5).reverse()
      };

      res.json({ stats });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Verify admin token
  router.post('/verify', (req, res) => {
    try {
      const admin = getAdminFromToken(req);
      if (!admin) {
        return res.status(403).json({ message: 'Invalid admin token' });
      }

      res.json({
        valid: true,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      console.error('Verify admin error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};