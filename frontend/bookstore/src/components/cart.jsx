import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Checkout from './Checkout';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, setIsCartOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity));
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  if (isCheckingOut) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => setIsCheckingOut(false)}
            className="mb-4 btn btn-ghost btn-sm"
          >
            ← Back to Cart
          </button>
          <Checkout />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Shopping Cart</h1>
          <button
            onClick={() => setIsCartOpen(false)}
            className="btn btn-ghost btn-sm"
          >
            ← Back to Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-slate-200 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-slate-300 mb-8">Add some books to get started!</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
                    {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.book}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.book}</h3>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`badge badge-sm ${item.category === 'free' ? 'badge-primary' : 'badge-secondary'}`}>
                            {item.category === 'free' ? 'FREE' : 'PAID'}
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            {item.category === 'free' ? 'FREE' : `$${item.price}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="select select-bordered select-sm"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">
                          ${item.category === 'free' ? '0.00' : (item.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="btn btn-ghost btn-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800 dark:text-slate-100">Total:</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-cyan-300">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full"
                disabled={getTotalPrice() === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;