const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (orders, users) => {
  const router = express.Router();
  let payments = [];

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

  // Create payment intent
  router.post('/create-payment-intent', [
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('orderId').exists().withMessage('Order ID is required'),
    body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code')
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

      const { amount, orderId, currency = 'usd' } = req.body;

      // Mock payment intent (in production, use Stripe SDK)
      const paymentIntent = {
        id: 'pi_' + Date.now(),
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        status: 'requires_payment_method',
        client_secret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 9),
        orderId,
        userId,
        createdAt: new Date()
      };

      payments.push(paymentIntent);

      res.json({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        publishableKey: process.env.STRIPE_PUBLIC_KEY || 'pk_test_mock'
      });
    } catch (error) {
      console.error('Payment intent error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Confirm payment
  router.post('/confirm-payment', [
    body('paymentIntentId').exists().withMessage('Payment Intent ID is required'),
    body('orderId').exists().withMessage('Order ID is required')
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

      const { paymentIntentId, orderId } = req.body;

      // Mock payment confirmation
      const payment = payments.find(p => p.id === paymentIntentId);
      if (!payment) {
        return res.status(404).json({ message: 'Payment intent not found' });
      }

      payment.status = 'succeeded';
      payment.confirmedAt = new Date();

      // Update order payment status
      const orderIndex = orders.findIndex(o => o.id === orderId && o.user === userId);
      if (orderIndex !== -1) {
        orders[orderIndex].paymentStatus = 'paid';
        orders[orderIndex].status = 'processing';
      }

      res.json({
        message: 'Payment confirmed successfully',
        payment: {
          id: payment.id,
          status: payment.status,
          amount: payment.amount / 100 // Convert back to dollars
        }
      });
    } catch (error) {
      console.error('Confirm payment error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get payment history
  router.get('/history', (req, res) => {
    try {
      const userId = getUserFromToken(req);
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const userPayments = payments.filter(p => p.userId === userId);
      res.json({ payments: userPayments });
    } catch (error) {
      console.error('Get payments error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};