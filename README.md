# 📚 Bookstore Application

A full-stack e-commerce bookstore application built with React, Express.js, and modern web technologies.

## ✨ Features

- **User Authentication**: Register, login, and manage user accounts
- **Book Catalog**: Browse and search through a comprehensive book collection
- **Shopping Cart**: Add books to cart, manage quantities
- **Secure Checkout**: Complete purchase flow with payment processing
- **Order Management**: View order history and purchased books
- **Admin Panel**: Manage books, users, and view analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live cart updates and inventory management

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS + DaisyUI** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js + Express.js** - RESTful API server
- **JWT Authentication** - Secure token-based authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing (mock implementation)
- **express-validator** - Input validation and sanitization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **npm** - Package management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/12chitransh/Bookstore.git
   cd Bookstore
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure environment variables
   npm start
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend/bookstore
   npm install
   cp .env.example .env  # Configure API URL
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Default Admin Credentials
- Email: `admin@example.com`
- Password: `admin123`

## 📁 Project Structure

```
bookstore/
├── backend/                 # Express.js API server
│   ├── routes/             # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Data models
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend
│   └── bookstore/
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── contexts/   # React context providers
│       │   ├── utils/      # Utility functions
│       │   └── assets/     # Static assets
│       ├── public/         # Public static files
│       └── package.json    # Frontend dependencies
└── DEPLOYMENT.md           # Deployment guide
```

## 🔧 Development

### Available Scripts

#### Backend
```bash
cd backend
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm test       # Run tests
```

#### Frontend
```bash
cd frontend/bookstore
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Backend**: Deploy to Heroku, Railway, or DigitalOcean
2. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
3. **Database**: Use MongoDB Atlas for production data persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using React, Express.js, and modern web technologies.