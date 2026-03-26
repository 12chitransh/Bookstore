import React from 'react'
import Card from './card'
import { useSearch } from '../contexts/SearchContext'
import { useBooks } from '../contexts/BooksContext'

export default function Courses() {
  const { searchTerm } = useSearch();
  const { books, loading, error } = useBooks();

  const term = searchTerm.trim().toLowerCase();

  // Filter books based on search term
  const filteredBooks = books.filter((book) => {
    const title = (book.title || book.book || '').toLowerCase();
    const author = (book.author || '').toLowerCase();
    const description = (book.description || '').toLowerCase();
    const category = (book.category || '').toLowerCase();

    if (!term) return true;

    return (
      title.includes(term) ||
      author.includes(term) ||
      description.includes(term) ||
      category.includes(term)
    );
  });

  // Show only featured books - top picks from each category (filtered)
  const featured = filteredBooks.slice(0, 6) // Show only 6 books
  const freeBooks = filteredBooks.filter(book => book.category === 'free').slice(0, 3) // Show only 3 free books
  const paidBooks = filteredBooks.filter(book => book.category === 'paid').slice(0, 3) // Show only 3 paid books

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div>Loading books...</div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><div>Error: {error}</div></div>;

  return (
    <div id="books" className="min-h-screen bg-white dark:bg-slate-900">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-slate-800 dark:to-slate-900 text-white py-16 px-4">
        <div className="max-w-screen-2xl container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Curated Courses & Books</h1>
          <p className="text-lg text-blue-100 dark:text-slate-300 max-w-2xl">
            Handpicked selection of the finest reads. Quality over quantity. Discover our top recommendations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl container mx-auto px-4 py-16">
        
        {/* Search Results */}
        {searchTerm && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">🔍 Search Results for "{searchTerm}"</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-blue-700 dark:from-green-400 dark:to-blue-500 rounded"></div>
              <p className="text-slate-600 dark:text-slate-300 mt-2">Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}</p>
            </div>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((item) => (
                  <div key={item.id}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No books found</h3>
                <p className="text-slate-600 dark:text-slate-300">Try searching for a different term or browse our featured books below.</p>
              </div>
            )}
          </div>
        )}

        {/* Featured Section */}
        {!searchTerm && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">⭐ Featured Picks</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <div key={item.id}>
                  <Card item={item} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links / Info */}
        {!searchTerm && (
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">📖 Navigate by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Free Books</h4>
                <p className="text-slate-600 dark:text-slate-300">Start learning without any cost. Perfect for beginners.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Premium Books</h4>
                <p className="text-slate-600 dark:text-slate-300">Unlock advanced knowledge with our premium collection.</p>
              </div>
            </div>
          </div>
        )}

        {/* Two Section Layout */}
        {!searchTerm && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Free Books */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">📚 Free Books</h3>
                <p className="text-slate-600 dark:text-slate-300">Top free classics</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {freeBooks.map((item) => (
                  <div key={item.id}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Paid Books */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">💎 Premium Books</h3>
                <p className="text-slate-600 dark:text-slate-300">Top premium selections</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {paidBooks.map((item) => (
                  <div key={item.id}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Simple CTA */}
        {!searchTerm && (
          <div className="mt-20 bg-blue-600 dark:bg-slate-800 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Want More?</h3>
            <p className="text-blue-100 dark:text-slate-300 mb-6">Explore our complete library with hundreds of books</p>
            <button className="bg-white dark:bg-slate-700 text-blue-600 dark:text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors">
              Browse All Books →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
