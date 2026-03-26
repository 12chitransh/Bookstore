import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../utils/api';

function Checkout() {
  const { cartItems, getTotalPrice, clearCart, setIsCartOpen, addToPurchased } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: user?.email || '',
    paymentMethod: 'card'
  });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create order
      const orderData = await apiClient.createOrder({
        items: cartItems.map(item => ({
          book: item.id,
          quantity: item.quantity,
          title: item.book || item.title,
          author: item.author,
          price: item.category === 'free' ? 0 : item.price,
          image: item.image
        })),
        totalAmount: getTotalPrice(),
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      });

      const orderId = orderData.order.id;

      // Create payment intent
      const paymentData = await apiClient.createPaymentIntent({
        amount: getTotalPrice(),
        orderId: orderId,
        currency: 'usd'
      });

      // Confirm payment
      const confirmData = await apiClient.confirmPayment({
        paymentIntentId: paymentData.paymentIntentId,
        orderId: orderId
      });

      // Add to purchased books
      addToPurchased(cartItems);

      setOrderPlaced(true);
      setTimeout(() => {
        alert('Order placed successfully!');
        clearCart();
        setIsCartOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase!</p>
          <p className="text-gray-500 text-sm">Your books will be available in your library immediately.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:order-2">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {(item.book || item.title || 'Untitled')} x {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ${((item.category === 'free' ? 0 : item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No items in cart</p>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-white">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="font-semibold text-gray-800 dark:text-white">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.street}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Payment Method</h2>
            <div className="space-y-2">
              {['card', 'paypal', 'bank_transfer'].map(method => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {method === 'card' && '💳 Credit/Debit Card'}
                    {method === 'paypal' && '🅿️ PayPal'}
                    {method === 'bank_transfer' && '🏦 Bank Transfer'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Card Details (if card selected) */}
          {formData.paymentMethod === 'card' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Card Details</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (1234 5678 9012 3456)"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  required
                  maxLength="19"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={handleCardChange}
                    required
                    maxLength="5"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    required
                    maxLength="4"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Complete Purchase - $${getTotalPrice().toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;