# Bookstore Backend API

A comprehensive REST API for a bookstore application built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Book management with reviews and ratings
- Order processing and management
- Secure API with JWT tokens
- Rate limiting and security middleware
- Input validation and error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

5. Start MongoDB service
6. Seed the database with initial data:

```bash
npm run seed
```

7. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Books
- `GET /api/books` - Get all books (with filtering and pagination)
- `GET /api/books/:id` - Get single book
- `POST /api/books/:id/review` - Add review to book
- `POST /api/books` - Create book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

### Health Check
- `GET /api/health` - API health check

## Data Models

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- role: String (user/admin, default: user)
- purchasedBooks: Array of book references
- timestamps

### Book
- title: String (required)
- author: String (required)
- description: String (required)
- price: Number (required)
- category: String (free/paid, required)
- image: String (required)
- reviews: Array of review objects
- averageRating: Number
- totalReviews: Number
- timestamps

### Order
- user: User reference (required)
- items: Array of order items
- totalAmount: Number (required)
- status: String (pending/processing/shipped/delivered/cancelled)
- shippingAddress: Object
- paymentMethod: String
- paymentStatus: String
- orderNumber: String (auto-generated)
- timestamps

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run seed` - Seed database with initial data

### Project Structure

```
backend/
├── middleware/
│   └── auth.js
├── models/
│   ├── Book.js
│   ├── User.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── books.js
│   └── orders.js
├── .env
├── package.json
├── seed.js
└── server.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.