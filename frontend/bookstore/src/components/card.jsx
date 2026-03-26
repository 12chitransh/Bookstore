import React from 'react'
import { useCart } from '../contexts/CartContext'

function Card({ item }) {
    const { addToCart } = useCart();
    const isFree = (item.category || '').toLowerCase() === "free";

    const handleAddToCart = () => {
        addToCart({
            ...item,
            book: item.book || item.title || 'Untitled',
            title: item.title || item.book || 'Untitled'
        });
        // You could add a toast notification here
    };

    return (
        <>
            <div className="card bg-white dark:bg-slate-800 w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <figure className="h-48 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.book}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </figure>
                <div className="card-body p-4">
                    <h2 className="card-title text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2">
                        {item.book || item.title || 'Untitled Book'}
                        <div className={`badge badge-sm ${isFree ? 'badge-primary' : 'badge-secondary'}`}>
                            {isFree ? 'FREE' : 'PAID'}
                        </div>
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">by {item.author}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300 line-clamp-3 mb-4">{item.description}</p>
                    <div className="card-actions justify-between items-center">
                        <div className={`text-lg font-bold ${isFree ? 'text-green-600' : 'text-blue-600'}`}>
                            {isFree ? 'FREE' : `$${item.price}`}
                        </div>
                        <button
                            onClick={isFree ? () => window.open(item.image, '_blank') : handleAddToCart}
                            className={`btn btn-sm ${isFree ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {isFree ? 'Read Now' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
