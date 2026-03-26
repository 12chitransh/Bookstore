const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple in-memory storage for development
let books = [
  {
    "_id": "1",
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "price": 0,
    "category": "free",
    "description": "A young wizard's journey begins as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "2",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 0,
    "category": "free",
    "description": "A classic novel that explores themes of wealth, love, and the American Dream in the Roaring Twenties.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "3",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 0,
    "category": "free",
    "description": "A powerful story of racial injustice and moral growth in the Deep South during the 1930s.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OtwF1XJmL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "4",
    "title": "1984",
    "author": "George Orwell",
    "price": 0,
    "category": "free",
    "description": "A dystopian novel that delves into themes of totalitarianism, surveillance, and individuality in a future society.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "5",
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "price": 0,
    "category": "free",
    "description": "A classic romance novel that explores themes of love, social class, and misunderstandings in 19th-century England.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "6",
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": 0,
    "category": "free",
    "description": "A controversial novel about teenage rebellion and alienation, following the adventures of Holden Caulfield.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "7",
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "price": 29.99,
    "category": "paid",
    "description": "An epic fantasy adventure about the quest to destroy a powerful ring and defeat the dark lord Sauron.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  },
  {
    "_id": "8",
    "title": "Dune",
    "author": "Frank Herbert",
    "price": 24.99,
    "category": "paid",
    "description": "A science fiction masterpiece set on the desert planet Arrakis, following Paul Atreides' journey.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    "reviews": [],
    "averageRating": 0,
    "totalReviews": 0
  }
];

let users = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$12$...',  // This will be set via auth endpoint
    role: 'admin',
    purchasedBooks: [],
    createdAt: new Date()
  }
];
let orders = [];

// Routes
app.use('/api/auth', require('./routes/auth')(users));
app.use('/api/books', require('./routes/books')(books));
app.use('/api/orders', require('./routes/orders')(orders, users));
app.use('/api/payments', require('./routes/payments')(orders, users));
app.use('/api/admin', require('./routes/admin')(books, users));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bookstore API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});