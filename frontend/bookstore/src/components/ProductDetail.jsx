import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useBooks } from '../contexts/BooksContext';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { getBookById } = useBooks();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, getBookById]);

  const handleAddToCart = () => {
    addToCart(book);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Loading...</h2></div></div>;

  if (error || !book) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Book not found</h2><p className="text-gray-600 dark:text-gray-300">The book you're looking for doesn't exist.</p></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <img src={book.image} alt={book.book} className="w-full h-96 object-cover rounded-lg shadow-md" />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">by {book.author}</p>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  book.category === 'free' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {book.category === 'free' ? 'Free' : 'Paid'}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{book.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {book.category === 'free' ? 'Free' : `$${book.price}`}
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;