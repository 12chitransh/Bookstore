const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (books) => {
  const router = express.Router();

  // Helper function to get user from token
  const getUserFromToken = (req) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) return null;

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
      return decoded.userId;
    } catch (error) {
      return null;
    }
  };

  // Get all books
  router.get('/', (req, res) => {
    try {
      const { category, search, limit = 50, page = 1 } = req.query;

      let filteredBooks = [...books];

      // Filter by category
      if (category) {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }

      // Search functionality
      if (search) {
        const searchLower = search.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
        );
      }

      const skip = (page - 1) * limit;
      const paginatedBooks = filteredBooks.slice(skip, skip + parseInt(limit));

      res.json({
        books: paginatedBooks,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredBooks.length / limit),
          totalBooks: filteredBooks.length,
          hasNext: skip + parseInt(limit) < filteredBooks.length,
          hasPrev: page > 1
        }
      });
    } catch (error) {
      console.error('Get books error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get single book
  router.get('/:id', (req, res) => {
    try {
      const book = books.find(b => b._id === req.params.id);

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.json({ book });
    } catch (error) {
      console.error('Get book error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Add review to book
  router.post('/:id/review', [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('text').trim().isLength({ min: 10 }).withMessage('Review must be at least 10 characters')
  ], (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = getUserFromToken(req);
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const { rating, text } = req.body;
      const bookIndex = books.findIndex(b => b._id === req.params.id);

      if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const book = books[bookIndex];

      // Check if user already reviewed this book
      const existingReview = book.reviews.find(review => review.user === userId);
      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this book' });
      }

      // Add review
      const review = {
        user: userId,
        rating,
        text,
        createdAt: new Date()
      };

      book.reviews.push(review);

      // Calculate new average rating
      const sum = book.reviews.reduce((acc, review) => acc + review.rating, 0);
      book.averageRating = sum / book.reviews.length;
      book.totalReviews = book.reviews.length;

      res.json({
        message: 'Review added successfully',
        book
      });
    } catch (error) {
      console.error('Add review error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};