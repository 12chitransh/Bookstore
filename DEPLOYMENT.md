# Bookstore Application Deployment Guide

This guide will help you deploy the Bookstore application to production.

## Prerequisites

- Node.js 18+ and npm
- Git
- A hosting platform (Vercel, Netlify, Heroku, DigitalOcean, etc.)

## Project Structure

```
bookstore/
├── backend/          # Express.js API server
├── frontend/         # React + Vite frontend
├── README.md         # Project overview
└── DEPLOYMENT.md     # This file
```

## Backend Deployment

### 1. Environment Setup

Copy the example environment file and configure it:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your production values:

```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-admin-password
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build and Test

```bash
# Test the application
npm test

# Start the server
npm start
```

### 4. Deploy to Hosting Platform

#### Option A: Heroku

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Heroku CLI:

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
# ... set other env vars
git push heroku main
```

#### Option B: DigitalOcean App Platform

1. Connect your repository
2. Set environment variables in the dashboard
3. Configure the run command: `npm start`

#### Option C: Railway/Vercel (for backend)

Similar process - connect repo and set environment variables.

## Frontend Deployment

### 1. Environment Setup

```bash
cd frontend/bookstore
cp .env.example .env
```

Edit `.env` with your backend URL:

```env
VITE_API_URL=https://your-backend-domain.com
```

### 2. Build for Production

```bash
npm install
npm run build
```

### 3. Deploy to Hosting Platform

#### Option A: Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

Set the environment variable in Vercel dashboard:
- `VITE_API_URL` = `https://your-backend-domain.com`

#### Option B: Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables in dashboard

#### Option C: GitHub Pages

```bash
npm install -g gh-pages
npm run build
npm run deploy
```

## Database Setup (Optional)

The application uses in-memory storage by default. For production, consider:

### MongoDB Setup

1. Create a MongoDB database (MongoDB Atlas, etc.)
2. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore
```

3. The application will automatically use MongoDB if `MONGODB_URI` is provided.

## Stripe Payment Setup

1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set them in your backend environment:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLIC_KEY=pk_live_...
```

## Security Checklist

- [ ] Change default JWT secret
- [ ] Use HTTPS in production
- [ ] Set secure admin credentials
- [ ] Enable CORS only for your domain
- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting and security middleware

## Testing Deployment

1. Frontend loads correctly
2. User registration/login works
3. Books display properly
4. Cart and checkout function
5. Admin panel accessible
6. Payments process (if configured)

## Troubleshooting

### Common Issues

1. **CORS errors**: Check `FRONTEND_URL` in backend `.env`
2. **API calls failing**: Verify `VITE_API_URL` in frontend `.env`
3. **Payments not working**: Check Stripe keys and webhook endpoints
4. **Admin login failing**: Ensure admin user is seeded with correct credentials

### Logs

Check your hosting platform's logs for detailed error information.

## Support

If you encounter issues, check:
1. Environment variables are set correctly
2. Build processes complete successfully
3. Network connectivity between frontend and backend
4. Database connections (if using external DB)