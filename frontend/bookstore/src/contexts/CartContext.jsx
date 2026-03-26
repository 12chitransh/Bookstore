/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchasedBooks, setPurchasedBooks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('bookstore_purchased');
    return saved ? JSON.parse(saved) : [];
  });

  const syncPurchasedToStorage = (books) => {
    setPurchasedBooks(books);
    localStorage.setItem('bookstore_purchased', JSON.stringify(books));
  };

  const addToPurchased = (items) => {
    const combined = [...purchasedBooks];
    items.forEach(item => {
      const existing = combined.find(book => book.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        combined.push({ ...item });
      }
    });
    syncPurchasedToStorage(combined);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.category === 'free' ? 0 : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    purchasedBooks,
    addToCart,
    addToPurchased,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
