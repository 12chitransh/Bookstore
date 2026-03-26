const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (orders, users) => {
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

  // Create order
  router.post('/', [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.book').exists().withMessage('Book ID is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be positive'),
    body('paymentMethod').isIn(['card', 'paypal', 'bank_transfer']).withMessage('Invalid payment method')
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

      const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

      // Create order
      const order = {
        id: Date.now().toString(),
        user: userId,
        items,
        totalAmount,
        status: 'pending',
        shippingAddress,
        paymentMethod,
        paymentStatus: 'pending',
        orderNumber: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        createdAt: new Date()
      };

      orders.push(order);

      // Add purchased books to user profile
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        items.forEach(item => {
          const existingBook = users[userIndex].purchasedBooks.find(book => book.book === item.book);
          if (existingBook) {
            existingBook.quantity += item.quantity;
          } else {
            users[userIndex].purchasedBooks.push({
              book: item.book,
              purchasedAt: new Date(),
              quantity: item.quantity
            });
          }
        });
      }

      res.status(201).json({
        message: 'Order created successfully',
        order
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get user's orders
  router.get('/', (req, res) => {
    try {
      const userId = getUserFromToken(req);
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const userOrders = orders.filter(order => order.user === userId);

      res.json({ orders: userOrders });
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get single order
  router.get('/:id', (req, res) => {
    try {
      const userId = getUserFromToken(req);
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const order = orders.find(o => o.id === req.params.id && o.user === userId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ order });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};