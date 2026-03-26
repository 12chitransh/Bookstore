import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function MyBooks() {
  const { purchasedBooks } = useCart();
  const { setIsMyBooksOpen } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Books</h1>
          <button
            onClick={() => setIsMyBooksOpen(false)}
            className="btn btn-sm btn-outline"
          >
            Close
          </button>
        </div>

        {purchasedBooks.length === 0 ? (
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-8 text-center">
            <p className="text-lg text-slate-600 dark:text-slate-300">You have not purchased any books yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedBooks.map((book) => (
              <div key={book.id} className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                <div className="h-40 overflow-hidden rounded-lg mb-4">
                  <img src={book.image} alt={book.book} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{book.book}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">by {book.author}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Quantity: {book.quantity}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{book.category.toUpperCase()}</p>
                <p className="mt-3 text-lg font-bold text-blue-600 dark:text-cyan-300">
                  {book.category === 'free' ? 'FREE' : `$${book.price}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}











