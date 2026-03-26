const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const booksData = [
  {
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "price": 0,
    "category": "free",
    "description": "A young wizard's journey begins as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg"
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 0,
    "category": "free",
    "description": "A classic novel that explores themes of wealth, love, and the American Dream in the Roaring Twenties.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg"
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 0,
    "category": "free",
    "description": "A powerful story of racial injustice and moral growth in the Deep South during the 1930s.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OtwF1XJmL.jpg"
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "price": 0,
    "category": "free",
    "description": "A dystopian novel that delves into themes of totalitarianism, surveillance, and individuality in a future society.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg"
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "price": 0,
    "category": "free",
    "description": "A classic romance novel that explores themes of love, social class, and misunderstandings in 19th-century England.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg"
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": 0,
    "category": "free",
    "description": "A controversial novel about teenage rebellion and alienation, following the adventures of Holden Caulfield.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg"
  },
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "price": 29.99,
    "category": "paid",
    "description": "An epic fantasy adventure about the quest to destroy a powerful ring and defeat the dark lord Sauron.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg"
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "price": 24.99,
    "category": "paid",
    "description": "A science fiction masterpiece set on the desert planet Arrakis, following Paul Atreides' journey.",
    "image": "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert new books
    const books = await Book.insertMany(booksData);
    console.log(`Seeded ${books.length} books successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();